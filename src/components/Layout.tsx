import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { usePageContent } from '../hooks/usePageContent';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { get } = usePageContent('inicio');
  const location = useLocation();

  const whatsappNumero = get('whatsapp_numero', '5547989100709');
  const whatsappMensagem = get('whatsapp_mensagem', 'Olá, gostaria de solicitar um orçamento');
  const whatsappLink = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(whatsappMensagem)}`;

  const navigation = [
    { name: 'Início', path: '/' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Portfólio', path: '/portfolio' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Contato', path: '/contato' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1e3a5f] text-white sticky top-0 z-40 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegação principal">
          <div className="flex justify-between items-center h-20">
            <Link to="/" aria-label="Ir para página inicial">
              <img
                src="/A Calhas copy.png"
                alt="A Calhas - A solução está no nome"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-[#ff6b35] ${
                    isActive(item.path) ? 'text-[#ff6b35] border-b-2 border-[#ff6b35] pb-1' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ff6b35] hover:bg-[#e55a2b] px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Orçamento Grátis
              </a>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-2 rounded hover:bg-[#2d4d70] transition-colors ${
                    isActive(item.path) ? 'bg-[#2d4d70] text-[#ff6b35]' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#ff6b35] hover:bg-[#e55a2b] px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Orçamento Grátis
              </a>
            </div>
          )}
        </nav>
      </header>

      <main>{children}</main>

      <footer className="bg-[#1e3a5f] text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#ff6b35]">A Calhas</h3>
              <p className="text-gray-300 leading-relaxed">
                Especialistas em fabricação e instalação de calhas, rufos e produtos em alumínio de alta qualidade em Joinville e região.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-[#ff6b35]">Contato</h3>
              <div className="flex flex-col gap-3">
                <a href={`tel:+${whatsappNumero}`} className="flex items-center gap-2 text-gray-300 hover:text-[#ff6b35] transition-colors">
                  <Phone size={18} />
                  <span>(47) 98910-0709</span>
                </a>
                <a href="mailto:contato@acalhas.com.br" className="flex items-center gap-2 text-gray-300 hover:text-[#ff6b35] transition-colors">
                  <Mail size={18} />
                  <span>contato@acalhas.com.br</span>
                </a>
                <p className="text-gray-300">Joinville - SC</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-[#ff6b35]">Redes Sociais</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/acalhasof"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2d4d70] p-3 rounded-full hover:bg-[#ff6b35] transition-colors"
                  aria-label="Instagram da A Calhas (abre em nova aba)"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://facebook.com/acalhasof"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2d4d70] p-3 rounded-full hover:bg-[#ff6b35] transition-colors"
                  aria-label="Facebook da A Calhas (abre em nova aba)"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} A Calhas. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
