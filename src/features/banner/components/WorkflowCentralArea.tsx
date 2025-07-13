import React from 'react';

export const WorkflowCentralArea: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-4 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Área de Trabajo</h1>
          <p className="text-sm text-gray-600">Paso 1: Seleccionar N° Columnas</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Subir Archivo
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Guardar
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Mejorar con IA
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl h-96 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium mb-2">Vista Previa del Banner</div>
            <div className="text-sm">Configura tu banner para ver la vista previa</div>
            <div className="mt-4 text-xs bg-gray-100 px-3 py-1 rounded">800 × 400px</div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Columnas:</span> 1
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Fondo:</span> Blanco
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Elementos:</span> 0
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">
              Deshacer
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">
              Rehacer
            </button>
            <span className="text-sm text-gray-500 ml-2">Sin guardar</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Zoom:</span>
            <button className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm">-</button>
            <span className="text-sm text-gray-600">100%</span>
            <button className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm">+</button>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">
              Compartir
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
              Exportar PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 