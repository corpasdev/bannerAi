import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ZoomIn, ZoomOut, RotateCw, Share2 } from 'lucide-react';
import type { BannerConfig } from '../types';

interface BannerPreviewProps {
  config: BannerConfig;
  onExport?: (format: 'png' | 'jpg' | 'svg') => void;
  onShare?: () => void;
}

export const BannerPreview: React.FC<BannerPreviewProps> = ({
  config,
  onExport,
  onShare,
}) => {
  const getBackgroundStyle = () => {
    switch (config.backgroundType) {
      case 'solid':
        return { backgroundColor: config.backgroundValue };
      case 'gradient':
        return { background: config.backgroundValue };
      case 'pattern':
        return { 
          background: config.backgroundValue,
          backgroundSize: '40px 40px'
        };
      case 'image':
        return { 
          backgroundImage: `url(${config.backgroundValue})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      default:
        return { backgroundColor: '#ffffff' };
    }
  };

  const renderColumnContent = (columnIndex: number) => {
    const columnContent = config.content.filter(c => c.position.column === columnIndex);
    
    return (
      <div className="flex-1 h-full p-4 flex flex-col gap-4">
        {columnContent.map((item) => (
          <div
            key={item.id}
            className="relative"
            style={{
              width: `${item.position.width}%`,
              height: `${item.position.height}px`,
              minHeight: item.type === 'text' ? '40px' : '100px',
            }}
          >
            {item.type === 'text' ? (
              <div
                style={{
                  fontFamily: item.style.fontFamily,
                  fontSize: item.style.fontSize,
                  color: item.style.color,
                  textAlign: item.style.textAlign,
                  padding: item.style.padding,
                  backgroundColor: item.style.backgroundColor,
                  borderRadius: '4px',
                  wordWrap: 'break-word',
                  lineHeight: '1.4',
                }}
              >
                {item.content}
              </div>
            ) : (
              <div
                className="w-full h-full rounded-lg overflow-hidden border border-gray-200"
                style={{ padding: item.style.padding }}
              >
                {item.content ? (
                  <img
                    src={item.content}
                    alt="Banner content"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Sin imagen</span>
                  </div>
                )}
              </div>
            )}
            
            {item.isAIGenerated && (
              <div className="absolute top-2 right-2 bg-corporate-primary text-white px-2 py-1 rounded text-xs font-medium">
                IA
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-corporate-secondary">Vista Previa</h2>
          <p className="text-sm text-corporate-secondary opacity-75">
            Previsualización en tiempo real de tu banner
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={onShare}
            className="btn-corporate-outline px-3 py-2"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartir
          </Button>
          <div className="flex items-center gap-1">
            <Button
              onClick={() => onExport?.('png')}
              className="btn-corporate-primary px-3 py-2"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <div className="relative">
              <select className="appearance-none bg-transparent border-none text-xs pl-2 pr-6 py-1 text-corporate-secondary">
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="svg">SVG</option>
              </select>
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-3 h-3 text-corporate-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Canvas */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden" style={{ width: '800px', height: '400px' }}>
          {/* Banner Content */}
          <div
            className="w-full h-full relative"
            style={getBackgroundStyle()}
          >
            {config.columns > 0 ? (
              <div className="w-full h-full flex">
                {Array.from({ length: config.columns }, (_, i) => (
                  <div key={i} className="flex-1 h-full">
                    {renderColumnContent(i)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-corporate-secondary opacity-50">
                  <div className="text-lg font-medium mb-2">Configura tu banner</div>
                  <div className="text-sm">Selecciona el número de columnas para comenzar</div>
                </div>
              </div>
            )}
          </div>

          {/* Canvas Info */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            800 × 400px
          </div>
        </div>
      </div>

      {/* Preview Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-corporate-light">
        <div className="flex items-center gap-2">
          <span className="text-sm text-corporate-secondary">Zoom:</span>
          <Button className="btn-corporate-outline p-2">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-corporate-secondary px-2">100%</span>
          <Button className="btn-corporate-outline p-2">
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button className="btn-corporate-outline p-2">
            <RotateCw className="w-4 h-4" />
          </Button>
          <div className="text-sm text-corporate-secondary">
            {config.content.length} elemento{config.content.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
}; 