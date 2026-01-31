import { Award, CheckCircle, Clock, Users, Wrench, MapPin } from 'lucide-react';
import { usePageContent } from '../hooks/usePageContent';

export default function Sobre() {
  const { getContent } = usePageContent('sobre');
  const { get: getGeral } = usePageContent('inicio');
  
  // WhatsApp configuravel
  const whatsappNumero = getGeral('whatsapp_numero', '5547989100709');
  const whatsappMensagem = getGeral('whatsapp_mensagem', 'Ola, gostaria de conhecer melhor os servicos da A Calhas');
  const whatsappLink = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(whatsappMensagem)}`;

  const values = [
    {
      icon: Award,
      title: getContent('value1_title', 'Qualidade'),
      description: getContent('value1_description', 'Utilizamos apenas alumínio de primeira linha em todas as nossas fabricações'),
    },
    {
      icon: Clock,
      title: getContent('value2_title', 'Pontualidade'),
      description: getContent('value2_description', 'Cumprimos os prazos estabelecidos com responsabilidade e profissionalismo'),
    },
    {
      icon: Users,
      title: getContent('value3_title', 'Atendimento'),
      description: getContent('value3_description', 'Atendimento personalizado do orçamento à finalização do projeto'),
    },
    {
      icon: Wrench,
      title: getContent('value4_title', 'Expertise'),
      description: getContent('value4_description', 'Equipe experiente e qualificada em fabricação e instalação'),
    },
  ];

  const benefits = [
    getContent('benefit1', 'Fabricação própria com controle total de qualidade'),
    getContent('benefit2', 'Alumínio em duas espessuras: 0,5mm e 0,7mm'),
    getContent('benefit3', 'Projetos personalizados conforme suas necessidades'),
    getContent('benefit4', 'Instalação profissional e segura'),
    getContent('benefit5', 'Atendimento em Joinville e região'),
    getContent('benefit6', 'Orçamento sem compromisso'),
    getContent('benefit7', 'Garantia dos serviços prestados'),
    getContent('benefit8', 'Acompanhamento durante todo o projeto'),
  ];

  const highlights = [
    {
      icon: Wrench,
      title: getContent('highlight1_title', 'Fabricação Própria'),
      description: getContent('highlight1_description', 'Controle total sobre qualidade e prazos de entrega'),
    },
    {
      icon: Award,
      title: getContent('highlight2_title', 'Alumínio Premium'),
      description: getContent('highlight2_description', 'Material de primeira qualidade em 0,5mm e 0,7mm'),
    },
    {
      icon: MapPin,
      title: getContent('highlight3_title', 'Atendimento Local'),
      description: getContent('highlight3_description', 'Presente em Joinville e toda a região'),
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4d70] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getContent('hero_title', 'Sobre a A Calhas')}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {getContent('hero_subtitle', 'Especialistas em fabricação e instalação de calhas, rufos e produtos em alumínio em Joinville - SC')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
                {getContent('main_title', 'Compromisso com a Excelência')}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>{getContent('main_text1', 'A A Calhas é uma empresa especializada em fabricação e instalação de calhas, rufos, pingadeiras e produtos em alumínio, atuando em Joinville e região com foco na qualidade e satisfação dos clientes.')}</p>
                <p>{getContent('main_text2', 'Nossa experiência no mercado nos permite oferecer soluções personalizadas para projetos residenciais, comerciais e industriais, sempre utilizando materiais de primeira qualidade e técnicas de instalação profissionais.')}</p>
                <p>{getContent('main_text3', 'Trabalhamos com alumínio em duas espessuras (0,5mm e 0,7mm) para atender diferentes necessidades e orçamentos, garantindo sempre a melhor relação custo-benefício para nossos clientes.')}</p>
              </div>
            </div>
            <div className="relative">
              <img
                src={getContent('main_image', 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800')}
                alt="Profissional trabalhando"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#ff6b35] text-white p-6 rounded-xl shadow-xl">
                <p className="text-3xl font-bold">{getContent('main_stat_number', '100%')}</p>
                <p className="text-sm">{getContent('main_stat_text', 'Compromisso com Qualidade')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
              {getContent('values_title', 'Nossos Valores')}
            </h2>
            <p className="text-xl text-gray-600">
              {getContent('values_subtitle', 'Princípios que guiam nosso trabalho diariamente')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff6b35] text-white rounded-full mb-4">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={getContent('benefits_image', 'https://images.pexels.com/photos/259984/pexels-photo-259984.jpeg?auto=compress&cs=tinysrgb&w=800')}
                alt="Alumínio de qualidade"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
                {getContent('benefits_title', 'Por Que Escolher a A Calhas?')}
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={24} className="text-[#ff6b35] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1e3a5f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-[#2d4d70] rounded-xl p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff6b35] rounded-full mb-4">
                  <highlight.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-gray-300 leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
            {getContent('cta_title', 'Vamos Trabalhar Juntos?')}
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {getContent('cta_subtitle', 'Entre em contato e descubra como podemos transformar seu projeto em realidade')}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Fale Conosco no WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
