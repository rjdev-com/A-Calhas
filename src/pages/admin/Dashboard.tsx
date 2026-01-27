import { useEffect, useState } from 'react';
import { FolderOpen, Image, Layers } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Stats {
  total: number;
  byCategory: { [key: string]: number };
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, byCategory: {} });
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'calhas', name: 'Calhas', color: 'bg-blue-500' },
    { id: 'rufos', name: 'Rufos e Pingadeiras', color: 'bg-green-500' },
    { id: 'colarinhos', name: 'Colarinhos', color: 'bg-yellow-500' },
    { id: 'chamines', name: 'Chaminés', color: 'bg-red-500' },
    { id: 'coifas', name: 'Coifas', color: 'bg-purple-500' },
    { id: 'condutores', name: 'Condutores', color: 'bg-indigo-500' },
  ];

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('category');

      if (error) throw error;

      const byCategory: { [key: string]: number } = {};
      data?.forEach((project) => {
        byCategory[project.category] = (byCategory[project.category] || 0) + 1;
      });

      setStats({
        total: data?.length || 0,
        byCategory,
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do portfólio de projetos</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#ff6b35]"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#ff6b35]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Total de Projetos</p>
                  <p className="text-3xl font-bold text-[#1e3a5f]">{stats.total}</p>
                </div>
                <div className="bg-[#ff6b35]/10 p-4 rounded-lg">
                  <FolderOpen size={32} className="text-[#ff6b35]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Categorias Ativas</p>
                  <p className="text-3xl font-bold text-[#1e3a5f]">
                    {Object.keys(stats.byCategory).length}
                  </p>
                </div>
                <div className="bg-blue-500/10 p-4 rounded-lg">
                  <Layers size={32} className="text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Total de Imagens</p>
                  <p className="text-3xl font-bold text-[#1e3a5f]">
                    {stats.total > 0 ? '~' + (stats.total * 3) : 0}
                  </p>
                </div>
                <div className="bg-green-500/10 p-4 rounded-lg">
                  <Image size={32} className="text-green-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">Projetos por Categoria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => {
                const count = stats.byCategory[category.id] || 0;
                return (
                  <div
                    key={category.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-700">{category.name}</span>
                      <span className={`${category.color} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                        {count}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${category.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: stats.total > 0 ? `${(count / stats.total) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {stats.total === 0 && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <p className="text-blue-800 font-medium mb-2">Nenhum projeto cadastrado ainda</p>
              <p className="text-blue-600 text-sm">
                Vá para a seção "Projetos" para adicionar seu primeiro projeto!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
