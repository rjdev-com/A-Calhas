import { useState, useEffect } from 'react';
import { Save, Image, Type, Code, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type ContentType = 'text' | 'image' | 'html';

interface PageContent {
  id: string;
  page_name: string;
  section_key: string;
  content_type: ContentType;
  content_value: string | null;
  order_index: number;
}

const pages = [
  { id: 'inicio', name: 'Página Inicial' },
  { id: 'sobre', name: 'Sobre' },
  { id: 'servicos', name: 'Serviços' },
  { id: 'portfolio', name: 'Portfólio' },
  { id: 'contato', name: 'Contato' },
];

export default function ContentManager() {
  const [selectedPage, setSelectedPage] = useState('inicio');
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  useEffect(() => {
    loadPageContent();
  }, [selectedPage]);

  const loadPageContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_name', selectedPage)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error);
      alert('Erro ao carregar conteúdo da página');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (content: PageContent) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('page_content')
        .upsert({
          ...content,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      alert('Conteúdo salvo com sucesso!');
      loadPageContent();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar conteúdo');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (contentId: string, file: File) => {
    setUploadingImage(contentId);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${selectedPage}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('page-images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('page-images')
        .getPublicUrl(filePath);

      const content = contents.find(c => c.id === contentId);
      if (content) {
        await handleSave({ ...content, content_value: publicUrl });
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload da imagem');
    } finally {
      setUploadingImage(null);
    }
  };

  const handleAddContent = async () => {
    const newContent: Partial<PageContent> = {
      page_name: selectedPage,
      section_key: `new_section_${Date.now()}`,
      content_type: 'text',
      content_value: '',
      order_index: contents.length,
    };

    try {
      const { data, error } = await supabase
        .from('page_content')
        .insert(newContent)
        .select()
        .single();

      if (error) throw error;
      setContents([...contents, data]);
    } catch (error) {
      console.error('Erro ao adicionar conteúdo:', error);
      alert('Erro ao adicionar novo conteúdo');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este conteúdo?')) return;

    try {
      const { error } = await supabase
        .from('page_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setContents(contents.filter(c => c.id !== id));
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar conteúdo');
    }
  };

  const getContentIcon = (type: ContentType) => {
    switch (type) {
      case 'text': return <Type size={16} />;
      case 'image': return <Image size={16} />;
      case 'html': return <Code size={16} />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Conteúdo das Páginas</h1>
        <button
          onClick={handleAddContent}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Adicionar Conteúdo
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Selecione a Página
        </label>
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {pages.map(page => (
            <option key={page.id} value={page.id}>{page.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {contents.map((content) => (
            <div key={content.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Chave da Seção
                  </label>
                  <input
                    type="text"
                    value={content.section_key}
                    onChange={(e) => {
                      const updated = contents.map(c =>
                        c.id === content.id ? { ...c, section_key: e.target.value } : c
                      );
                      setContents(updated);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Conteúdo
                  </label>
                  <select
                    value={content.content_type}
                    onChange={(e) => {
                      const updated = contents.map(c =>
                        c.id === content.id ? { ...c, content_type: e.target.value as ContentType } : c
                      );
                      setContents(updated);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="text">Texto</option>
                    <option value="image">Imagem</option>
                    <option value="html">HTML</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  {getContentIcon(content.content_type)}
                  Conteúdo
                </label>

                {content.content_type === 'image' ? (
                  <div className="space-y-3">
                    {content.content_value && (
                      <img
                        src={content.content_value}
                        alt="Preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg border"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(content.id, file);
                      }}
                      disabled={uploadingImage === content.id}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                    {uploadingImage === content.id && (
                      <p className="text-sm text-blue-600">Fazendo upload...</p>
                    )}
                  </div>
                ) : content.content_type === 'html' ? (
                  <textarea
                    value={content.content_value || ''}
                    onChange={(e) => {
                      const updated = contents.map(c =>
                        c.id === content.id ? { ...c, content_value: e.target.value } : c
                      );
                      setContents(updated);
                    }}
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  />
                ) : (
                  <textarea
                    value={content.content_value || ''}
                    onChange={(e) => {
                      const updated = contents.map(c =>
                        c.id === content.id ? { ...c, content_value: e.target.value } : c
                      );
                      setContents(updated);
                    }}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleSave(content)}
                  disabled={saving}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-gray-400"
                >
                  <Save size={16} />
                  {saving ? 'Salvando...' : 'Salvar'}
                </button>
                <button
                  onClick={() => handleDelete(content.id)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  Excluir
                </button>
              </div>
            </div>
          ))}

          {contents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">Nenhum conteúdo cadastrado para esta página.</p>
              <p className="text-gray-400 text-sm mt-2">Clique em "Adicionar Conteúdo" para começar.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
