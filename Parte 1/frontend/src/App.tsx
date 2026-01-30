import { useState } from 'react';
import SelectorUbicacion from './components/SelectorUbicacion';
import FormularioEncuesta from './components/FormularioEncuesta';
import BotonExportar from './components/BotonExportar';

function App() {
  const [step, setStep] = useState(1);
  const [sedeId, setSedeId] = useState<number | null>(null);

  const handleRestart = () => {
    setStep(1);
    setSedeId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 transition-all duration-300">
        
        {step === 1 && (
          <SelectorUbicacion onContinue={(id) => { 
            setSedeId(id); 
            setStep(2); 
          }} />
        )}

        {step === 2 && sedeId && (
          <FormularioEncuesta 
            sedeId={sedeId} 
            onFinish={() => setStep(3)} 
          />
        )}

        {step === 3 && (
          <div className="text-center py-10 animate-scale-in">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Gracias!</h2>
            <p className="text-gray-600 mb-8">Tus respuestas han sido registradas exitosamente.</p>
            <button 
              onClick={handleRestart} 
              className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition shadow-lg"
            >
              Realizar nueva encuesta
            </button>
          </div>
        )}
      </div>
      <BotonExportar />
    </div>
  );
}

export default App;