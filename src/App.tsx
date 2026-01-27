import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import Inicio from './pages/Inicio';
import Servicos from './pages/Servicos';
import Portfolio from './pages/Portfolio';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import FAQ from './components/FAQ';
import AdminMain from './pages/admin/AdminMain';

type Page = 'inicio' | 'servicos' | 'portfolio' | 'sobre' | 'contato' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    return window.location.pathname === '/admin' ? 'admin' : 'inicio';
  });

  useEffect(() => {
    if (currentPage !== 'admin') {
      updateMetaTags(currentPage);
      window.scrollTo(0, 0);
    }

    if (currentPage === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
  }, [currentPage]);

  const updateMetaTags = (page: Exclude<Page, 'admin'>) => {
    const metaData = {
      inicio: {
        title: 'A Calhas - Calhas de Alumínio em Joinville | Fabricação e Instalação',
        description: 'Fabricação e instalação de calhas, rufos e produtos em alumínio 0,5mm e 0,7mm em Joinville - SC. Qualidade profissional e orçamento gratuito.',
        keywords: 'calhas alumínio joinville, rufos joinville, calhas 0,5mm, calhas 0,7mm, instalação calhas joinville, empresa calhas joinville',
      },
      servicos: {
        title: 'Serviços - Calhas, Rufos e Produtos em Alumínio | A Calhas Joinville',
        description: 'Conheça nossos serviços: calhas de alumínio, rufos, pingadeiras, colarinhos, chaminés e coifas. Fabricação em 0,5mm e 0,7mm em Joinville - SC.',
        keywords: 'serviços calhas joinville, rufos alumínio, pingadeiras joinville, chaminés churrasqueira, coifas alumínio, condutores pluviais',
      },
      portfolio: {
        title: 'Portfólio - Projetos Realizados | A Calhas Joinville',
        description: 'Veja nossos projetos de calhas, rufos e produtos em alumínio realizados em Joinville e região. Trabalhos residenciais e comerciais.',
        keywords: 'portfolio calhas joinville, projetos calhas alumínio, trabalhos realizados joinville, fotos calhas instaladas',
      },
      sobre: {
        title: 'Sobre - Empresa de Calhas de Alumínio | A Calhas Joinville',
        description: 'Conheça a A Calhas, empresa especializada em fabricação de calhas e produtos em alumínio em Joinville - SC. Qualidade e experiência comprovadas.',
        keywords: 'empresa calhas joinville, fabricante calhas alumínio, sobre a calhas, calhas joinville sc',
      },
      contato: {
        title: 'Contato - Solicite seu Orçamento | A Calhas Joinville',
        description: 'Entre em contato com a A Calhas. WhatsApp (47) 98910-0709. Orçamento gratuito para calhas, rufos e produtos em alumínio em Joinville - SC.',
        keywords: 'contato calhas joinville, orçamento calhas, whatsapp calhas joinville, telefone calhas alumínio',
      },
    };

    const data = metaData[page];
    document.title = data.title;

    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', data.description);
    updateMeta('keywords', data.keywords);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', data.title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', data.description);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return (
          <>
            <Inicio onNavigate={setCurrentPage} />
            <FAQ />
          </>
        );
      case 'servicos':
        return <Servicos />;
      case 'portfolio':
        return <Portfolio />;
      case 'sobre':
        return <Sobre />;
      case 'contato':
        return <Contato />;
      case 'admin':
        return <AdminMain />;
      default:
        return <Inicio onNavigate={setCurrentPage} />;
    }
  };

  if (currentPage === 'admin') {
    return (
      <AuthProvider>
        <AdminMain />
      </AuthProvider>
    );
  }

  return (
    <>
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>
      <WhatsAppButton />
      <ScrollToTopButton />
    </>
  );
}

export default App;
