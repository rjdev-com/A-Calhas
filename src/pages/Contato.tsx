import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Instagram, Facebook } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { usePageContent } from '../hooks/usePageContent';

export default function Contato() {
  const { getContent } = usePageContent('contato');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    material_preference: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const serviceTypes = [
    'Calhas de Alumínio',
    'Rufos e Pingadeiras',
    'Colarinhos de Chaminé',
    'Chaminés para Churrasqueiras',
    'Coifas',
    'Condutores Pluviais',
    'Outro',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Salvar no Supabase
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (submitError) throw submitError;

      // Enviar email via API
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!emailResponse.ok) {
        console.error('Erro ao enviar email, mas dados foram salvos');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_type: '',
        material_preference: '',
        message: '',
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Erro ao enviar mensagem. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const phone = getContent('phone', '(47) 98910-0709');
  const email = getContent('email', 'contato@acalhas.com.br');
  const instagramUrl = getContent('instagram_url', 'https://instagram.com/acalhasof');
  const facebookUrl = getContent('facebook_url', 'https://facebook.com/acalhasof');

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4d70] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getContent('hero_title', 'Entre em Contato')}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {getContent('hero_subtitle', 'Estamos prontos para atender você. Solicite um orçamento sem compromisso')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#1e3a5f] mb-6">
                {getContent('info_title', 'Informações de Contato')}
              </h2>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                {getContent('info_subtitle', 'Entre em contato conosco através dos canais abaixo ou preencha o formulário. Responderemos o mais breve possível.')}
              </p>

              <div className="space-y-6">
                <a
                  href={`https://wa.me/55${phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#ff6b35] text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e3a5f] mb-1">WhatsApp</h3>
                    <p className="text-gray-600">{phone}</p>
                    <p className="text-sm text-[#ff6b35] mt-1">Clique para falar conosco</p>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#ff6b35] text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e3a5f] mb-1">E-mail</h3>
                    <p className="text-gray-600">{email}</p>
                  </div>
                </a>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#ff6b35] text-white rounded-lg flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e3a5f] mb-1">
                      {getContent('address_title', 'Localização')}
                    </h3>
                    <p className="text-gray-600">{getContent('address', 'Joinville - SC')}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {getContent('address_subtitle', 'Atendemos Joinville e região')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-[#1e3a5f] mb-4 text-lg">
                  {getContent('social_title', 'Siga-nos nas Redes Sociais')}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    <Instagram size={20} />
                    <span className="font-semibold">Instagram</span>
                  </a>
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <Facebook size={20} />
                    <span className="font-semibold">Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">
                  {getContent('form_title', 'Solicite seu Orçamento')}
                </h2>

                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-green-700">
                      Mensagem enviada com sucesso! Entraremos em contato em breve.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(47) 00000-0000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="service_type" className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de Serviço
                    </label>
                    <select
                      id="service_type"
                      name="service_type"
                      value={formData.service_type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Selecione um serviço</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="material_preference" className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferência de Espessura
                    </label>
                    <select
                      id="material_preference"
                      name="material_preference"
                      value={formData.material_preference}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="0,5mm">0,5mm - Econômica</option>
                      <option value="0,7mm">0,7mm - Reforçada</option>
                      <option value="Não sei">Não sei / Preciso de orientação</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Descreva seu projeto ou dúvida..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    {loading ? (
                      <span>Enviando...</span>
                    ) : (
                      <>
                        <span>Enviar Mensagem</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1e3a5f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {getContent('whatsapp_cta_title', 'Prefere Falar Diretamente?')}
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {getContent('whatsapp_cta_subtitle', 'Entre em contato via WhatsApp para um atendimento rápido e personalizado')}
          </p>
          <a
            href={`https://wa.me/55${phone.replace(/\D/g, '')}?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            <Phone className="mr-2" size={20} />
            WhatsApp: {phone}
          </a>
        </div>
      </section>
    </div>
  );
}
