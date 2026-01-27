import { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, Image as ImageIcon, MapPin, Layers, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

interface ProjectsManagerProps {
  onNewProject: () => void;
  onEditProject: (project: Project) => void;
}

export default function ProjectsManager({ onNewProject, onEditProject }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const categories = [
    { id: 'todos', name: 'Todas' },
    { id: 'calhas', name: 'Calhas' },
    { id: 'rufos', name: 'Rufos' },
    { id: 'colarinhos', name: 'Colarinhos' },
    { id: 'chamines', name: 'Chaminés' },
    { id: 'coifas', name: 'Coifas' },
    { id: 'condutores', name: 'Condutores' },
  ];

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, selectedCategory]);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  };

  const handleDelete = async (projectId: string) => {
    setDeleting(true);
    try {
      const project = projects.find(p => p.id === projectId);
      if (!project) return;

      const images = project.images as any;
      if (Array.isArray(images) && images.length > 0) {
        const imagePaths = images.map(url => {
          const urlObj = new URL(url);
          const pathParts = urlObj.pathname.split('/');
          return pathParts.slice(pathParts.indexOf('project-images') + 1).join('/');
        });

        for (const path of imagePaths) {
          await supabase.storage.from('project-images').remove([path]);
        }
      }

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== projectId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      alert('Erro ao deletar projeto. Tente novamente.');
    } finally {
      setDeleting(false);
    }
  };

  const getProjectImages = (project: Project): string[] => {
    if (!project.images) return [];
    const images = project.images as any;
    if (Array.isArray(images)) return images;
    return [];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">Gerenciar Projetos</h1>
          <p className="text-gray-600">Adicione, edite ou remova projetos do portfólio</p>
        </div>
        <button
          onClick={onNewProject}
          className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg"
        >
          <Plus size={20} />
          Novo Projeto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título ou localização..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#ff6b35]"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {searchTerm || selectedCategory !== 'todos'
              ? 'Nenhum projeto encontrado'
              : 'Nenhum projeto cadastrado'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedCategory !== 'todos'
              ? 'Tente ajustar os filtros de busca'
              : 'Comece adicionando seu primeiro projeto'}
          </p>
          {!searchTerm && selectedCategory === 'todos' && (
            <button
              onClick={onNewProject}
              className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Adicionar Projeto
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const images = getProjectImages(project);
            const mainImage = images[0] || 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=400';

            return (
              <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-48 flex-shrink-0">
                    <img
                      src={mainImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-[#1e3a5f] flex-1">{project.title}</h3>
                      <div className="flex gap-2 ml-2">
                        <button
                          onClick={() => onEditProject(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Deletar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {project.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center text-xs bg-[#ff6b35] text-white px-2 py-1 rounded-full">
                        {categories.find(c => c.id === project.category)?.name || project.category}
                      </span>
                      {project.material_thickness && (
                        <span className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          <Layers size={12} className="mr-1" />
                          {project.material_thickness}
                        </span>
                      )}
                      {project.location && (
                        <span className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          <MapPin size={12} className="mr-1" />
                          {project.location}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center text-xs text-gray-500">
                      <ImageIcon size={14} className="mr-1" />
                      {images.length} {images.length === 1 ? 'imagem' : 'imagens'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Confirmar Exclusão
                </h3>
                <p className="text-gray-600">
                  Tem certeza que deseja deletar este projeto? Esta ação não pode ser desfeita e todas as imagens serão removidas.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Deletando...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Deletar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
