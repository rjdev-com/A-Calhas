import { useState, useEffect } from 'react';
import { Plus, Search, Edit, FileText, Download } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Quote {
  id: string;
  quote_number: string;
  customer_id: string;
  status: string;
  total_amount: number;
  final_amount: number;
  created_at: string;
  customers: {
    full_name?: string;
    company_name?: string;
    trade_name?: string;
  };
}

export default function QuotesManager() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select(`
          *,
          customers (full_name, company_name, trade_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error('Erro ao carregar orçamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCustomerName = (quote: Quote) => {
    return quote.customers?.full_name ||
           quote.customers?.trade_name ||
           quote.customers?.company_name ||
           'Cliente não encontrado';
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      'rascunho': 'bg-gray-100 text-gray-800',
      'enviado': 'bg-blue-100 text-blue-800',
      'aprovado': 'bg-green-100 text-green-800',
      'rejeitado': 'bg-red-100 text-red-800',
      'cancelado': 'bg-red-100 text-red-800',
    };

    const labels: Record<string, string> = {
      'rascunho': 'Rascunho',
      'enviado': 'Enviado',
      'aprovado': 'Aprovado',
      'rejeitado': 'Rejeitado',
      'cancelado': 'Cancelado',
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${badges[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const filteredQuotes = quotes.filter(quote => {
    const searchLower = searchTerm.toLowerCase();
    return (
      quote.quote_number.toLowerCase().includes(searchLower) ||
      getCustomerName(quote).toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orçamentos</h1>
        <button
          onClick={() => window.location.href = '/admin?page=new-quote'}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Novo Orçamento
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por número ou cliente..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredQuotes.map((quote) => (
          <div key={quote.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{quote.quote_number}</h3>
                    {getStatusBadge(quote.status)}
                  </div>
                  <p className="text-gray-600 mb-2"><strong>Cliente:</strong> {getCustomerName(quote)}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <p className="text-gray-600">
                      <strong>Valor Total:</strong> R$ {quote.total_amount?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-gray-600">
                      <strong>Valor Final:</strong> R$ {quote.final_amount?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-gray-600">
                      <strong>Data:</strong> {new Date(quote.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.location.href = `/admin?page=edit-quote&id=${quote.id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => alert('Exportar PDF será implementado')}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Exportar PDF"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredQuotes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">Nenhum orçamento encontrado.</p>
            <p className="text-gray-400 text-sm mt-2">Clique em "Novo Orçamento" para começar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
