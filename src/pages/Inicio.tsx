import { ArrowRight, Shield, Clock, Award, Wrench, Home, Building2, ChevronRight } from 'lucide-react';
import { usePageContent } from '../hooks/usePageContent';

interface InicioProps {
  onNavigate: (page: string) => void;
}

export default function Inicio({ onNavigate }: InicioProps) {
  const { get } = usePageContent('inicio');

  const services = [
    {
      icon: Home,
      title: get('service1_title', 'Calhas de Alumínio'),
      description: get('service1_description', 'Fabricação e instalação de calhas residenciais e comerciais em alumínio 0,5mm e 0,7mm'),
      category: 'calhas'
    },
    {
      icon: Shield,
      title: get('service2_title', 'Rufos e Pingadeiras'),
      description: get('service2_description', 'Proteção completa para telhados e estruturas com acabamento profissional'),
      category: 'rufos'
    },
    {
      icon: Building2,
      title: get('service3_title', 'Colarinhos de Chaminé'),
      description: get('service3_description', 'Vedação perfeita para chaminés com materiais de alta durabilidade'),
      category: 'colarinhos'
    },
    {
      icon: Wrench,
      title: get('service4_title', 'Chaminés e Coifas'),
      description: get('service4_description', 'Chaminés para churrasqueiras e coifas para cozinhas em alumínio'),
      category: 'chamines'
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: get('benefit1_title', 'Qualidade Garantida'),
      description: get('benefit1_description', 'Alumínio de primeira qualidade com espessuras de 0,5mm e 0,7mm')
    },
    {
      icon: Clock,
      title: get('benefit2_title', 'Entrega Rápida'),
      description: get('benefit2_description', 'Fabricação própria para agilidade no atendimento')
    },
    {
      icon: Shield,
      title: get('benefit3_title', 'Durabilidade'),
      description: get('benefit3_description', 'Produtos resistentes à corrosão e intempéries')
    },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d4d70] to-[#1e3a5f] text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {get('hero_title', 'Calhas de Alumínio de Alta Qualidade em')} <span className="text-[#ff6b35]">Joinville</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              {get('hero_subtitle', 'Fabricação e instalação profissional de calhas, rufos e produtos em alumínio 0,5mm e 0,7mm')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5547989100709?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                {get('hero_button1', 'Solicitar Orçamento Grátis')}
                <ArrowRight className="ml-2" size={20} />
              </a>
              <button
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-[#1e3a5f] px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                {get('hero_button2', 'Quer Trabalhos Como Esses?')}
                <ChevronRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff6b35] text-white rounded-full mb-4">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">{get('services_title', 'Nossos Serviços')}</h2>
            <p className="text-xl text-gray-600">{get('services_subtitle', 'Soluções completas em alumínio para sua obra')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border-t-4 border-[#ff6b35] hover:transform hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-[#1e3a5f] text-white rounded-lg flex items-center justify-center">
                      <service.icon size={28} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                    <button
                      onClick={() => onNavigate('servicos')}
                      className="text-[#ff6b35] font-semibold hover:text-[#e55a2b] inline-flex items-center transition-colors"
                    >
                      Saiba mais
                      <ChevronRight size={18} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('servicos')}
              className="inline-flex items-center bg-[#1e3a5f] hover:bg-[#2d4d70] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {get('services_button', 'Ver Todos os Serviços')}
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1e3a5f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#2d4d70] rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {get('aluminum_title', 'Alumínio de Alta Qualidade')}
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                {get('aluminum_subtitle', 'Trabalhamos com alumínio em duas espessuras para atender suas necessidades:')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1e3a5f] rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-[#ff6b35] mb-2">{get('aluminum_05_title', '0,5mm')}</h3>
                  <p className="text-gray-300">{get('aluminum_05_description', 'Opção econômica com excelente durabilidade para projetos residenciais')}</p>
                </div>
                <div className="bg-[#1e3a5f] rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-[#ff6b35] mb-2">{get('aluminum_07_title', '0,7mm')}</h3>
                  <p className="text-gray-300">{get('aluminum_07_description', 'Reforçada para maior resistência em projetos comerciais e industriais')}</p>
                </div>
              </div>
              <a
                href="https://wa.me/5547989100709?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20as%20espessuras%20de%20alumínio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#ff6b35] hover:bg-[#e55a2b] px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
              >
                {get('aluminum_button', 'Consulte a Melhor Opção para Você')}
                <ArrowRight className="ml-2" size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
            {get('cta_title', 'Pronto para Começar seu Projeto?')}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {get('cta_subtitle', 'Entre em contato agora e receba um orçamento personalizado sem compromisso')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5547989100709?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              {get('cta_whatsapp', 'WhatsApp: (47) 98910-0709')}
              <ArrowRight className="ml-2" size={20} />
            </a>
            <button
              onClick={() => onNavigate('contato')}
              className="inline-flex items-center justify-center bg-[#1e3a5f] hover:bg-[#2d4d70] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              {get('cta_contact', 'Formulário de Contato')}
              <ChevronRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
