import React from 'react';
import { Grid, Layout, Columns, CheckCircle } from 'lucide-react';

interface ColumnSelectorProps {
  selectedColumns: number;
  onSelectColumns: (columns: number) => void;
  isCompleted?: boolean;
}

const columnOptions = [
  { value: 1, label: '1 Columna', icon: Layout },
  { value: 2, label: '2 Columnas', icon: Columns },
  { value: 3, label: '3 Columnas', icon: Grid },
];

const ColumnPreview: React.FC<{ columns: number; isActive: boolean }> = ({ columns, isActive }) => {
  const getPreviewLayout = () => {
    const width = `${100 / columns}%`;
    const items = Array.from({ length: columns }, (_, i) => i);
    
    return (
      <div className="w-full h-16 border-2 border-corporate-light rounded-lg flex overflow-hidden">
        {items.map((item, index) => (
          <div
            key={item}
            className={`h-full ${isActive ? 'bg-corporate-primary' : 'bg-corporate-light'} ${
              index < items.length - 1 ? 'border-r border-corporate-light' : ''
            }`}
            style={{ width }}
          />
        ))}
      </div>
    );
  };

  return getPreviewLayout();
};

export const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  selectedColumns,
  onSelectColumns,
  isCompleted = false,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-corporate-secondary flex items-center gap-2">
          <Layout className="w-4 h-4" />
          SELECCIONAR N° COLUMNAS
        </h3>
        {isCompleted && (
          <CheckCircle className="w-4 h-4 text-green-500" />
        )}
      </div>
      
      <div className="space-y-3">
        {columnOptions.map((option) => {
          const isSelected = selectedColumns === option.value;
          const Icon = option.icon;
          
          return (
            <div
              key={option.value}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-corporate-primary bg-corporate-primary bg-opacity-10'
                  : 'border-corporate-light bg-section-secondary hover:border-corporate-primary hover:bg-corporate-light'
              }`}
              onClick={() => onSelectColumns(option.value)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-corporate-primary' : 'text-corporate-secondary'}`} />
                  <span className={`text-sm font-medium ${isSelected ? 'text-corporate-primary' : 'text-corporate-secondary'}`}>
                    {option.label}
                  </span>
                </div>
                {isSelected && (
                  <div className="w-2 h-2 bg-corporate-primary rounded-full" />
                )}
              </div>
              
              <ColumnPreview columns={option.value} isActive={isSelected} />
            </div>
          );
        })}
      </div>
      
      <div className="text-xs text-corporate-secondary opacity-75 text-center">
        Selecciona el número de columnas para tu banner
      </div>
    </div>
  );
}; 