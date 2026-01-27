import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Calculator } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Material {
  id: string;
  name: string;
  density: number;
  cost_per_kg: number;
}

interface ServiceType {
  id: string;
  name: string;
  difficulty_factor_normal: number;
  difficulty_factor_medium: number;
  difficulty_factor_hard: number;
}

interface Customer {
  id: string;
  full_name?: string;
  company_name?: string;
  trade_name?: string;
}

interface QuoteItem {
  id?: string;
  item_type: string;
  material_id: string;
  service_type_id: string;
  width_mm: number;
  thickness_mm: number;
  length_meters: number;
  difficulty_level: 'normal' | 'medium' | 'hard';
  unit_cost: number;
  total_cost: number;
  notes: string;
}

export default function QuoteForm() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [customersRes, materialsRes, servicesRes] = await Promise.all([
        supabase.from('customers').select('id, full_name, company_name, trade_name').eq('status', 'ativo'),
        supabase.from('materials').select('*').eq('active', true),
        supabase.from('service_types').select('*').eq('active', true),
      ]);

      setCustomers(customersRes.data || []);
      setMaterials(materialsRes.data || []);
      setServiceTypes(servicesRes.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const calculateItemCost = (item: Partial<QuoteItem>, material?: Material, service?: ServiceType): { unit_cost: number; total_cost: number } => {
    if (!item.width_mm || !item.thickness_mm || !item.length_meters || !material || !service) {
      return { unit_cost: 0, total_cost: 0 };
    }

    const baseCost = (item.width_mm * item.thickness_mm * material.density * material.cost_per_kg) / 1000;

    let difficultyFactor = service.difficulty_factor_normal;
    if (item.difficulty_level === 'medium') difficultyFactor = service.difficulty_factor_medium;
    if (item.difficulty_level === 'hard') difficultyFactor = service.difficulty_factor_hard;

    const unit_cost = baseCost * difficultyFactor;
    const total_cost = unit_cost * item.length_meters;

    return { unit_cost, total_cost };
  };

  const addItem = () => {
    const newItem: QuoteItem = {
      item_type: 'Calha',
      material_id: materials[0]?.id || '',
      service_type_id: serviceTypes[0]?.id || '',
      width_mm: 500,
      thickness_mm: 0.5,
      length_meters: 1,
      difficulty_level: 'normal',
      unit_cost: 0,
      total_cost: 0,
      notes: '',
    };

    const material = materials.find(m => m.id === newItem.material_id);
    const service = serviceTypes.find(s => s.id === newItem.service_type_id);
    const costs = calculateItemCost(newItem, material, service);

    setItems([...items, { ...newItem, ...costs }]);
  };

  const updateItem = (index: number, updates: Partial<QuoteItem>) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], ...updates };

    const material = materials.find(m => m.id === updatedItems[index].material_id);
    const service = serviceTypes.find(s => s.id === updatedItems[index].service_type_id);
    const costs = calculateItemCost(updatedItems[index], material, service);

    updatedItems[index] = { ...updatedItems[index], ...costs };
    setItems(updatedItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const getTotalAmount = () => {
    return items.reduce((sum, item) => sum + item.total_cost, 0);
  };

  const getFinalAmount = () => {
    return getTotalAmount() - discount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || items.length === 0) {
      alert('Selecione um cliente e adicione pelo menos um item');
      return;
    }

    setSaving(true);
    try {
      const { data: quoteNumberData } = await supabase.rpc('generate_quote_number');
      const quoteNumber = quoteNumberData;

      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          quote_number: quoteNumber,
          customer_id: selectedCustomerId,
          status: 'rascunho',
          total_amount: getTotalAmount(),
          discount: discount,
          final_amount: getFinalAmount(),
          notes: notes,
        })
        .select()
        .single();

      if (quoteError) throw quoteError;

      const itemsToInsert = items.map(item => ({
        quote_id: quote.id,
        ...item,
      }));

      const { error: itemsError } = await supabase
        .from('quote_items')
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      alert(`Orçamento ${quoteNumber} criado com sucesso!`);
      window.location.href = '/admin?page=quotes';
    } catch (error) {
      console.error('Erro ao salvar orçamento:', error);
      alert('Erro ao criar orçamento');
    } finally {
      setSaving(false);
    }
  };

  const getCustomerName = (customer: Customer) => {
    return customer.full_name || customer.trade_name || customer.company_name || '';
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Novo Orçamento</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Informações do Cliente</h2>
          <select
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione um cliente</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {getCustomerName(customer)}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Itens do Orçamento</h2>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              Adicionar Item
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo</label>
                    <input
                      type="text"
                      value={item.item_type}
                      onChange={(e) => updateItem(index, { item_type: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="Calha, Rufo, etc"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Material</label>
                    <select
                      value={item.material_id}
                      onChange={(e) => updateItem(index, { material_id: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      {materials.map(material => (
                        <option key={material.id} value={material.id}>
                          {material.name} (R$ {material.cost_per_kg}/kg)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Serviço</label>
                    <select
                      value={item.service_type_id}
                      onChange={(e) => updateItem(index, { service_type_id: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      {serviceTypes.map(service => (
                        <option key={service.id} value={service.id}>{service.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Dificuldade</label>
                    <select
                      value={item.difficulty_level}
                      onChange={(e) => updateItem(index, { difficulty_level: e.target.value as any })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option value="normal">Normal ({serviceTypes.find(s => s.id === item.service_type_id)?.difficulty_factor_normal}x)</option>
                      <option value="medium">Médio ({serviceTypes.find(s => s.id === item.service_type_id)?.difficulty_factor_medium}x)</option>
                      <option value="hard">Difícil ({serviceTypes.find(s => s.id === item.service_type_id)?.difficulty_factor_hard}x)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Largura (mm)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.width_mm}
                      onChange={(e) => updateItem(index, { width_mm: parseFloat(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Espessura (mm)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.thickness_mm}
                      onChange={(e) => updateItem(index, { thickness_mm: parseFloat(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Metragem</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.length_meters}
                      onChange={(e) => updateItem(index, { length_meters: parseFloat(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Remover
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Observações da obra</label>
                  <input
                    type="text"
                    value={item.notes}
                    onChange={(e) => updateItem(index, { notes: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="Anotações sobre este item"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm">
                    <Calculator size={16} className="text-blue-600" />
                    <span className="font-semibold">Preço/m:</span>
                    <span className="text-blue-600 font-bold">R$ {item.unit_cost.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">Total:</span>
                    <span className="text-green-600 font-bold">R$ {item.total_cost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum item adicionado. Clique em "Adicionar Item" para começar.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Totais</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Valor Total:</span>
              <span className="font-bold">R$ {getTotalAmount().toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">Desconto:</label>
              <input
                type="number"
                step="0.01"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                className="w-32 border border-gray-300 rounded px-3 py-2 text-right"
                placeholder="0.00"
              />
            </div>

            <div className="flex justify-between items-center text-2xl border-t pt-3">
              <span className="font-bold text-blue-600">Valor Final:</span>
              <span className="font-bold text-blue-600">R$ {getFinalAmount().toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Observações do Orçamento</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Observações gerais, condições de pagamento, etc."
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400"
          >
            <Save size={20} />
            {saving ? 'Salvando...' : 'Salvar Orçamento'}
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
