/*
  # Sistema de Gerenciamento de Conteúdo (CMS)

  1. Nova Tabela: page_content
    - `id` (uuid, primary key) - Identificador único
    - `page_name` (text) - Nome da página (inicio, sobre, servicos, contato, portfolio)
    - `section_key` (text) - Chave da seção (hero_title, hero_subtitle, etc)
    - `content_type` (text) - Tipo de conteúdo (text, image, html)
    - `content_value` (text) - Valor do conteúdo
    - `order_index` (integer) - Ordem de exibição
    - `created_at` (timestamptz) - Data de criação
    - `updated_at` (timestamptz) - Data de atualização

  2. Storage Bucket: page-images
    - Bucket para armazenar imagens das páginas

  3. Segurança
    - RLS habilitado
    - Políticas para leitura pública
    - Políticas para edição apenas por usuários autenticados
*/

-- Criar tabela de conteúdo das páginas
CREATE TABLE IF NOT EXISTS page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name text NOT NULL,
  section_key text NOT NULL,
  content_type text NOT NULL DEFAULT 'text',
  content_value text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_name, section_key)
);

-- Habilitar RLS
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Políticas: Todos podem ler
CREATE POLICY "Anyone can read page content"
  ON page_content
  FOR SELECT
  TO public
  USING (true);

-- Políticas: Apenas autenticados podem inserir
CREATE POLICY "Authenticated users can insert page content"
  ON page_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Políticas: Apenas autenticados podem atualizar
CREATE POLICY "Authenticated users can update page content"
  ON page_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas: Apenas autenticados podem deletar
CREATE POLICY "Authenticated users can delete page content"
  ON page_content
  FOR DELETE
  TO authenticated
  USING (true);

-- Criar bucket de storage para imagens das páginas (se não existir)
INSERT INTO storage.buckets (id, name, public)
VALUES ('page-images', 'page-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage: Todos podem ler
CREATE POLICY "Anyone can read page images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'page-images');

-- Políticas de storage: Apenas autenticados podem fazer upload
CREATE POLICY "Authenticated users can upload page images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'page-images');

-- Políticas de storage: Apenas autenticados podem atualizar
CREATE POLICY "Authenticated users can update page images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'page-images')
  WITH CHECK (bucket_id = 'page-images');

-- Políticas de storage: Apenas autenticados podem deletar
CREATE POLICY "Authenticated users can delete page images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'page-images');

-- Inserir conteúdo padrão para a página inicial
INSERT INTO page_content (page_name, section_key, content_type, content_value, order_index) VALUES
  ('inicio', 'hero_title', 'text', 'Soluções em Calhas e Rufos para Joinville', 1),
  ('inicio', 'hero_subtitle', 'text', 'Qualidade, precisão e acabamento profissional em cada projeto. Atendemos Joinville e região com excelência há mais de 10 anos.', 2),
  ('inicio', 'about_title', 'text', 'Por que escolher a A Calhas?', 3),
  ('inicio', 'about_text', 'text', 'Com mais de uma década de experiência, somos especialistas em soluções completas para captação de águas pluviais. Utilizamos materiais de primeira linha e nossa equipe é altamente qualificada para garantir instalações perfeitas e duradouras.', 4)
ON CONFLICT (page_name, section_key) DO NOTHING;

-- Inserir conteúdo padrão para a página sobre
INSERT INTO page_content (page_name, section_key, content_type, content_value, order_index) VALUES
  ('sobre', 'hero_title', 'text', 'Sobre a A Calhas', 1),
  ('sobre', 'hero_subtitle', 'text', 'Tradição, qualidade e compromisso com a excelência em cada projeto', 2),
  ('sobre', 'history_title', 'text', 'Nossa História', 3),
  ('sobre', 'history_text', 'text', 'Fundada em Joinville, a A Calhas nasceu do compromisso de oferecer soluções de qualidade superior em sistemas de captação de águas pluviais. Com mais de 10 anos de experiência no mercado, consolidamos nossa posição como referência em calhas, rufos e acabamentos metálicos na região.', 4)
ON CONFLICT (page_name, section_key) DO NOTHING;

-- Inserir conteúdo padrão para a página de serviços
INSERT INTO page_content (page_name, section_key, content_type, content_value, order_index) VALUES
  ('servicos', 'hero_title', 'text', 'Nossos Serviços', 1),
  ('servicos', 'hero_subtitle', 'text', 'Soluções completas em calhas, rufos e acabamentos metálicos com qualidade profissional', 2)
ON CONFLICT (page_name, section_key) DO NOTHING;

-- Inserir conteúdo padrão para a página de portfólio
INSERT INTO page_content (page_name, section_key, content_type, content_value, order_index) VALUES
  ('portfolio', 'hero_title', 'text', 'Portfólio', 1),
  ('portfolio', 'hero_subtitle', 'text', 'Confira nossos trabalhos realizados em Joinville e região. Qualidade e acabamento profissional em cada projeto.', 2),
  ('portfolio', 'cta_title', 'text', 'Quer trabalhos como esses?', 3),
  ('portfolio', 'cta_subtitle', 'text', 'Entre em contato e transforme seu projeto em realidade com qualidade e profissionalismo.', 4)
ON CONFLICT (page_name, section_key) DO NOTHING;

-- Inserir conteúdo padrão para a página de contato
INSERT INTO page_content (page_name, section_key, content_type, content_value, order_index) VALUES
  ('contato', 'hero_title', 'text', 'Entre em Contato', 1),
  ('contato', 'hero_subtitle', 'text', 'Estamos prontos para atender você e transformar seu projeto em realidade', 2),
  ('contato', 'phone', 'text', '(47) 98910-0709', 3),
  ('contato', 'email', 'text', 'contato@acalhas.com.br', 4),
  ('contato', 'address', 'text', 'Joinville - SC', 5)
ON CONFLICT (page_name, section_key) DO NOTHING;