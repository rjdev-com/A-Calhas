import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface PageContent {
  [key: string]: string | null;
}

export function usePageContent(pageName: string) {
  const [content, setContent] = useState<PageContent>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadContent = async () => {
      setLoading(true);
      setError(null);

      try {
        // Ajuste 'page_content' / coluna 'page_name' se sua tabela/coluna tiver nome diferente
        const { data, error } = await supabase
          .from('page_content')
          .select('section_key, content_value')
          .eq('page_name', pageName)
          .order('order_index', { ascending: true });

        if (error) {
          throw error;
        }

        // transformar array de rows em objeto { section_key: content_value }
        const map: PageContent = {};
        (data ?? []).forEach((row: any) => {
          if (row.section_key) map[row.section_key] = row.content_value ?? '';
        });

        if (mounted) {
          setContent(map);
        }
      } catch (err: any) {
        console.error('Erro ao carregar conteúdo da página', pageName, err);
        if (mounted) setError(err?.message ?? 'Erro desconhecido');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadContent();

    // Opcional: subscrever mudanças via Supabase realtime (se sua tabela usa realtime)
    // const channel = supabase
    //   .channel('page-content-' + pageName)
    //   .on('postgres_changes', { event: '*', schema: 'public', table: 'page_content', filter: `page_name=eq.${pageName}` }, () => {
    //     loadContent();
    //   })
    //   .subscribe();

    return () => {
      mounted = false;
      // supabase.removeChannel(channel) // descomente se usar canal
    };
  }, [pageName]);

  const getContent = (key: string, defaultValue: string = ''): string => {
    const value = content[key];
    if (value === undefined || value === null) return defaultValue;
    return value;
  };

  return {
    content,
    loading,
    error,
    getContent,
    get: getContent, // compatibilidade
  };
}
