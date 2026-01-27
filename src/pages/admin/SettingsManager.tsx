import { useState, useEffect } from 'react';
import { Plus, Save, Trash2, Package, Wrench } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Material {
  id: string;
  name: string;
  density: number;
  cost_per_kg: number;
  active: boolean;
}

interface ServiceType {
  id: string;
  name: string;
  description: string;
  difficulty_factor_normal: number;
  difficulty_factor_medium: number;
  difficulty_factor_hard: number;
  active: boolean;
}

export default function SettingsManager() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [materialsRes, servicesRes] = await Promise.all([
        supabase.from('materials').select('*').order('name'),
        supabase.from('service_types').select('*').order('name'),
      ]);

      setMaterials(materialsRes.data || []);
      setServices(servicesRes.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveMaterial = async (material: Material) => {
    try {
      const { error } = await supabase
        .from('materials')
        .update({
          name: material.name,
          density: material.density,
          cost_per_kg: material.cost_per_kg,
          active: material.active,
        })
        .eq('id', material.id);

      if (error) throw error;
      alert('Material atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar material');
    }
  };

  const addMaterial = async () => {
    try {
      const { error } = await supabase
        .from('materials')
        .insert({
          name: 'Novo Material',
          density: 2.7,
          cost_per_kg: 30.0,
          active: true,
        });

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Erro ao adicionar:', error);
      alert('Erro ao adicionar material');
    }
  };

  const deleteMaterial = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este material?')) return;

    try {
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar material');
    }
  };

  const saveService = async (service: ServiceType) => {
    try {
      const { error } = await supabase
        .from('service_types')
        .update({
          name: service.name,
          description: service.description,
          difficulty_factor_normal: service.difficulty_factor_normal,
          difficulty_factor_medium: service.difficulty_factor_medium,
          difficulty_factor_hard: service.difficulty_factor_hard,
          active: service.active,
        })
        .eq('id', service.id);

      if (error) throw error;
      alert('Serviço atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar serviço');
    }
  };

  const addService = async () => {
    try {
      const { error } = await supabase
        .from('service_types')
        .insert({
          name: 'Novo Serviço',
          description: '',
          difficulty_factor_normal: 2.1,
          difficulty_factor_medium: 2.7,
          difficulty_factor_hard: 3.5,
          active: true,
        });

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Erro ao adicionar:', error);
      alert('Erro ao adicionar serviço');
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

    try {
      const { error } = await supabase
        .from('service_types')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar serviço');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Configurações</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Package className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Materiais</h2>
          </div>
          <button
            onClick={addMaterial}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Adicionar Material
          </button>
        </div>

        <div className="space-y-4">
          {materials.map((material) => (
            <div key={material.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    value={material.name}
                    onChange={(e) => {
                      const updated = materials.map(m =>
                        m.id === material.id ? { ...m, name: e.target.value } : m
                      );
                      setMaterials(updated);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Densidade</label>
                  <input
                    type="number"
                    step="0.01"
                    value={material.density}
                    onChange={(e) => {
                      const updated = materials.map(m =>
                        m.id === material.id ? { ...m, density: parseFloat(e.target.value) } : m
                      );
                      setMaterials(updated);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Custo/kg (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={material.cost_per_kg}
                    onChange={(e) => {
                      const updated = materials.map(m =>
                        m.id === material.id ? { ...m, cost_per_kg: parseFloat(e.target.value) } : m
                      );
                      setMaterials(updated);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={material.active}
                      onChange={(e) => {
                        const updated = materials.map(m =>
                          m.id === material.id ? { ...m, active: e.target.checked } : m
                        );
                        setMaterials(updated);
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-semibold">Ativo</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => saveMaterial(material)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    Salvar
                  </button>
                  <button
                    onClick={() => deleteMaterial(material.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Wrench className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Tipos de Serviço</h2>
          </div>
          <button
            onClick={addService}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Adicionar Serviço
          </button>
        </div>

        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => {
                      const updated = services.map(s =>
                        s.id === service.id ? { ...s, name: e.target.value } : s
                      );
                      setServices(updated);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
                  <input
                    type="text"
                    value={service.description || ''}
                    onChange={(e) => {
                      const updated = services.map(s =>
                        s.id === service.id ? { ...s, description: e.target.value } : s
                      );
                      setServices(updated);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Fator Normal</label>
                  <input
                    type="number"
                    step="0.1"
                    value={service.difficulty_factor_normal}
                    onChange={(e) => {
                      const updated = services.map(s =>
                        s.id === service.id ? { ...s, difficulty_factor_normal: parseFloat(e.target.value) } : s
                      );
                      setServices(updated);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Fator Médio</label>
                  <input
                    type="number"
                    step="0.1"
                    value={service.difficulty_factor_medium}
                    onChange={(e) => {
                      const updated = services.map(s =>
                        s.id === service.id ? { ...s, difficulty_factor_medium: parseFloat(e.target.value) } : s
                      );
                      setServices(updated);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Fator Difícil</label>
                  <input
                    type="number"
                    step="0.1"
                    value={service.difficulty_factor_hard}
                    onChange={(e) => {
                      const updated = services.map(s =>
                        s.id === service.id ? { ...s, difficulty_factor_hard: parseFloat(e.target.value) } : s
                      );
                      setServices(updated);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={service.active}
                      onChange={(e) => {
                        const updated = services.map(s =>
                          s.id === service.id ? { ...s, active: e.target.checked } : s
                        );
                        setServices(updated);
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-semibold">Ativo</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => saveService(service)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
                >
                  <Save size={16} />
                  Salvar
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
