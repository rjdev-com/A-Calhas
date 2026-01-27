import { useState, useEffect } from 'react';
import { X, MapPin, Layers } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import { usePageContent } from '../hooks/usePageContent';

type Project = Database['public']['Tables']['projects']['Row'];

export default function Portfolio() {
  const { get, loading: contentLoading } = usePageContent('portfolio');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'todos', name: 'Todos os Projetos' },
    { id: 'calhas', name: 'Calhas' },
    { id: 'rufos', name: 'Rufos e Pingadeiras' },
    { id: 'colarinhos', name: 'Colarinhos' },
    { id: 'chamines', name: 'Chaminés' },
    { id: 'coifas', name: 'Coifas' },
    { id: 'condutores', name: 'Condutores' },
  ];

  useEffect(() => {
    loadProjects();
  }, []);

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

  const filteredProjects = selectedCategory === 'todos'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const getProjectImages = (project: Project): string[] => {
    if (!project.images) return [];
    const images = project.images as any;
    if (Array.isArray(images)) return images;
    return [];
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4d70] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {get('hero_title', 'Portfólio')}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {get('hero_subtitle', 'Confira nossos trabalhos realizados em Joinville e região. Qualidade e acabamento profissional em cada projeto.')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#ff6b35] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#ff6b35]"></div>
              <p className="mt-4 text-gray-600">Carregando projetos...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-xl p-12 max-w-lg mx-auto">
                <Layers size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {selectedCategory === 'todos'
                    ? 'Nenhum projeto cadastrado ainda'
                    : 'Nenhum projeto nesta categoria'}
                </h3>
                <p className="text-gray-600">
                  Em breve teremos projetos para mostrar aqui
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const images = getProjectImages(project);
                const mainImage = images[0] || 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800';

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden group cursor-pointer transform hover:scale-105"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={mainImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <p className="text-sm font-semibold">Clique para ver mais</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">{project.title}</h3>
                      {project.description && (
                        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {project.material_thickness && (
                          <span className="inline-flex items-center text-xs bg-[#ff6b35] text-white px-3 py-1 rounded-full">
                            <Layers size={12} className="mr-1" />
                            {project.material_thickness}
                          </span>
                        )}
                        {project.location && (
                          <span className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                            <MapPin size={12} className="mr-1" />
                            {project.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="sticky top-4 float-right mr-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">
                {selectedProject.title}
              </h2>
              {selectedProject.description && (
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  {selectedProject.description}
                </p>
              )}
              <div className="flex flex-wrap gap-3 mb-6">
                {selectedProject.material_thickness && (
                  <span className="inline-flex items-center bg-[#ff6b35] text-white px-4 py-2 rounded-lg font-semibold">
                    <Layers size={18} className="mr-2" />
                    Material: {selectedProject.material_thickness}
                  </span>
                )}
                {selectedProject.location && (
                  <span className="inline-flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold">
                    <MapPin size={18} className="mr-2" />
                    {selectedProject.location}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getProjectImages(selectedProject).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedProject.title} - ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
            {get('cta_title', 'Quer trabalhos como esses?')}
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {get('cta_subtitle', 'Entre em contato e transforme seu projeto em realidade com qualidade e profissionalismo.')}
          </p>
          <a
            href="https://wa.me/5547989100709?text=Olá,%20vi%20o%20portfólio%20e%20gostaria%20de%20um%20orçamento"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Solicitar Orçamento Agora
          </a>
        </div>
      </section>
    </div>
  );
}
