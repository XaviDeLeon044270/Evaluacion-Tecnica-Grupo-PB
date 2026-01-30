import { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import api from '../api';

export default function BotonExportar() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Para abrir/cerrar el menú

  // Función para obtener los datos una sola vez
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/encuesta/exportar');
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Error al obtener datos");
      return null;
    }
  };

  const exportExcel = async () => {
    const data = await fetchData();
    if (!data) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resultados");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `Reporte_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportJSON = async () => {
    const data = await fetchData();
    if (!data) return;

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    saveAs(blob, `Reporte_${new Date().toISOString().split('T')[0]}.json`);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      {/* Botones de acción (se muestran si isOpen es true) */}
      {isOpen && (
        <div className="flex flex-col gap-2 animate-fade-in-up">
          <button
            onClick={exportJSON}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium transition-all"
          >
            <span>{loading ? '...' : '{ }'}</span> JSON
          </button>

          <button
            onClick={exportExcel}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium transition-all"
          >
            <span>{loading ? '...' : '📊'}</span> Excel
          </button>
        </div>
      )}

      {/* Botón Principal (Toggle) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white transition-all transform hover:scale-105 ${isOpen ? 'bg-red-500 rotate-45' : 'bg-blue-600'}`}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}