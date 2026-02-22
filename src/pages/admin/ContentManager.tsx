import { useState, useEffect } from 'react';
import { Save, ChevronDown, ChevronRight, Check, Loader2, Type, Image as ImageIcon, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Definição dos campos editáveis de cada página
interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image';
  placeholder: string;
  defaultValue: string;
}

interface SectionConfig {
  id: string;
  title: string;
  fields: FieldConfig[];
}

interface PageConfig {
  id: string;
  name: string;
  icon: string;
  sections: SectionConfig[];
}

// Configuração completa de todas as páginas e seus campos editáveis
const pagesConfig: PageConfig[] = [
  {
    id: 'inicio',
    name: 'Página Inicial',
    icon: '🏠',
    sections: [
      {
        id: 'geral',
        title: 'Configurações Gerais (WhatsApp)',
        fields: [
          { key: 'whatsapp_numero', label: 'Número do WhatsApp (apenas números)', type: 'text', placeholder: 'Ex: 5547989100709', defaultValue: '5547989100709' },
          { key: 'whatsapp_mensagem', label: 'Mensagem padrão do WhatsApp', type: 'text', placeholder: 'Mensagem que aparece ao clicar', defaultValue: 'Olá, gostaria de solicitar um orçamento' },
        ],
      },
      {
        id: 'hero',
        title: 'Seção Principal (Hero)',
        fields: [
          { key: 'hero_title', label: 'Título Principal', type: 'text', placeholder: 'Ex: Calhas de Alumínio de Alta Qualidade em', defaultValue: 'Calhas de Alumínio de Alta Qualidade em' },
          { key: 'hero_subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Descrição do serviço', defaultValue: 'Fabricação e instalação profissional de calhas, rufos e produtos em alumínio 0,5mm e 0,7mm' },
          { key: 'hero_button1', label: 'Botão Principal (CTA)', type: 'text', placeholder: 'Texto do botão', defaultValue: 'Solicitar Orçamento Grátis' },
          { key: 'hero_button2', label: 'Botão Secundário', type: 'text', placeholder: 'Texto do botão', defaultValue: 'Quer Trabalhos Como Esses?' },
        ],
      },
      {
        id: 'benefits',
        title: 'Benefícios (3 cards)',
        fields: [
          { key: 'benefit1_title', label: 'Benefício 1 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Qualidade Garantida' },
          { key: 'benefit1_description', label: 'Benefício 1 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Alumínio de primeira qualidade com espessuras de 0,5mm e 0,7mm' },
          { key: 'benefit2_title', label: 'Benefício 2 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Entrega Rápida' },
          { key: 'benefit2_description', label: 'Benefício 2 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Fabricação própria para agilidade no atendimento' },
          { key: 'benefit3_title', label: 'Benefício 3 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Durabilidade' },
          { key: 'benefit3_description', label: 'Benefício 3 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Produtos resistentes à corrosão e intempéries' },
        ],
      },
      {
        id: 'services',
        title: 'Serviços em Destaque (4 cards)',
        fields: [
          { key: 'services_title', label: 'Título da Seção', type: 'text', placeholder: 'Título', defaultValue: 'Nossos Serviços' },
          { key: 'services_subtitle', label: 'Subtítulo da Seção', type: 'text', placeholder: 'Subtítulo', defaultValue: 'Soluções completas em alumínio para sua obra' },
          { key: 'service1_title', label: 'Serviço 1 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Calhas de Alumínio' },
          { key: 'service1_description', label: 'Serviço 1 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Fabricação e instalação de calhas residenciais e comerciais em alumínio 0,5mm e 0,7mm' },
          { key: 'service2_title', label: 'Serviço 2 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Rufos e Pingadeiras' },
          { key: 'service2_description', label: 'Serviço 2 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Proteção completa para telhados e estruturas com acabamento profissional' },
          { key: 'service3_title', label: 'Serviço 3 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Colarinhos de Chaminé' },
          { key: 'service3_description', label: 'Serviço 3 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Vedação perfeita para chaminés com materiais de alta durabilidade' },
          { key: 'service4_title', label: 'Serviço 4 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Chaminés e Coifas' },
          { key: 'service4_description', label: 'Serviço 4 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Chaminés para churrasqueiras e coifas para cozinhas em alumínio' },
          { key: 'services_button', label: 'Botão Ver Todos', type: 'text', placeholder: 'Texto do botão', defaultValue: 'Ver Todos os Serviços' },
        ],
      },
      {
        id: 'aluminum',
        title: 'Seção Alumínio',
        fields: [
          { key: 'aluminum_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Alumínio de Alta Qualidade' },
          { key: 'aluminum_subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Subtítulo', defaultValue: 'Trabalhamos com alumínio em duas espessuras para atender suas necessidades:' },
          { key: 'aluminum_05_title', label: '0,5mm - Título', type: 'text', placeholder: 'Título', defaultValue: '0,5mm' },
          { key: 'aluminum_05_description', label: '0,5mm - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Opção econômica com excelente durabilidade para projetos residenciais' },
          { key: 'aluminum_07_title', label: '0,7mm - Título', type: 'text', placeholder: 'Título', defaultValue: '0,7mm' },
          { key: 'aluminum_07_description', label: '0,7mm - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Reforçada para maior resistência em projetos comerciais e industriais' },
          { key: 'aluminum_button', label: 'Botão CTA', type: 'text', placeholder: 'Texto do botão', defaultValue: 'Consulte a Melhor Opção para Você' },
        ],
      },
      {
        id: 'cta',
        title: 'Chamada para Ação Final',
        fields: [
          { key: 'cta_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Pronto para Começar seu Projeto?' },
          { key: 'cta_subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Subtítulo', defaultValue: 'Entre em contato agora e receba um orçamento personalizado sem compromisso' },
          { key: 'cta_whatsapp', label: 'Texto WhatsApp', type: 'text', placeholder: 'Texto do botão', defaultValue: 'WhatsApp: (47) 98910-0709' },
          { key: 'cta_contact', label: 'Texto Contato', type: 'text', placeholder: 'Texto do botão', defaultValue: 'Formulário de Contato' },
        ],
      },
    ],
  },
  {
    id: 'sobre',
    name: 'Sobre',
    icon: '📋',
    sections: [
      {
        id: 'hero',
        title: 'Cabeçalho da Página',
        fields: [
          { key: 'hero_title', label: 'Título', type: 'text', placeholder: 'Ex: Sobre a A Calhas', defaultValue: 'Sobre a A Calhas' },
          { key: 'hero_subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Descrição breve', defaultValue: 'Especialistas em fabricação e instalação de calhas, rufos e produtos em alumínio em Joinville - SC' },
        ],
      },
      {
        id: 'main',
        title: 'Conteúdo Principal',
        fields: [
          { key: 'main_title', label: 'Título da Seção', type: 'text', placeholder: 'Título', defaultValue: 'Compromisso com a Excelência' },
          { key: 'main_text1', label: 'Parágrafo 1', type: 'textarea', placeholder: 'Primeiro parágrafo', defaultValue: 'A A Calhas é uma empresa especializada em fabricação e instalação de calhas, rufos, pingadeiras e produtos em alumínio, atuando em Joinville e região com foco na qualidade e satisfação dos clientes.' },
          { key: 'main_text2', label: 'Parágrafo 2', type: 'textarea', placeholder: 'Segundo parágrafo', defaultValue: 'Nossa experiência no mercado nos permite oferecer soluções personalizadas para projetos residenciais, comerciais e industriais, sempre utilizando materiais de primeira qualidade e técnicas de instalação profissionais.' },
          { key: 'main_text3', label: 'Parágrafo 3', type: 'textarea', placeholder: 'Terceiro parágrafo', defaultValue: 'Trabalhamos com alumínio em duas espessuras (0,5mm e 0,7mm) para atender diferentes necessidades e orçamentos, garantindo sempre a melhor relação custo-benefício para nossos clientes.' },
          { key: 'main_image', label: 'Imagem Principal', type: 'image', placeholder: 'URL da imagem', defaultValue: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { key: 'main_stat_number', label: 'Destaque (número/texto)', type: 'text', placeholder: 'Ex: 100%', defaultValue: '100%' },
          { key: 'main_stat_text', label: 'Descrição do Destaque', type: 'text', placeholder: 'Ex: Compromisso com Qualidade', defaultValue: 'Compromisso com Qualidade' },
        ],
      },
      {
        id: 'values',
        title: 'Nossos Valores',
        fields: [
          { key: 'values_title', label: 'Título da Seção', type: 'text', placeholder: 'Título', defaultValue: 'Nossos Valores' },
          { key: 'values_subtitle', label: 'Subtítulo', type: 'text', placeholder: 'Subtítulo', defaultValue: 'Princípios que guiam nosso trabalho diariamente' },
          { key: 'value1_title', label: 'Valor 1 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Qualidade' },
          { key: 'value1_description', label: 'Valor 1 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Utilizamos apenas alumínio de primeira linha em todas as nossas fabricações' },
          { key: 'value2_title', label: 'Valor 2 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Pontualidade' },
          { key: 'value2_description', label: 'Valor 2 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Cumprimos os prazos estabelecidos com responsabilidade e profissionalismo' },
          { key: 'value3_title', label: 'Valor 3 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Atendimento' },
          { key: 'value3_description', label: 'Valor 3 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Atendimento personalizado do orçamento à finalização do projeto' },
          { key: 'value4_title', label: 'Valor 4 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Expertise' },
          { key: 'value4_description', label: 'Valor 4 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Equipe experiente e qualificada em fabricação e instalação' },
        ],
      },
      {
        id: 'benefits',
        title: 'Por Que Nos Escolher',
        fields: [
          { key: 'benefits_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Por Que Escolher a A Calhas?' },
          { key: 'benefits_image', label: 'Imagem', type: 'image', placeholder: 'URL da imagem', defaultValue: 'https://images.pexels.com/photos/259984/pexels-photo-259984.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { key: 'benefit1', label: 'Benefício 1', type: 'text', placeholder: 'Benefício', defaultValue: 'Fabricação própria com controle total de qualidade' },
          { key: 'benefit2', label: 'Benefício 2', type: 'text', placeholder: 'Benefício', defaultValue: 'Alumínio em duas espessuras: 0,5mm e 0,7mm' },
          { key: 'benefit3', label: 'Benefício 3', type: 'text', placeholder: 'Benefício', defaultValue: 'Projetos personalizados conforme suas necessidades' },
          { key: 'benefit4', label: 'Benefício 4', type: 'text', placeholder: 'Benefício', defaultValue: 'Instalação profissional e segura' },
          { key: 'benefit5', label: 'Benefício 5', type: 'text', placeholder: 'Benefício', defaultValue: 'Atendimento em Joinville e região' },
          { key: 'benefit6', label: 'Benefício 6', type: 'text', placeholder: 'Benefício', defaultValue: 'Orçamento sem compromisso' },
          { key: 'benefit7', label: 'Benefício 7', type: 'text', placeholder: 'Benefício', defaultValue: 'Garantia dos serviços prestados' },
          { key: 'benefit8', label: 'Benefício 8', type: 'text', placeholder: 'Benefício', defaultValue: 'Acompanhamento durante todo o projeto' },
        ],
      },
      {
        id: 'highlights',
        title: 'Destaques',
        fields: [
          { key: 'highlight1_title', label: 'Destaque 1 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Fabricação Própria' },
          { key: 'highlight1_description', label: 'Destaque 1 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Controle total sobre qualidade e prazos de entrega' },
          { key: 'highlight2_title', label: 'Destaque 2 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Alumínio Premium' },
          { key: 'highlight2_description', label: 'Destaque 2 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Material de primeira qualidade em 0,5mm e 0,7mm' },
          { key: 'highlight3_title', label: 'Destaque 3 - Título', type: 'text', placeholder: 'Título', defaultValue: 'Atendimento Local' },
          { key: 'highlight3_description', label: 'Destaque 3 - Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Presente em Joinville e toda a região' },
        ],
      },
      {
        id: 'cta',
        title: 'Chamada para Ação (CTA)',
        fields: [
          { key: 'cta_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Vamos Trabalhar Juntos?' },
          { key: 'cta_subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Subtítulo', defaultValue: 'Entre em contato e descubra como podemos transformar seu projeto em realidade' },
        ],
      },
    ],
  },
  {
    id: 'servicos',
    name: 'Serviços',
    icon: '🔧',
    sections: [
      {
        id: 'hero',
        title: 'Cabeçalho da Página',
        fields: [
          { key: 'hero_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Nossos Serviços' },
          { key: 'hero_subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Subtítulo', defaultValue: 'Soluções completas em alumínio de alta qualidade para projetos residenciais, comerciais e industriais em Joinville e região' },
        ],
      },
      {
        id: 'aluminio',
        title: 'Seção Alumínio',
        fields: [
          { key: 'aluminio_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Alumínio de Primeira Qualidade' },
          { key: 'aluminio_intro', label: 'Introdução', type: 'textarea', placeholder: 'Texto introdutório', defaultValue: 'Todos os nossos produtos são fabricados com alumínio de alta qualidade, disponível em duas espessuras para atender diferentes necessidades e orçamentos:' },
          { key: 'aluminio_05_title', label: 'Alumínio 0,5mm - Título', type: 'text', placeholder: 'Título', defaultValue: 'Alumínio 0,5mm' },
          { key: 'aluminio_05_benefit1', label: '0,5mm - Benefício 1', type: 'text', placeholder: 'Benefício', defaultValue: 'Opção econômica com excelente custo-benefício' },
          { key: 'aluminio_05_benefit2', label: '0,5mm - Benefício 2', type: 'text', placeholder: 'Benefício', defaultValue: 'Ideal para projetos residenciais' },
          { key: 'aluminio_05_benefit3', label: '0,5mm - Benefício 3', type: 'text', placeholder: 'Benefício', defaultValue: 'Durabilidade comprovada' },
          { key: 'aluminio_07_title', label: 'Alumínio 0,7mm - Título', type: 'text', placeholder: 'Título', defaultValue: 'Alumínio 0,7mm' },
          { key: 'aluminio_07_benefit1', label: '0,7mm - Benefício 1', type: 'text', placeholder: 'Benefício', defaultValue: 'Resistência reforçada para maior durabilidade' },
          { key: 'aluminio_07_benefit2', label: '0,7mm - Benefício 2', type: 'text', placeholder: 'Benefício', defaultValue: 'Recomendado para projetos comerciais' },
          { key: 'aluminio_07_benefit3', label: '0,7mm - Benefício 3', type: 'text', placeholder: 'Benefício', defaultValue: 'Máxima proteção e vida útil prolongada' },
        ],
      },
      {
        id: 'service1',
        title: 'Serviço: Calhas de Alumínio',
        fields: [
          { key: 'service1_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Calhas de Alumínio' },
          { key: 'service1_description', label: 'Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Fabricação e instalação de calhas residenciais e comerciais' },
          { key: 'service1_detail1', label: 'Detalhe 1', type: 'text', placeholder: 'Detalhe', defaultValue: 'Alumínio 0,5mm - opção econômica e durável' },
          { key: 'service1_detail2', label: 'Detalhe 2', type: 'text', placeholder: 'Detalhe', defaultValue: 'Alumínio 0,7mm - resistência reforçada' },
          { key: 'service1_detail3', label: 'Detalhe 3', type: 'text', placeholder: 'Detalhe', defaultValue: 'Modelos personalizados conforme necessidade' },
          { key: 'service1_detail4', label: 'Detalhe 4', type: 'text', placeholder: 'Detalhe', defaultValue: 'Proteção eficiente contra águas pluviais' },
          { key: 'service1_detail5', label: 'Detalhe 5', type: 'text', placeholder: 'Detalhe', defaultValue: 'Acabamento profissional' },
        ],
      },
      {
        id: 'service2',
        title: 'Serviço: Rufos e Pingadeiras',
        fields: [
          { key: 'service2_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Rufos e Pingadeiras' },
          { key: 'service2_description', label: 'Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Proteção completa para telhados e estruturas' },
          { key: 'service2_detail1', label: 'Detalhe 1', type: 'text', placeholder: 'Detalhe', defaultValue: 'Vedação perfeita em encontros de telhado' },
          { key: 'service2_detail2', label: 'Detalhe 2', type: 'text', placeholder: 'Detalhe', defaultValue: 'Proteção contra infiltrações' },
          { key: 'service2_detail3', label: 'Detalhe 3', type: 'text', placeholder: 'Detalhe', defaultValue: 'Acabamento em alumínio durável' },
          { key: 'service2_detail4', label: 'Detalhe 4', type: 'text', placeholder: 'Detalhe', defaultValue: 'Resistente à corrosão' },
          { key: 'service2_detail5', label: 'Detalhe 5', type: 'text', placeholder: 'Detalhe', defaultValue: 'Instalação precisa e profissional' },
        ],
      },
      {
        id: 'service3',
        title: 'Serviço: Colarinhos de Chaminé',
        fields: [
          { key: 'service3_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Colarinhos de Chaminé' },
          { key: 'service3_description', label: 'Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Vedação profissional para chaminés' },
          { key: 'service3_detail1', label: 'Detalhe 1', type: 'text', placeholder: 'Detalhe', defaultValue: 'Vedação completa contra água e vento' },
          { key: 'service3_detail2', label: 'Detalhe 2', type: 'text', placeholder: 'Detalhe', defaultValue: 'Fabricação em alumínio de alta qualidade' },
          { key: 'service3_detail3', label: 'Detalhe 3', type: 'text', placeholder: 'Detalhe', defaultValue: 'Modelos adaptáveis a diferentes tipos de chaminé' },
          { key: 'service3_detail4', label: 'Detalhe 4', type: 'text', placeholder: 'Detalhe', defaultValue: 'Instalação técnica e segura' },
          { key: 'service3_detail5', label: 'Detalhe 5', type: 'text', placeholder: 'Detalhe', defaultValue: 'Durabilidade garantida' },
        ],
      },
      {
        id: 'service4',
        title: 'Serviço: Chaminés para Churrasqueiras',
        fields: [
          { key: 'service4_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Chaminés para Churrasqueiras' },
          { key: 'service4_description', label: 'Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Exaustão eficiente para áreas de churrasco' },
          { key: 'service4_detail1', label: 'Detalhe 1', type: 'text', placeholder: 'Detalhe', defaultValue: 'Design funcional e estético' },
          { key: 'service4_detail2', label: 'Detalhe 2', type: 'text', placeholder: 'Detalhe', defaultValue: 'Alumínio resistente a altas temperaturas' },
          { key: 'service4_detail3', label: 'Detalhe 3', type: 'text', placeholder: 'Detalhe', defaultValue: 'Tiragem de fumaça eficiente' },
          { key: 'service4_detail4', label: 'Detalhe 4', type: 'text', placeholder: 'Detalhe', defaultValue: 'Personalização conforme projeto' },
          { key: 'service4_detail5', label: 'Detalhe 5', type: 'text', placeholder: 'Detalhe', defaultValue: 'Instalação completa' },
        ],
      },
      {
        id: 'service5',
        title: 'Serviço: Coifas para Cozinhas',
        fields: [
          { key: 'service5_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Coifas para Cozinhas' },
          { key: 'service5_description', label: 'Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Exaustão profissional para ambientes' },
          { key: 'service5_detail1', label: 'Detalhe 1', type: 'text', placeholder: 'Detalhe', defaultValue: 'Fabricação personalizada em alumínio' },
          { key: 'service5_detail2', label: 'Detalhe 2', type: 'text', placeholder: 'Detalhe', defaultValue: 'Modelos residenciais e comerciais' },
          { key: 'service5_detail3', label: 'Detalhe 3', type: 'text', placeholder: 'Detalhe', defaultValue: 'Eficiência na exaustão de vapores' },
          { key: 'service5_detail4', label: 'Detalhe 4', type: 'text', placeholder: 'Detalhe', defaultValue: 'Acabamento de alta qualidade' },
          { key: 'service5_detail5', label: 'Detalhe 5', type: 'text', placeholder: 'Detalhe', defaultValue: 'Instalação profissional' },
        ],
      },
      {
        id: 'service6',
        title: 'Serviço: Condutores Pluviais',
        fields: [
          { key: 'service6_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Condutores Pluviais' },
          { key: 'service6_description', label: 'Descrição', type: 'textarea', placeholder: 'Descrição', defaultValue: 'Sistema completo de escoamento de água' },
          { key: 'service6_detail1', label: 'Detalhe 1', type: 'text', placeholder: 'Detalhe', defaultValue: 'Alumínio 0,5mm e 0,7mm' },
          { key: 'service6_detail2', label: 'Detalhe 2', type: 'text', placeholder: 'Detalhe', defaultValue: 'Direcionamento eficiente de água pluvial' },
          { key: 'service6_detail3', label: 'Detalhe 3', type: 'text', placeholder: 'Detalhe', defaultValue: 'Modelos redondos e quadrados' },
          { key: 'service6_detail4', label: 'Detalhe 4', type: 'text', placeholder: 'Detalhe', defaultValue: 'Fixações seguras e discretas' },
          { key: 'service6_detail5', label: 'Detalhe 5', type: 'text', placeholder: 'Detalhe', defaultValue: 'Integração perfeita com calhas' },
        ],
      },
      {
        id: 'cta',
        title: 'Chamada para Ação (CTA)',
        fields: [
          { key: 'cta_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Pronto para Iniciar seu Projeto?' },
          { key: 'cta_subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Subtítulo', defaultValue: 'Entre em contato e receba um orçamento personalizado sem compromisso' },
        ],
      },
    ],
  },
  {
    id: 'contato',
    name: 'Contato',
    icon: '📞',
    sections: [
      {
        id: 'hero',
        title: 'Cabeçalho da Página',
        fields: [
          { key: 'hero_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Entre em Contato' },
          { key: 'hero_subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Subtítulo', defaultValue: 'Estamos prontos para atender você. Solicite um orçamento sem compromisso' },
        ],
      },
      {
        id: 'info',
        title: 'Informações de Contato',
        fields: [
          { key: 'info_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Informações de Contato' },
          { key: 'info_subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Subtítulo', defaultValue: 'Entre em contato conosco através dos canais abaixo ou preencha o formulário. Responderemos o mais breve possível.' },
          { key: 'phone', label: 'Telefone/WhatsApp', type: 'text', placeholder: '(47) 99999-9999', defaultValue: '(47) 98910-0709' },
          { key: 'email', label: 'E-mail', type: 'text', placeholder: 'email@exemplo.com', defaultValue: 'contato@acalhas.com.br' },
          { key: 'address_title', label: 'Título do Endereço', type: 'text', placeholder: 'Localização', defaultValue: 'Localização' },
          { key: 'address', label: 'Endereço', type: 'text', placeholder: 'Cidade - Estado', defaultValue: 'Joinville - SC' },
          { key: 'address_subtitle', label: 'Subtítulo do Endereço', type: 'text', placeholder: 'Região de atendimento', defaultValue: 'Atendemos Joinville e região' },
        ],
      },
      {
        id: 'social',
        title: 'Redes Sociais',
        fields: [
          { key: 'social_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Siga-nos nas Redes Sociais' },
          { key: 'instagram_url', label: 'URL do Instagram', type: 'text', placeholder: 'https://instagram.com/...', defaultValue: 'https://instagram.com/acalhasof' },
          { key: 'facebook_url', label: 'URL do Facebook', type: 'text', placeholder: 'https://facebook.com/...', defaultValue: 'https://facebook.com/acalhasof' },
        ],
      },
      {
        id: 'form',
        title: 'Formulário',
        fields: [
          { key: 'form_title', label: 'Título do Formulário', type: 'text', placeholder: 'Título', defaultValue: 'Solicite seu Orçamento' },
        ],
      },
      {
        id: 'whatsapp_cta',
        title: 'CTA WhatsApp',
        fields: [
          { key: 'whatsapp_cta_title', label: 'Título', type: 'text', placeholder: 'Título', defaultValue: 'Prefere Falar Diretamente?' },
          { key: 'whatsapp_cta_subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Subtítulo', defaultValue: 'Entre em contato via WhatsApp para um atendimento rápido e personalizado' },
        ],
      },
    ],
  },
];

interface ContentData {
  [key: string]: string;
}

export default function ContentManager() {
  const [selectedPage, setSelectedPage] = useState<PageConfig>(pagesConfig[0]);
  const [content, setContent] = useState<ContentData>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedFields, setSavedFields] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['hero']));
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  useEffect(() => {
    loadPageContent();
  }, [selectedPage]);

  const loadPageContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('section_key, content_value')
        .eq('page_name', selectedPage.id)
        .order('order_index', { ascending: true });

      if (error) throw error;

      const contentMap: ContentData = {};
      (data || []).forEach((item) => {
        if (item.section_key) {
          contentMap[item.section_key] = item.content_value || '';
        }
      });

      setContent(contentMap);
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
    setSavedFields((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  const handleSaveField = async (key: string, field: FieldConfig) => {
    setSaving(true);
    try {
      const value = content[key] ?? field.defaultValue;

      // Verificar sessao do usuario
      const { data: sessionData } = await supabase.auth.getSession();
      console.log('[v0] Sessao atual:', sessionData?.session ? 'Autenticado' : 'NAO autenticado');
      console.log('[v0] Salvando:', { page: selectedPage.id, key, value: value?.substring(0, 50) });

      const { data: existing, error: selectError } = await supabase
        .from('page_content')
        .select('id')
        .eq('page_name', selectedPage.id)
        .eq('section_key', key)
        .single();

      console.log('[v0] Registro existente:', existing, 'Erro select:', selectError?.message);

      if (existing) {
        const { error, data: updateData } = await supabase
          .from('page_content')
          .update({
            content_value: value,
          })
          .eq('id', existing.id)
          .select();

        console.log('[v0] Update resultado:', updateData, 'Erro update:', error?.message);
        if (error) throw error;
      } else {
        const { error, data: insertData } = await supabase.from('page_content').insert({
          page_name: selectedPage.id,
          section_key: key,
          content_value: value,
          order_index: 0,
        }).select();

        console.log('[v0] Insert resultado:', insertData, 'Erro insert:', error?.message);
        if (error) throw error;
      }

      setSavedFields((prev) => new Set(prev).add(key));
      setTimeout(() => {
        setSavedFields((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }, 2000);
    } catch (error: any) {
      console.error('[v0] Erro ao salvar:', error?.message, error?.details, error?.hint);
      alert('Erro ao salvar conteúdo: ' + (error?.message || 'Erro desconhecido'));
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAllSection = async (section: SectionConfig) => {
    setSaving(true);
    try {
      for (const field of section.fields) {
        const value = content[field.key] ?? field.defaultValue;

        const { data: existing } = await supabase
          .from('page_content')
          .select('id')
          .eq('page_name', selectedPage.id)
          .eq('section_key', field.key)
          .single();

        if (existing) {
          await supabase
            .from('page_content')
            .update({
              content_value: value,
            })
            .eq('id', existing.id);
        } else {
          await supabase.from('page_content').insert({
            page_name: selectedPage.id,
            section_key: field.key,
            content_value: value,
            order_index: 0,
          });
        }
      }

      const newSaved = new Set(savedFields);
      section.fields.forEach((f) => newSaved.add(f.key));
      setSavedFields(newSaved);

      setTimeout(() => {
        setSavedFields((prev) => {
          const next = new Set(prev);
          section.fields.forEach((f) => next.delete(f.key));
          return next;
        });
      }, 2000);
    } catch (error) {
      console.error('Erro ao salvar seção:', error);
      alert('Erro ao salvar seção');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (key: string, file: File, field: FieldConfig) => {
    setUploadingImage(key);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${selectedPage.id}_${key}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('page-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('page-images').getPublicUrl(fileName);

      handleFieldChange(key, publicUrl);
      await handleSaveField(key, field);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload da imagem');
    } finally {
      setUploadingImage(null);
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon size={16} className="text-purple-500" />;
      case 'textarea':
        return <FileText size={16} className="text-blue-500" />;
      default:
        return <Type size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Gerenciar Conteúdo</h1>
        <p className="text-gray-600">Edite os textos e imagens das páginas do site</p>
      </div>

      {/* Seletor de Página */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Selecione a Página</label>
        <div className="flex flex-wrap gap-2">
          {pagesConfig.map((page) => (
            <button
              key={page.id}
              onClick={() => setSelectedPage(page)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedPage.id === page.id
                  ? 'bg-[#1e3a5f] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{page.icon}</span>
              <span>{page.name}</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={40} className="animate-spin text-[#1e3a5f]" />
        </div>
      ) : (
        <div className="space-y-4">
          {selectedPage.sections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header da Seção */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {expandedSections.has(section.id) ? (
                    <ChevronDown size={20} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-500" />
                  )}
                  <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {section.fields.length} campos
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveAllSection(section);
                  }}
                  disabled={saving}
                  className="flex items-center gap-2 bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  <Save size={16} />
                  Salvar Seção
                </button>
              </button>

              {/* Conteúdo da Seção */}
              {expandedSections.has(section.id) && (
                <div className="border-t border-gray-200 p-4 space-y-4">
                  {section.fields.map((field) => (
                    <div key={field.key} className="relative">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        {getFieldIcon(field.type)}
                        {field.label}
                      </label>

                      {field.type === 'image' ? (
                        <div className="space-y-3">
                          {(content[field.key] || field.defaultValue) && (
                            <img
                              src={content[field.key] || field.defaultValue}
                              alt="Preview"
                              className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                            />
                          )}
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              value={content[field.key] ?? field.defaultValue}
                              onChange={(e) => handleFieldChange(field.key, e.target.value)}
                              placeholder={field.placeholder}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                            />
                            <label className="cursor-pointer bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium transition-colors">
                              {uploadingImage === field.key ? 'Enviando...' : 'Upload'}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageUpload(field.key, file, field);
                                }}
                                disabled={uploadingImage === field.key}
                              />
                            </label>
                          </div>
                        </div>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          value={content[field.key] ?? field.defaultValue}
                          onChange={(e) => handleFieldChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none resize-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={content[field.key] ?? field.defaultValue}
                          onChange={(e) => handleFieldChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                        />
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">Chave: {field.key}</span>
                        <button
                          onClick={() => handleSaveField(field.key, field)}
                          disabled={saving}
                          className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-all ${
                            savedFields.has(field.key)
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {savedFields.has(field.key) ? (
                            <>
                              <Check size={14} />
                              Salvo
                            </>
                          ) : (
                            <>
                              <Save size={14} />
                              Salvar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
