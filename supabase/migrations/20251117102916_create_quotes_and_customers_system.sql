/*
  # Sistema de Orçamentos e Clientes

  1. Nova Tabela: customers (Clientes)
    - `id` (uuid, primary key) - Identificador único
    - `customer_type` (text) - Tipo: 'PF' ou 'PJ'
    - `status` (text) - Status: 'pre_lista', 'ativo', 'inativo'
    
    Pessoa Física:
    - `full_name` (text) - Nome completo
    - `cpf` (text) - CPF
    - `rg` (text) - RG (opcional)
    
    Pessoa Jurídica:
    - `company_name` (text) - Razão social
    - `trade_name` (text) - Nome fantasia
    - `cnpj` (text) - CNPJ
    - `ie` (text) - Inscrição Estadual
    - `im` (text) - Inscrição Municipal
    - `responsible_name` (text) - Nome do responsável
    - `responsible_position` (text) - Cargo do responsável
    
    Comum:
    - `address` (text) - Endereço completo
    - `phone` (text) - Telefone principal
    - `whatsapp` (text) - WhatsApp
    - `email` (text) - E-mail
    - `internal_notes` (text) - Observações internas
    - `contact_preferences` (text) - Preferências de contato
    - `commercial_conditions` (text) - Condições comerciais
    - `created_at` (timestamptz) - Data de criação
    - `updated_at` (timestamptz) - Data de atualização

  2. Nova Tabela: visits (Visitas)
    - `id` (uuid, primary key)
    - `customer_id` (uuid, foreign key)
    - `visit_date` (date) - Data da visita
    - `visit_time` (time) - Horário
    - `responsible` (text) - Responsável pela visita
    - `status` (text) - Status: 'pendente', 'concluida', 'cancelada'
    - `notes` (text) - Observações
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  3. Nova Tabela: materials (Materiais)
    - `id` (uuid, primary key)
    - `name` (text) - Nome do material
    - `density` (decimal) - Densidade (ex: 2.7 para alumínio)
    - `cost_per_kg` (decimal) - Custo por quilo
    - `active` (boolean) - Ativo/Inativo
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  4. Nova Tabela: service_types (Tipos de Serviço)
    - `id` (uuid, primary key)
    - `name` (text) - Nome do serviço
    - `description` (text) - Descrição
    - `difficulty_factor_normal` (decimal) - Fator normal (padrão 2.1)
    - `difficulty_factor_medium` (decimal) - Fator médio (padrão 2.7)
    - `difficulty_factor_hard` (decimal) - Fator difícil (padrão 3.5)
    - `active` (boolean)
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  5. Nova Tabela: quotes (Orçamentos)
    - `id` (uuid, primary key)
    - `quote_number` (text) - Número do orçamento
    - `customer_id` (uuid, foreign key)
    - `status` (text) - Status: 'rascunho', 'enviado', 'aprovado', 'rejeitado'
    - `total_amount` (decimal) - Valor total
    - `discount` (decimal) - Desconto
    - `final_amount` (decimal) - Valor final
    - `validity_days` (integer) - Validade em dias
    - `notes` (text) - Observações
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  6. Nova Tabela: quote_items (Itens do Orçamento)
    - `id` (uuid, primary key)
    - `quote_id` (uuid, foreign key)
    - `item_type` (text) - Tipo: 'calha', 'rufo', 'platibanda', 'colarinho', 'chamine', etc
    - `material_id` (uuid, foreign key)
    - `service_type_id` (uuid, foreign key)
    - `width_mm` (decimal) - Largura em mm
    - `thickness_mm` (decimal) - Espessura em mm
    - `length_meters` (decimal) - Metragem
    - `difficulty_level` (text) - Nível: 'normal', 'medium', 'hard'
    - `unit_cost` (decimal) - Custo unitário calculado
    - `total_cost` (decimal) - Custo total do item
    - `notes` (text) - Observações da obra
    - `created_at` (timestamptz)

  7. Segurança
    - RLS habilitado em todas as tabelas
    - Apenas usuários autenticados podem acessar
*/

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_type text NOT NULL CHECK (customer_type IN ('PF', 'PJ')),
  status text NOT NULL DEFAULT 'pre_lista' CHECK (status IN ('pre_lista', 'ativo', 'inativo')),
  
  full_name text,
  cpf text,
  rg text,
  
  company_name text,
  trade_name text,
  cnpj text,
  ie text,
  im text,
  responsible_name text,
  responsible_position text,
  
  address text,
  phone text NOT NULL,
  whatsapp text,
  email text,
  internal_notes text,
  contact_preferences text,
  commercial_conditions text,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de visitas
CREATE TABLE IF NOT EXISTS visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  visit_date date NOT NULL,
  visit_time time,
  responsible text,
  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'concluida', 'cancelada')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de materiais
CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  density decimal(10,2) NOT NULL DEFAULT 2.7,
  cost_per_kg decimal(10,2) NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de tipos de serviço
CREATE TABLE IF NOT EXISTS service_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  difficulty_factor_normal decimal(10,2) DEFAULT 2.1,
  difficulty_factor_medium decimal(10,2) DEFAULT 2.7,
  difficulty_factor_hard decimal(10,2) DEFAULT 3.5,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de orçamentos
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number text NOT NULL UNIQUE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'enviado', 'aprovado', 'rejeitado', 'cancelado')),
  total_amount decimal(10,2) DEFAULT 0,
  discount decimal(10,2) DEFAULT 0,
  final_amount decimal(10,2) DEFAULT 0,
  validity_days integer DEFAULT 15,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de itens do orçamento
CREATE TABLE IF NOT EXISTS quote_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id uuid NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  item_type text NOT NULL,
  material_id uuid REFERENCES materials(id) ON DELETE RESTRICT,
  service_type_id uuid REFERENCES service_types(id) ON DELETE RESTRICT,
  width_mm decimal(10,2) NOT NULL,
  thickness_mm decimal(10,2) NOT NULL,
  length_meters decimal(10,2) NOT NULL,
  difficulty_level text NOT NULL DEFAULT 'normal' CHECK (difficulty_level IN ('normal', 'medium', 'hard')),
  unit_cost decimal(10,2) NOT NULL,
  total_cost decimal(10,2) NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_customers_type ON customers(customer_type);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_visits_customer ON visits(customer_id);
CREATE INDEX IF NOT EXISTS idx_visits_date ON visits(visit_date);
CREATE INDEX IF NOT EXISTS idx_quotes_customer ON quotes(customer_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quote_items_quote ON quote_items(quote_id);

-- Habilitar RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;

-- Políticas para customers
CREATE POLICY "Authenticated users can read customers"
  ON customers FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert customers"
  ON customers FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers"
  ON customers FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete customers"
  ON customers FOR DELETE TO authenticated USING (true);

-- Políticas para visits
CREATE POLICY "Authenticated users can read visits"
  ON visits FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert visits"
  ON visits FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update visits"
  ON visits FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete visits"
  ON visits FOR DELETE TO authenticated USING (true);

-- Políticas para materials
CREATE POLICY "Authenticated users can read materials"
  ON materials FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert materials"
  ON materials FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update materials"
  ON materials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete materials"
  ON materials FOR DELETE TO authenticated USING (true);

-- Políticas para service_types
CREATE POLICY "Authenticated users can read service_types"
  ON service_types FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert service_types"
  ON service_types FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update service_types"
  ON service_types FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete service_types"
  ON service_types FOR DELETE TO authenticated USING (true);

-- Políticas para quotes
CREATE POLICY "Authenticated users can read quotes"
  ON quotes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert quotes"
  ON quotes FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update quotes"
  ON quotes FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete quotes"
  ON quotes FOR DELETE TO authenticated USING (true);

-- Políticas para quote_items
CREATE POLICY "Authenticated users can read quote_items"
  ON quote_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert quote_items"
  ON quote_items FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update quote_items"
  ON quote_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete quote_items"
  ON quote_items FOR DELETE TO authenticated USING (true);

-- Inserir materiais padrão
INSERT INTO materials (name, density, cost_per_kg, active) VALUES
  ('Alumínio', 2.7, 34.60, true),
  ('Galvanizado', 7.85, 28.50, true),
  ('Aço Inox', 7.93, 65.00, true)
ON CONFLICT DO NOTHING;

-- Inserir tipos de serviço padrão
INSERT INTO service_types (name, description, difficulty_factor_normal, difficulty_factor_medium, difficulty_factor_hard, active) VALUES
  ('Instalação de Calhas', 'Instalação completa de sistema de calhas', 2.1, 2.7, 3.5, true),
  ('Rufos e Pingadeiras', 'Instalação de rufos e pingadeiras', 2.1, 2.7, 3.5, true),
  ('Platibandas', 'Instalação de platibandas', 2.1, 2.7, 3.5, true),
  ('Colarinhos de Chaminé', 'Instalação de colarinhos', 2.1, 2.7, 3.5, true),
  ('Chaminés e Coifas', 'Instalação de chaminés e coifas', 2.1, 2.7, 3.5, true),
  ('Manutenção', 'Serviço de manutenção', 2.1, 2.7, 3.5, true),
  ('Troca', 'Troca de peças existentes', 2.1, 2.7, 3.5, true)
ON CONFLICT DO NOTHING;

-- Função para gerar número de orçamento
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT AS $$
DECLARE
  year_suffix TEXT;
  next_number INTEGER;
  new_number TEXT;
BEGIN
  year_suffix := TO_CHAR(NOW(), 'YY');
  
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(quote_number FROM '\d+$') AS INTEGER)
  ), 0) + 1
  INTO next_number
  FROM quotes
  WHERE quote_number LIKE 'ORC' || year_suffix || '%';
  
  new_number := 'ORC' || year_suffix || LPAD(next_number::TEXT, 4, '0');
  
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;