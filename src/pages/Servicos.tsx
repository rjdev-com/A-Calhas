import { Home, Shield, Flame, Wind, Layers, Droplets, ArrowRight, CheckCircle } from 'lucide-react';
import { usePageContent } from '../hooks/usePageContent';

export default function Servicos() {
  const { getContent } = usePageContent('servicos');

  const services = [
    {
      icon: Home,
      title: getContent('service1_title', 'Calhas de Alumínio'),
      description: getContent('service1_description', 'Fabricação e instalação de calhas residenciais e comerciais'),
      details: [
        getContent('service1_detail1', 'Alumínio 0,5mm - opção econômica e durável'),
        getContent('service1_detail2', 'Alumínio 0,7mm - resistência reforçada'),
        getContent('service1_detail3', 'Modelos personalizados conforme necessidade'),
        getContent('service1_detail4', 'Proteção eficiente contra águas pluviais'),
        getContent('service1_detail5', 'Acabamento profissional'),
      ],
      // FORÇAR IMAGEM LOCAL
      image: '/calha.jpg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Shield,
      title: getContent('service2_title', 'Rufos e Pingadeiras'),
      description: getContent('service2_description', 'Proteção completa para telhados e estruturas'),
      details: [
        getContent('service2_detail1', 'Vedação perfeita em encontros de telhado'),
        getContent('service2_detail2', 'Proteção contra infiltrações'),
        getContent('service2_detail3', 'Acabamento em alumínio durável'),
        getContent('service2_detail4', 'Resistente à corrosão'),
        getContent('service2_detail5', 'Instalação precisa e profissional'),
      ],
      image: '/rufos.jpg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Layers,
      title: getContent('service3_title', 'Colarinhos de Chaminé'),
      description: getContent('service3_description', 'Vedação profissional para chaminés'),
      details: [
        getContent('service3_detail1', 'Vedação completa contra água e vento'),
        getContent('service3_detail2', 'Fabricação em alumínio de alta qualidade'),
        getContent('service3_detail3', 'Modelos adaptáveis a diferentes tipos de chaminé'),
        getContent('service3_detail4', 'Instalação técnica e segura'),
        getContent('service3_detail5', 'Durabilidade garantida'),
      ],
      image: '/colarinho.jpg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Flame,
      title: getContent('service4_title', 'Chaminés para Churrasqueiras'),
      description: getContent('service4_description', 'Exaustão eficiente para áreas de churrasco'),
      details: [
        getContent('service4_detail1', 'Design funcional e estético'),
        getContent('service4_detail2', 'Alumínio resistente a altas temperaturas'),
        getContent('service4_detail3', 'Tiragem de fumaça eficiente'),
        getContent('service4_detail4', 'Personalização conforme projeto'),
        getContent('service4_detail5', 'Instalação completa'),
      ],
      image: '/chamine.png?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Wind,
      title: getContent('service5_title', 'Coifas para Cozinhas'),
      description: getContent('service5_description', 'Exaustão profissional para ambientes'),
      details: [
        getContent('service5_detail1', 'Fabricação personalizada em alumínio'),
        getContent('service5_detail2', 'Modelos residenciais e comerciais'),
        getContent('service5_detail3', 'Eficiência na exaustão de vapores'),
        getContent('service5_detail4', 'Acabamento de alta qualidade'),
        getContent('service5_detail5', 'Instalação profissional'),
      ],
      image: '/coifa.jpg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Droplets,
      title: getContent('service6_title', 'Condutores Pluviais'),
      description: getContent('service6_description', 'Sistema completo de escoamento de água'),
      details: [
        getContent('service6_detail1', 'Alumínio 0,5mm e 0,7mm'),
        getContent('service6_detail2', 'Direcionamento eficiente de água pluvial'),
        getContent('service6_detail3', 'Modelos redondos e quadrados'),
        getContent('service6_detail4', 'Fixações seguras e discretas'),
        getContent('service6_detail5', 'Integração perfeita com calhas'),
      ],
      image: '/condutor.jpg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4d70] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getContent('hero_title', 'Nossos Serviços')}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {getContent('hero_subtitle', 'Soluções completas em alumínio de alta qualidade para projetos residenciais, comerciais e industriais em Joinville e região')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f8f9fa] rounded-2xl p-8 mb-16 border-l-4 border-[#ff6b35]">
            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
              {getContent('aluminio_title', 'Alumínio de Primeira Qualidade')}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {getContent('aluminio_intro', 'Todos os nossos produtos são fabricados com alumínio de alta qualidade, disponível em duas espessuras para atender diferentes necessidades e orçamentos:')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                  {getContent('aluminio_05_title', 'Alumínio 0,5mm')}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{getContent('aluminio_05_benefit1', 'Opção econômica com excelente custo-benefício')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{getContent('aluminio_05_benefit2', 'Ideal para projetos residenciais')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{getContent('aluminio_05_benefit3', 'Durabilidade comprovada')}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                  {getContent('aluminio_07_title', 'Alumínio 0,7mm')}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{getContent('aluminio_07_benefit1', 'Resistência reforçada para maior durabilidade')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{getContent('aluminio_07_benefit2', 'Recomendado para projetos comerciais')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{getContent('aluminio_07_benefit3', 'Máxima proteção e vida útil prolongada')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 items-center bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow`}
              >
                <div className="w-full lg:w-1/2">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                </div>

                <div className="w-full lg:w-1/2 p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-[#ff6b35] text-white rounded-lg flex items-center justify-center">
                      <service.icon size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle size={20} className="text-[#ff6b35] mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://wa.me/5547989100709?text=Olá,%20gostaria%20de%20um%20orçamento%20para%20o%20serviço%20de%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Solicitar Orçamento
                    <ArrowRight className="ml-2" size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#1e3a5f] to-[#2d4d70] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {getContent('cta_title', 'Pronto para Iniciar seu Projeto?')}
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {getContent('cta_subtitle', 'Entre em contato e receba um orçamento personalizado sem compromisso')}
          </p>
          <a
            href="https://wa.me/5547989100709?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#ff6b35] hover:bg-[#e55a2b] px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Fale Conosco no WhatsApp
            <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
