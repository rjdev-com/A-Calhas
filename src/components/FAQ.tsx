import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Qual a diferença entre alumínio 0,5mm e 0,7mm?',
      answer: 'O alumínio 0,5mm é mais econômico e ideal para projetos residenciais, oferecendo excelente durabilidade. Já o alumínio 0,7mm é mais espesso e resistente, recomendado para projetos comerciais e industriais que exigem maior robustez e vida útil prolongada.',
    },
    {
      question: 'Quanto tempo demora a instalação de calhas?',
      answer: 'O tempo de instalação varia conforme o tamanho do projeto. Geralmente, instalações residenciais são concluídas em 1 a 2 dias. Para projetos comerciais maiores, o prazo pode ser de 3 a 5 dias. Fornecemos um cronograma detalhado no orçamento.',
    },
    {
      question: 'Vocês atendem toda a região de Joinville?',
      answer: 'Sim, atendemos Joinville e toda a região. Entre em contato para confirmar a disponibilidade de atendimento na sua localidade específica.',
    },
    {
      question: 'As calhas de alumínio enferrujam?',
      answer: 'Não! O alumínio é naturalmente resistente à corrosão e não enferruja. Esta é uma das principais vantagens do material, garantindo durabilidade e mantendo a aparência ao longo dos anos, mesmo exposto às intempéries.',
    },
    {
      question: 'Vocês fazem projetos personalizados?',
      answer: 'Sim! Todos os nossos produtos são fabricados sob medida conforme as necessidades de cada projeto. Fazemos a análise do local, tiramos as medidas e produzimos as peças personalizadas para perfeito encaixe.',
    },
    {
      question: 'Qual a garantia dos serviços?',
      answer: 'Oferecemos garantia de qualidade em todos os nossos serviços. Os detalhes específicos da garantia são informados no momento do orçamento e variam conforme o tipo de serviço contratado.',
    },
    {
      question: 'Como solicitar um orçamento?',
      answer: 'Você pode solicitar um orçamento através do nosso WhatsApp (47) 98910-0709, pelo formulário de contato no site, ou pelos nossos canais de e-mail e redes sociais. O orçamento é gratuito e sem compromisso.',
    },
    {
      question: 'É necessário fazer manutenção nas calhas de alumínio?',
      answer: 'Recomendamos limpezas periódicas para remover folhas, galhos e detritos que possam acumular e obstruir o fluxo de água. Uma manutenção preventiva simples a cada 6 meses ajuda a prolongar ainda mais a vida útil do sistema.',
    },
    {
      question: 'Vocês trabalham com outros materiais além do alumínio?',
      answer: 'Nossa especialidade é alumínio em espessuras de 0,5mm e 0,7mm. Focamos neste material pela sua excelente relação custo-benefício, durabilidade e resistência à corrosão.',
    },
    {
      question: 'Qual a forma de pagamento?',
      answer: 'Trabalhamos com diversas formas de pagamento para facilitar. Os detalhes e condições são apresentados no momento do orçamento, podendo variar conforme o projeto.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600">
            Tire suas dúvidas sobre nossos serviços e produtos
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-[#1e3a5f] pr-8">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={24}
                  className={`text-[#ff6b35] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#1e3a5f] to-[#2d4d70] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Ainda tem dúvidas?</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Entre em contato conosco e teremos prazer em ajudar
          </p>
          <a
            href="https://wa.me/5547989100709?text=Olá,%20tenho%20algumas%20dúvidas%20sobre%20os%20serviços"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#ff6b35] hover:bg-[#e55a2b] px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Fale Conosco
          </a>
        </div>
      </div>
    </section>
  );
}
