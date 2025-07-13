import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Circle, 
  Sparkles, 
  Image, 
  Grid3x3, 
  CheckCircle, 
  Upload,
  Palette,
  Layers
} from 'lucide-react';
import type { BannerConfig } from '../types';

interface BackgroundSelectorProps {
  backgroundType: BannerConfig['backgroundType'];
  backgroundValue: string;
  onBackgroundChange: (type: BannerConfig['backgroundType'], value: string) => void;
  isCompleted?: boolean;
}

const backgroundTypes = [
  { value: 'solid', label: 'Color Sólido', icon: Circle },
  { value: 'gradient', label: 'Gradiente', icon: Sparkles },
  { value: 'image', label: 'Imagen', icon: Image },
  { value: 'pattern', label: 'Patrón', icon: Grid3x3 },
] as const;

const solidColors = [
  '#ffffff', '#000000', '#f3f4f6', '#e5e7eb', '#9ca3af', '#6b7280',
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
  '#ec4899', '#f43f5e', '#7c3aed', '#9400FF', '#27005D', '#5B2C6F',
];

const gradientPresets = [
  { name: 'Sunset', value: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)' },
  { name: 'Ocean', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Forest', value: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)' },
  { name: 'Sky', value: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' },
  { name: 'Purple', value: 'linear-gradient(135deg, #9400FF 0%, #27005D 100%)' },
  { name: 'Corporate', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
];

const patternOptions = [
  { name: 'Dots', value: 'radial-gradient(circle, #666 1px, transparent 1px)' },
  { name: 'Lines', value: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #666 10px, #666 11px)' },
  { name: 'Grid', value: 'linear-gradient(#666 1px, transparent 1px), linear-gradient(90deg, #666 1px, transparent 1px)' },
  { name: 'Zigzag', value: 'linear-gradient(135deg, #666 25%, transparent 25%)' },
];

const BackgroundPreview: React.FC<{ type: BannerConfig['backgroundType']; value: string }> = ({ type, value }) => {
  const getPreviewStyle = () => {
    switch (type) {
      case 'solid':
        return { backgroundColor: value };
      case 'gradient':
        return { background: value };
      case 'pattern':
        return { 
          background: value,
          backgroundSize: '20px 20px'
        };
      case 'image':
        return { 
          backgroundImage: `url(${value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      default:
        return { backgroundColor: '#ffffff' };
    }
  };

  return (
    <div 
      className="w-full h-16 border-2 border-corporate-light rounded-lg overflow-hidden"
      style={getPreviewStyle()}
    >
      {type === 'image' && !value && (
        <div className="w-full h-full flex items-center justify-center">
          <Upload className="w-6 h-6 text-corporate-secondary opacity-50" />
        </div>
      )}
    </div>
  );
};

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  backgroundType,
  backgroundValue,
  onBackgroundChange,
  isCompleted = false,
}) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUpload(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onBackgroundChange('image', e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const renderTypeSelector = () => {
    return (
      <div className="grid grid-cols-2 gap-2">
        {backgroundTypes.map((type) => {
          const isSelected = backgroundType === type.value;
          const Icon = type.icon;
          
          return (
            <button
              key={type.value}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-corporate-primary bg-corporate-primary bg-opacity-10'
                  : 'border-corporate-light bg-section-secondary hover:border-corporate-primary'
              }`}
              onClick={() => onBackgroundChange(type.value, backgroundValue)}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-corporate-primary' : 'text-corporate-secondary'}`} />
                <span className={`text-xs font-medium ${isSelected ? 'text-corporate-primary' : 'text-corporate-secondary'}`}>
                  {type.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderValueSelector = () => {
    switch (backgroundType) {
      case 'solid':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-8 gap-2">
              {solidColors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                    backgroundValue === color
                      ? 'border-corporate-primary scale-110'
                      : 'border-corporate-light hover:border-corporate-primary'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => onBackgroundChange('solid', color)}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={backgroundValue}
                onChange={(e) => onBackgroundChange('solid', e.target.value)}
                className="w-8 h-8 rounded border border-corporate-light"
              />
              <span className="text-xs text-corporate-secondary">Color personalizado</span>
            </div>
          </div>
        );

      case 'gradient':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {gradientPresets.map((gradient) => (
                <button
                  key={gradient.name}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    backgroundValue === gradient.value
                      ? 'border-corporate-primary'
                      : 'border-corporate-light hover:border-corporate-primary'
                  }`}
                  onClick={() => onBackgroundChange('gradient', gradient.value)}
                >
                  <div className="space-y-2">
                    <div 
                      className="w-full h-8 rounded"
                      style={{ background: gradient.value }}
                    />
                    <span className="text-xs text-corporate-secondary">{gradient.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'pattern':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {patternOptions.map((pattern) => (
                <button
                  key={pattern.name}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    backgroundValue === pattern.value
                      ? 'border-corporate-primary'
                      : 'border-corporate-light hover:border-corporate-primary'
                  }`}
                  onClick={() => onBackgroundChange('pattern', pattern.value)}
                >
                  <div className="space-y-2">
                    <div 
                      className="w-full h-8 rounded border border-corporate-light"
                      style={{ 
                        background: pattern.value,
                        backgroundSize: '10px 10px'
                      }}
                    />
                    <span className="text-xs text-corporate-secondary">{pattern.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-3">
            <div className="border-2 border-dashed border-corporate-light rounded-lg p-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="background-image-upload"
              />
              <label
                htmlFor="background-image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="w-6 h-6 text-corporate-secondary mb-2" />
                <span className="text-sm text-corporate-secondary">
                  {imageUpload ? imageUpload.name : 'Subir imagen de fondo'}
                </span>
                <span className="text-xs text-corporate-secondary opacity-75">
                  PNG, JPG hasta 10MB
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-corporate-secondary flex items-center gap-2">
          <Palette className="w-4 h-4" />
          SELECCIONAR TIPO DE FONDO
        </h3>
        {isCompleted && (
          <CheckCircle className="w-4 h-4 text-green-500" />
        )}
      </div>

      {renderTypeSelector()}
      
      {renderValueSelector()}

      <div className="mt-4">
        <h4 className="text-xs font-semibold text-corporate-secondary mb-2">VISTA PREVIA</h4>
        <BackgroundPreview type={backgroundType} value={backgroundValue} />
      </div>
      
      <div className="text-xs text-corporate-secondary opacity-75 text-center">
        Selecciona el tipo de fondo para tu banner
      </div>
    </div>
  );
}; 