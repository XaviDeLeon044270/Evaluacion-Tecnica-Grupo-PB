import { useState, useEffect } from 'react';
import api from '../api';

export default function FormularioEncuesta({ sedeId, onFinish }: { sedeId: number, onFinish: () => void }) {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState<any[]>([]);

  useEffect(() => {
    api.get('/encuesta/preguntas').then(res => setPreguntas(res.data));
  }, []);

  const enviarEncuesta = async () => {
    if (respuestas.length < preguntas.length) {
      alert("Por favor responda todas las preguntas antes de enviar.");
      return;
    }
    try {
      await api.post('/encuesta/responder', { id_sede: sedeId, respuestas });
      onFinish();
    } catch (e) {
      alert("Error enviando encuesta");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Encuesta de Satisfacción</h2>
        <p className="text-gray-500 text-sm">Tu opinión es muy importante para nosotros</p>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {preguntas.map((p: any, index) => (
          <div key={p.id} className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                {index + 1}
              </span>
              <p className="font-semibold text-gray-700">{p.texto_pregunta}</p>
            </div>
            
            <div className="pl-9 space-y-2">
              {p.opciones.map((o: any) => {
                const isSelected = respuestas.find(r => r.id_pregunta === p.id)?.id_opcion === o.id;
                return (
                  <label key={o.id} className={`flex items-center p-3 rounded-lg cursor-pointer border transition-all ${isSelected ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                    <input 
                      type="radio" 
                      name={`p-${p.id}`}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      onChange={() => {
                        const filtradas = respuestas.filter(r => r.id_pregunta !== p.id);
                        setRespuestas([...filtradas, { id_pregunta: p.id, id_opcion: o.id }]);
                      }}
                    />
                    <span className={`ml-3 text-sm ${isSelected ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>{o.texto_opcion}</span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={enviarEncuesta}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3.5 rounded-xl shadow-lg transform transition hover:-translate-y-0.5"
      >
        Finalizar Encuesta
      </button>
    </div>
  );
}