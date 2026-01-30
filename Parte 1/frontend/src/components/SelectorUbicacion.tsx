import { useState, useEffect } from 'react';
import api from '../api';

interface Props {
  onContinue: (sedeId: number) => void;
}

export default function SelectorUbicacion({ onContinue }: Props) {
  const [paises, setPaises] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [sedes, setSedes] = useState([]);
  
  // Estados para la selección
  const [selectedPais, setSelectedPais] = useState('');
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [selectedSede, setSelectedSede] = useState<string>('');
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/catalogos/paises').then(res => setPaises(res.data));
  }, []);

  const handlePaisChange = async (id: string) => {
    setSelectedPais(id);
    setSelectedEmpresa('');
    setSelectedSede('');
    setEmpresas([]);
    setSedes([]);
    
    if (id) {
      setLoading(true);
      const res = await api.get(`/catalogos/empresas/${id}`);
      setEmpresas(res.data);
      setLoading(false);
    }
  };

  const handleEmpresaChange = async (id: string) => {
    setSelectedEmpresa(id);
    setSelectedSede('');
    setSedes([]);

    if (id) {
      setLoading(true);
      const res = await api.get(`/catalogos/sedes/${id}`);
      setSedes(res.data);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
        <p className="text-gray-500 text-sm">Selecciona tu ubicación para comenzar</p>
      </div>

      <div className="space-y-4">

        <div className="relative">
          <select 
            value={selectedPais}
            onChange={(e) => handlePaisChange(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
          >
            <option value="">Selecciona un País</option>
            {paises.map((p: any) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        <div className="relative">
          <select 
            value={selectedEmpresa}
            onChange={(e) => handleEmpresaChange(e.target.value)}
            disabled={!selectedPais}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-100 outline-none transition-all appearance-none"
          >
            <option value="">Selecciona una Empresa</option>
            {empresas.map((e: any) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
          </select>
           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        <div className="relative">
          <select 
            value={selectedSede}
            onChange={(e) => setSelectedSede(e.target.value)}
            disabled={!selectedEmpresa}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-100 outline-none transition-all appearance-none"
          >
            <option value="">Selecciona una Sede</option>
            {sedes.map((s: any) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
          </select>
           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      {loading && <div className="text-center text-blue-500 text-sm py-2">Cargando opciones...</div>}

      <button 
        onClick={() => selectedSede && onContinue(Number(selectedSede))}
        disabled={!selectedSede}
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        Continuar a la Encuesta
      </button>
    </div>
  );
}