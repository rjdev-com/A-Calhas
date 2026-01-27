import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, User, Building } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Customer {
  id: string;
  customer_type: 'PF' | 'PJ';
  status: string;
  full_name?: string;
  cpf?: string;
  company_name?: string;
  trade_name?: string;
  cnpj?: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  created_at: string;
}

export default function CustomersManager() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'PF' | 'PJ'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      alert('Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadCustomers();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar cliente');
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesType = filterType === 'all' || customer.customer_type === filterType;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      customer.full_name?.toLowerCase().includes(searchLower) ||
      customer.company_name?.toLowerCase().includes(searchLower) ||
      customer.trade_name?.toLowerCase().includes(searchLower) ||
      customer.phone?.includes(searchTerm) ||
      customer.cpf?.includes(searchTerm) ||
      customer.cnpj?.includes(searchTerm);

    return matchesType && matchesSearch;
  });

  if (showForm) {
    return (
      <CustomerForm
        customer={editingCustomer}
        onBack={() => {
          setShowForm(false);
          setEditingCustomer(null);
        }}
        onSuccess={() => {
          setShowForm(false);
          setEditingCustomer(null);
          loadCustomers();
        }}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, telefone, CPF, CNPJ..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('PF')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                filterType === 'PF'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pessoa Física
            </button>
            <button
              onClick={() => setFilterType('PJ')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                filterType === 'PJ'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pessoa Jurídica
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${
                    customer.customer_type === 'PF' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {customer.customer_type === 'PF' ? (
                      <User className="text-blue-600" size={24} />
                    ) : (
                      <Building className="text-green-600" size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {customer.customer_type === 'PF'
                          ? customer.full_name
                          : customer.trade_name || customer.company_name}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        customer.status === 'ativo' ? 'bg-green-100 text-green-800' :
                        customer.status === 'pre_lista' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.status === 'ativo' ? 'Ativo' :
                         customer.status === 'pre_lista' ? 'Pré-lista' : 'Inativo'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      {customer.customer_type === 'PF' && customer.cpf && (
                        <p><strong>CPF:</strong> {customer.cpf}</p>
                      )}
                      {customer.customer_type === 'PJ' && customer.cnpj && (
                        <p><strong>CNPJ:</strong> {customer.cnpj}</p>
                      )}
                      <p><strong>Telefone:</strong> {customer.phone}</p>
                      {customer.email && <p><strong>Email:</strong> {customer.email}</p>}
                      {customer.address && <p className="md:col-span-2"><strong>Endereço:</strong> {customer.address}</p>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCustomer(customer);
                      setShowForm(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">Nenhum cliente encontrado.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface CustomerFormProps {
  customer: Customer | null;
  onBack: () => void;
  onSuccess: () => void;
}

function CustomerForm({ customer, onBack, onSuccess }: CustomerFormProps) {
  const [customerType, setCustomerType] = useState<'PF' | 'PJ'>(customer?.customer_type || 'PF');
  const [formData, setFormData] = useState({
    status: customer?.status || 'pre_lista',
    full_name: customer?.full_name || '',
    cpf: customer?.cpf || '',
    rg: customer?.['rg'] || '',
    company_name: customer?.company_name || '',
    trade_name: customer?.trade_name || '',
    cnpj: customer?.cnpj || '',
    ie: customer?.['ie'] || '',
    im: customer?.['im'] || '',
    responsible_name: customer?.['responsible_name'] || '',
    responsible_position: customer?.['responsible_position'] || '',
    address: customer?.address || '',
    phone: customer?.phone || '',
    whatsapp: customer?.whatsapp || '',
    email: customer?.email || '',
    internal_notes: customer?.['internal_notes'] || '',
    contact_preferences: customer?.['contact_preferences'] || '',
    commercial_conditions: customer?.['commercial_conditions'] || '',
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const dataToSave = {
        customer_type: customerType,
        ...formData,
      };

      if (customer) {
        const { error } = await supabase
          .from('customers')
          .update(dataToSave)
          .eq('id', customer.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('customers')
          .insert(dataToSave);

        if (error) throw error;
      }

      alert(customer ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!');
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar cliente');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Voltar
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">
          {customer ? 'Editar Cliente' : 'Novo Cliente'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Cliente</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="PF"
                checked={customerType === 'PF'}
                onChange={(e) => setCustomerType(e.target.value as 'PF')}
                className="w-4 h-4"
              />
              <span>Pessoa Física</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="PJ"
                checked={customerType === 'PJ'}
                onChange={(e) => setCustomerType(e.target.value as 'PJ')}
                className="w-4 h-4"
              />
              <span>Pessoa Jurídica</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="pre_lista">Pré-lista</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>

        {customerType === 'PF' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CPF</label>
                <input
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">RG</label>
                <input
                  type="text"
                  value={formData.rg}
                  onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Razão Social *</label>
                <input
                  type="text"
                  required
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Fantasia</label>
                <input
                  type="text"
                  value={formData.trade_name}
                  onChange={(e) => setFormData({ ...formData, trade_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CNPJ</label>
                <input
                  type="text"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">IE</label>
                <input
                  type="text"
                  value={formData.ie}
                  onChange={(e) => setFormData({ ...formData, ie: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">IM</label>
                <input
                  type="text"
                  value={formData.im}
                  onChange={(e) => setFormData({ ...formData, im: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Responsável</label>
                <input
                  type="text"
                  value={formData.responsible_name}
                  onChange={(e) => setFormData({ ...formData, responsible_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cargo</label>
                <input
                  type="text"
                  value={formData.responsible_position}
                  onChange={(e) => setFormData({ ...formData, responsible_position: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Endereço Completo</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone *</label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Observações Internas</label>
          <textarea
            value={formData.internal_notes}
            onChange={(e) => setFormData({ ...formData, internal_notes: e.target.value })}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Preferências de Contato</label>
          <input
            type="text"
            value={formData.contact_preferences}
            onChange={(e) => setFormData({ ...formData, contact_preferences: e.target.value })}
            placeholder="Ex: WhatsApp após 18h"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Condições Comerciais</label>
          <textarea
            value={formData.commercial_conditions}
            onChange={(e) => setFormData({ ...formData, commercial_conditions: e.target.value })}
            rows={2}
            placeholder="Ex: Pagamento em 30 dias, desconto de 5%"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400"
          >
            {saving ? 'Salvando...' : customer ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
