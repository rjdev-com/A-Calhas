import { useState, useEffect } from 'react';
import { Save, X, Upload, Trash2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

interface ProjectFormProps {
  project?: Project | null;
  onBack: () => void;
  onSuccess: () => void;
}

interface ImagePreview {
  file?: File;
  url: string;
  isExisting: boolean;
}

export default function ProjectForm({ project, onBack, onSuccess }: ProjectFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('calhas');
  const [description, setDescription] = useState('');
  const [materialThickness, setMaterialThickness] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = [
    { id: 'calhas', name: 'Calhas' },
    { id: 'rufos', name: 'Rufos e Pingadeiras' },
    { id: 'colarinhos', name: 'Colarinhos' },
    { id: 'chamines', name: 'Chaminés' },
    { id: 'coifas', name: 'Coifas' },
    { id: 'condutores', name: 'Condutores' },
  ];

  const materialOptions = ['0,5mm', '0,7mm', '0,9mm', '1,0mm'];

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setCategory(project.category);
      setDescription(project.description || '');
      setMaterialThickness(project.material_thickness || '');
      setLocation(project.location || '');

      const existingImages = project.images as any;
      if (Array.isArray(existingImages)) {
        setImages(existingImages.map(url => ({ url, isExisting: true })));
      }
    }
  }, [project]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.type.startsWith('image/'));

    const newPreviews: ImagePreview[] = validFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      isExisting: false,
    }));

    setImages([...images, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const removedImage = images[index];

    if (!removedImage.isExisting && removedImage.url) {
      URL.revokeObjectURL(removedImage.url);
    }

    setImages(newImages);
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    const imagesToUpload = images.filter(img => !img.isExisting);
    const existingUrls = images.filter(img => img.isExisting).map(img => img.url);

    for (let i = 0; i < imagesToUpload.length; i++) {
      const image = imagesToUpload[i];
      if (!image.file) continue;

      const fileExt = image.file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, image.file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
      setUploadProgress(((i + 1) / imagesToUpload.length) * 100);
    }

    return [...existingUrls, ...uploadedUrls];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      alert('Adicione pelo menos uma imagem');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const imageUrls = await uploadImages();

      const projectData = {
        title,
        category,
        description: description || null,
        material_thickness: materialThickness || null,
        location: location || null,
        images: imageUrls,
      };

      if (project) {
        const { error } = await supabase
          .from('projects')
          .update({ ...projectData, updated_at: new Date().toISOString() })
          .eq('id', project.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert(projectData);

        if (error) throw error;
      }

      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      alert('Erro ao salvar projeto. Tente novamente.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-[#1e3a5f] transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <h1 className="text-3xl font-bold text-[#1e3a5f]">
          {project ? 'Editar Projeto' : 'Novo Projeto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Título do Projeto *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
              placeholder="Ex: Instalação de Calhas em Residência"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categoria *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Espessura do Material
            </label>
            <select
              value={materialThickness}
              onChange={(e) => setMaterialThickness(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
            >
              <option value="">Selecione...</option>
              {materialOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Localização
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
              placeholder="Ex: Joinville - SC"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none resize-none"
            placeholder="Descreva os detalhes do projeto..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Imagens do Projeto *
          </label>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#ff6b35] transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium mb-2">
                Clique para selecionar imagens
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, WEBP até 5MB cada
              </p>
            </label>
          </div>

          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                  {image.isExisting && (
                    <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Existente
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {uploading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">
                Fazendo upload das imagens...
              </span>
              <span className="text-sm font-bold text-blue-800">
                {Math.round(uploadProgress)}%
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            disabled={uploading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <X size={20} />
            Cancelar
          </button>
          <button
            type="submit"
            disabled={uploading || images.length === 0}
            className="px-6 py-3 bg-[#ff6b35] hover:bg-[#e55a2b] text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save size={20} />
                {project ? 'Salvar Alterações' : 'Criar Projeto'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
