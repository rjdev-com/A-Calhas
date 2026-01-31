import { MessageCircle } from 'lucide-react';
import { usePageContent } from '../hooks/usePageContent';

export default function WhatsAppButton() {
  const { get } = usePageContent('inicio');
  
  const whatsappNumero = get('whatsapp_numero', '5547989100709');
  const whatsappMensagem = get('whatsapp_mensagem', 'Ola, gostaria de solicitar um orcamento');
  const whatsappLink = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(whatsappMensagem)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-50 flex items-center justify-center group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Fale conosco no WhatsApp
      </span>
    </a>
  );
}
