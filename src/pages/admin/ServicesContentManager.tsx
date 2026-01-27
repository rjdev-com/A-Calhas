import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Upload, Save } from "lucide-react";

interface ContentItem {
  id: number;
  section_key: string;
  content_value: string;
  order_index: number;
}

export default function ServicesContentManager() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const keys = [
    { key: "hero_titulo", label: "Título do Hero" },
    { key: "hero_texto", label: "Texto do Hero" },
    { key: "imagem_hero", label: "Imagem do Hero", image: true },

    { key: "sec_calhas_titulo", label: "Título - Calhas" },
    { key: "sec_calhas_texto", label: "Texto - Calhas" },
    { key: "sec_calhas_imagem", label: "Imagem - Calhas", image: true },

    { key: "sec_rufos_titulo", label: "Título - Rufos" },
    { key: "sec_rufos_texto", label: "Texto - Rufos" },
    { key: "sec_rufos_imagem", label: "Imagem - Rufos", image: true },

    { key: "sec_colarinhos_titulo", label: "Título - Colarinhos" },
    { key: "sec_colarinhos_texto", label: "Texto - Colarinhos" },
    { key: "sec_colarinhos_imagem", label: "Imagem - Colarinhos", image: true },

    { key: "sec_chamines_titulo", label: "Título - Chaminés" },
    { key: "sec_chamines_texto", label: "Texto - Chaminés" },
    { key: "sec_chamines_imagem", label: "Imagem - Chaminés", image: true },
  ];

  // ============================
  // Load content from Supabase
  // ============================
  const loadContent = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .eq("page_name", "servicos")
      .order("order_index", { ascending: true });

    if (error) console.error("Erro ao carregar conteúdo:", error);
    else setContent(data);

    setLoading(false);
  };

  useEffect(() => {
    loadContent();
  }, []);

  // ============================
  // Update text field
  // ============================
  const handleTextChange = (key: string, value: string) => {
    setContent((prev) =>
      prev.map((item) =>
        item.section_key === key ? { ...item, content_value: value } : item
      )
    );
  };

  // ============================
  // Upload image to Supabase
  // ============================
  const handleImageUpload = async (key: string, file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = ${key}-${Date.now()}.${fileExt};

    const { error: uploadError } = await supabase.storage
      .from("service-images")
      .upload(fileName, file);

    if (uploadError) {
      alert("Erro ao enviar imagem.");
      console.error(uploadError);
      return;
    }

    const { data } = supabase.storage
      .from("service-images")
      .getPublicUrl(fileName);

    const url = data.publicUrl;

    handleTextChange(key, url);
  };

  // ============================
  // Save all changes
  // ============================
  const saveChanges = async () => {
    setSaving(true);

    for (const item of content) {
      await supabase
        .from("page_content")
        .update({ content_value: item.content_value })
        .eq("id", item.id);
    }

    setSaving(false);
    alert("Conteúdo salvo com sucesso!");
  };

  // ============================
  // Render component
  // ============================
  if (loading) return <p>Carregando conteúdo...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#1e3a5f] mb-6">
        Editar Página: Serviços
      </h1>

      <div className="space-y-8">
        {keys.map((field) => {
          const item = content.find((c) => c.section_key === field.key);
          if (!item) return null;

          return (
            <div key={field.key} className="bg-white p-5 rounded-lg shadow">
              <label className="block text-lg font-semibold mb-2">
                {field.label}
              </label>

              {/* Campo de texto */}
              {!field.image && (
                <textarea
                  value={item.content_value || ""}
                  onChange={(e) =>
                    handleTextChange(field.key, e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              )}

              {/* Campo de imagem */}
              {field.image && (
                <>
                  {item.content_value && (
                    <img
                      src={item.content_value}
                      className="w-full max-w-md rounded mb-3 shadow"
                    />
                  )}

                  <label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 p-3 rounded-lg border border-gray-300 w-fit">
                    <Upload size={20} />
                    <span>Enviar nova imagem</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleImageUpload(field.key, e.target.files[0])
                      }
                    />
                  </label>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <button
          onClick={saveChanges}
          disabled={saving}
          className="bg-[#ff6b35] hover:bg-[#e85d27] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
        >
          <Save size={20} />
          {saving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </div>
  );
}