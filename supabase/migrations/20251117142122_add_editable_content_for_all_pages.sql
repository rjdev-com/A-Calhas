/*
  # Adicionar conteúdo editável para todas as páginas

  1. Conteúdo para Serviços
    - Hero section (título, subtítulo)
    - Seção de alumínio (título, texto, imagens)
    - Serviços individuais (título, descrição, detalhes, imagens)
    - CTA final
  
  2. Conteúdo para Sobre
    - Hero section
    - Seção principal (título, texto, imagem)
    - Valores (títulos e descrições)
    - Benefícios
    - Seção final com CTA
  
  3. Conteúdo para Contato
    - Hero section
    - Informações de contato (telefone, email, endereço)
    - Redes sociais

  4. Notas importantes
    - Todos os conteúdos são editáveis via CMS
    - Imagens armazenadas no bucket 'page-images'
    - Conteúdo estruturado com section_key para fácil identificação
*/

-- Inserir conteúdo editável para a página de Serviços
INSERT INTO page_content (page_name, section_key, content_type, content_value, order_index) VALUES
  -- Hero Section
  ('servicos', 'hero_title', 'text', 'Nossos Serviços', 1),
  ('servicos', 'hero_subtitle', 'text', 'Soluções completas em alumínio de alta qualidade para projetos residenciais, comerciais e industriais em Joinville e região', 2),
  
  -- Seção Alumínio
  ('servicos', 'aluminio_title', 'text', 'Alumínio de Primeira Qualidade', 10),
  ('servicos', 'aluminio_intro', 'text', 'Todos os nossos produtos são fabricados com alumínio de alta qualidade, disponível em duas espessuras para atender diferentes necessidades e orçamentos:', 11),
  ('servicos', 'aluminio_05_title', 'text', 'Alumínio 0,5mm', 12),
  ('servicos', 'aluminio_05_benefit1', 'text', 'Opção econômica com excelente custo-benefício', 13),
  ('servicos', 'aluminio_05_benefit2', 'text', 'Ideal para projetos residenciais', 14),
  ('servicos', 'aluminio_05_benefit3', 'text', 'Durabilidade comprovada', 15),
  ('servicos', 'aluminio_07_title', 'text', 'Alumínio 0,7mm', 16),
  ('servicos', 'aluminio_07_benefit1', 'text', 'Resistência reforçada para maior durabilidade', 17),
  ('servicos', 'aluminio_07_benefit2', 'text', 'Recomendado para projetos comerciais', 18),
  ('servicos', 'aluminio_07_benefit3', 'text', 'Máxima proteção e vida útil prolongada', 19),
  
  -- Serviço 1: Calhas
  ('servicos', 'service1_title', 'text', 'Calhas de Alumínio', 20),
  ('servicos', 'service1_description', 'text', 'Fabricação e instalação de calhas residenciais e comerciais', 21),
  ('servicos', 'service1_detail1', 'text', 'Alumínio 0,5mm - opção econômica e durável', 22),
  ('servicos', 'service1_detail2', 'text', 'Alumínio 0,7mm - resistência reforçada', 23),
  ('servicos', 'service1_detail3', 'text', 'Modelos personalizados conforme necessidade', 24),
  ('servicos', 'service1_detail4', 'text', 'Proteção eficiente contra águas pluviais', 25),
  ('servicos', 'service1_detail5', 'text', 'Acabamento profissional', 26),
  ('servicos', 'service1_image', 'image', 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800', 27),
  
  -- Serviço 2: Rufos
  ('servicos', 'service2_title', 'text', 'Rufos e Pingadeiras', 30),
  ('servicos', 'service2_description', 'text', 'Proteção completa para telhados e estruturas', 31),
  ('servicos', 'service2_detail1', 'text', 'Vedação perfeita em encontros de telhado', 32),
  ('servicos', 'service2_detail2', 'text', 'Proteção contra infiltrações', 33),
  ('servicos', 'service2_detail3', 'text', 'Acabamento em alumínio durável', 34),
  ('servicos', 'service2_detail4', 'text', 'Resistente à corrosão', 35),
  ('servicos', 'service2_detail5', 'text', 'Instalação precisa e profissional', 36),
  ('servicos', 'service2_image', 'image', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800', 37),
  
  -- Serviço 3: Colarinhos
  ('servicos', 'service3_title', 'text', 'Colarinhos de Chaminé', 40),
  ('servicos', 'service3_description', 'text', 'Vedação profissional para chaminés', 41),
  ('servicos', 'service3_detail1', 'text', 'Vedação completa contra água e vento', 42),
  ('servicos', 'service3_detail2', 'text', 'Fabricação em alumínio de alta qualidade', 43),
  ('servicos', 'service3_detail3', 'text', 'Modelos adaptáveis a diferentes tipos de chaminé', 44),
  ('servicos', 'service3_detail4', 'text', 'Instalação técnica e segura', 45),
  ('servicos', 'service3_detail5', 'text', 'Durabilidade garantida', 46),
  ('servicos', 'service3_image', 'image', 'https://images.pexels.com/photos/2816323/pexels-photo-2816323.jpeg?auto=compress&cs=tinysrgb&w=800', 47),
  
  -- Serviço 4: Chaminés
  ('servicos', 'service4_title', 'text', 'Chaminés para Churrasqueiras', 50),
  ('servicos', 'service4_description', 'text', 'Exaustão eficiente para áreas de churrasco', 51),
  ('servicos', 'service4_detail1', 'text', 'Design funcional e estético', 52),
  ('servicos', 'service4_detail2', 'text', 'Alumínio resistente a altas temperaturas', 53),
  ('servicos', 'service4_detail3', 'text', 'Tiragem de fumaça eficiente', 54),
  ('servicos', 'service4_detail4', 'text', 'Personalização conforme projeto', 55),
  ('servicos', 'service4_detail5', 'text', 'Instalação completa', 56),
  ('servicos', 'service4_image', 'image', 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800', 57),
  
  -- Serviço 5: Coifas
  ('servicos', 'service5_title', 'text', 'Coifas para Cozinhas', 60),
  ('servicos', 'service5_description', 'text', 'Exaustão profissional para ambientes', 61),
  ('servicos', 'service5_detail1', 'text', 'Fabricação personalizada em alumínio', 62),
  ('servicos', 'service5_detail2', 'text', 'Modelos residenciais e comerciais', 63),
  ('servicos', 'service5_detail3', 'text', 'Eficiência na exaustão de vapores', 64),
  ('servicos', 'service5_detail4', 'text', 'Acabamento de alta qualidade', 65),
  ('servicos', 'service5_detail5', 'text', 'Instalação profissional', 66),
  ('servicos', 'service5_image', 'image', 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=800', 67),
  
  -- Serviço 6: Condutores
  ('servicos', 'service6_title', 'text', 'Condutores Pluviais', 70),
  ('servicos', 'service6_description', 'text', 'Sistema completo de escoamento de água', 71),
  ('servicos', 'service6_detail1', 'text', 'Alumínio 0,5mm e 0,7mm', 72),
  ('servicos', 'service6_detail2', 'text', 'Direcionamento eficiente de água pluvial', 73),
  ('servicos', 'service6_detail3', 'text', 'Modelos redondos e quadrados', 74),
  ('servicos', 'service6_detail4', 'text', 'Fixações seguras e discretas', 75),
  ('servicos', 'service6_detail5', 'text', 'Integração perfeita com calhas', 76),
  ('servicos', 'service6_image', 'image', 'https://images.pexels.com/photos/221018/pexels-photo-221018.jpeg?auto=compress&cs=tinysrgb&w=800', 77),
  
  -- CTA Final
  ('servicos', 'cta_title', 'text', 'Pronto para Iniciar seu Projeto?', 80),
  ('servicos', 'cta_subtitle', 'text', 'Entre em contato e receba um orçamento personalizado sem compromisso', 81)
ON CONFLICT (page_name, section_key) DO NOTHING;

-- Inserir conteúdo editável para a página Sobre
INSERT INTO page_content (page_name, section_key, content_type, content_value, order_index) VALUES
  -- Hero Section
  ('sobre', 'hero_title', 'text', 'Sobre a A Calhas', 1),
  ('sobre', 'hero_subtitle', 'text', 'Especialistas em fabricação e instalação de calhas, rufos e produtos em alumínio em Joinville - SC', 2),
  
  -- Seção Principal
  ('sobre', 'main_title', 'text', 'Compromisso com a Excelência', 10),
  ('sobre', 'main_text1', 'text', 'A A Calhas é uma empresa especializada em fabricação e instalação de calhas, rufos, pingadeiras e produtos em alumínio, atuando em Joinville e região com foco na qualidade e satisfação dos clientes.', 11),
  ('sobre', 'main_text2', 'text', 'Nossa experiência no mercado nos permite oferecer soluções personalizadas para projetos residenciais, comerciais e industriais, sempre utilizando materiais de primeira qualidade e técnicas de instalação profissionais.', 12),
  ('sobre', 'main_text3', 'text', 'Trabalhamos com alumínio em duas espessuras (0,5mm e 0,7mm) para atender diferentes necessidades e orçamentos, garantindo sempre a melhor relação custo-benefício para nossos clientes.', 13),
  ('sobre', 'main_image', 'image', 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800', 14),
  ('sobre', 'main_stat_number', 'text', '100%', 15),
  ('sobre', 'main_stat_text', 'text', 'Compromisso com Qualidade', 16),
  
  -- Valores
  ('sobre', 'values_title', 'text', 'Nossos Valores', 20),
  ('sobre', 'values_subtitle', 'text', 'Princípios que guiam nosso trabalho diariamente', 21),
  ('sobre', 'value1_title', 'text', 'Qualidade', 22),
  ('sobre', 'value1_description', 'text', 'Utilizamos apenas alumínio de primeira linha em todas as nossas fabricações', 23),
  ('sobre', 'value2_title', 'text', 'Pontualidade', 24),
  ('sobre', 'value2_description', 'text', 'Cumprimos os prazos estabelecidos com responsabilidade e profissionalismo', 25),
  ('sobre', 'value3_title', 'text', 'Atendimento', 26),
  ('sobre', 'value3_description', 'text', 'Atendimento personalizado do orçamento à finalização do projeto', 27),
  ('sobre', 'value4_title', 'text', 'Expertise', 28),
  ('sobre', 'value4_description', 'text', 'Equipe experiente e qualificada em fabricação e instalação', 29),
  
  -- Benefícios
  ('sobre', 'benefits_title', 'text', 'Por Que Escolher a A Calhas?', 30),
  ('sobre', 'benefits_image', 'image', 'https://images.pexels.com/photos/259984/pexels-photo-259984.jpeg?auto=compress&cs=tinysrgb&w=800', 31),
  ('sobre', 'benefit1', 'text', 'Fabricação própria com controle total de qualidade', 32),
  ('sobre', 'benefit2', 'text', 'Alumínio em duas espessuras: 0,5mm e 0,7mm', 33),
  ('sobre', 'benefit3', 'text', 'Projetos personalizados conforme suas necessidades', 34),
  ('sobre', 'benefit4', 'text', 'Instalação profissional e segura', 35),
  ('sobre', 'benefit5', 'text', 'Atendimento em Joinville e região', 36),
  ('sobre', 'benefit6', 'text', 'Orçamento sem compromisso', 37),
  ('sobre', 'benefit7', 'text', 'Garantia dos serviços prestados', 38),
  ('sobre', 'benefit8', 'text', 'Acompanhamento durante todo o projeto', 39),
  
  -- Destaques
  ('sobre', 'highlight1_title', 'text', 'Fabricação Própria', 40),
  ('sobre', 'highlight1_description', 'text', 'Controle total sobre qualidade e prazos de entrega', 41),
  ('sobre', 'highlight2_title', 'text', 'Alumínio Premium', 42),
  ('sobre', 'highlight2_description', 'text', 'Material de primeira qualidade em 0,5mm e 0,7mm', 43),
  ('sobre', 'highlight3_title', 'text', 'Atendimento Local', 44),
  ('sobre', 'highlight3_description', 'text', 'Presente em Joinville e toda a região', 45),
  
  -- CTA Final
  ('sobre', 'cta_title', 'text', 'Vamos Trabalhar Juntos?', 50),
  ('sobre', 'cta_subtitle', 'text', 'Entre em contato e descubra como podemos transformar seu projeto em realidade', 51)
ON CONFLICT (page_name, section_key) DO NOTHING;

-- Inserir conteúdo editável para a página Contato
INSERT INTO page_content (page_name, section_key, content_type, content_value, order_index) VALUES
  -- Hero Section
  ('contato', 'hero_title', 'text', 'Entre em Contato', 1),
  ('contato', 'hero_subtitle', 'text', 'Estamos prontos para atender você. Solicite um orçamento sem compromisso', 2),
  
  -- Informações
  ('contato', 'info_title', 'text', 'Informações de Contato', 10),
  ('contato', 'info_subtitle', 'text', 'Entre em contato conosco através dos canais abaixo ou preencha o formulário. Responderemos o mais breve possível.', 11),
  ('contato', 'phone', 'text', '(47) 98910-0709', 12),
  ('contato', 'email', 'text', 'contato@acalhas.com.br', 13),
  ('contato', 'address_title', 'text', 'Localização', 14),
  ('contato', 'address', 'text', 'Joinville - SC', 15),
  ('contato', 'address_subtitle', 'text', 'Atendemos Joinville e região', 16),
  
  -- Redes Sociais
  ('contato', 'social_title', 'text', 'Siga-nos nas Redes Sociais', 20),
  ('contato', 'instagram_url', 'text', 'https://instagram.com/acalhasof', 21),
  ('contato', 'facebook_url', 'text', 'https://facebook.com/acalhasof', 22),
  
  -- Formulário
  ('contato', 'form_title', 'text', 'Solicite seu Orçamento', 30),
  
  -- CTA WhatsApp
  ('contato', 'whatsapp_cta_title', 'text', 'Prefere Falar Diretamente?', 40),
  ('contato', 'whatsapp_cta_subtitle', 'text', 'Entre em contato via WhatsApp para um atendimento rápido e personalizado', 41)
ON CONFLICT (page_name, section_key) DO NOTHING;