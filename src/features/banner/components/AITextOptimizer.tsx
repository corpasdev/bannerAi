import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Type, 
  CheckCircle, 
  Loader2, 
  Sparkles,
  Copy,
  RefreshCw,
  Wand2,
  MessageSquare,
  Target,
  Zap
} from 'lucide-react';
import { bannerApi } from '../services/api';
import type { AITextRequest } from '../types';

interface AITextOptimizerProps {
  onTextOptimized: (text: string) => void;
  isCompleted?: boolean;
}

const textStyles = [
  { 
    value: 'professional', 
    label: 'Profesional', 
    description: 'Formal y confiable',
    icon: Target
  },
  { 
    value: 'casual', 
    label: 'Casual', 
    description: 'Amigable y cercano',
    icon: MessageSquare
  },
  { 
    value: 'marketing', 
    label: 'Marketing', 
    description: 'Persuasivo y atractivo',
    icon: Zap
  },
  { 
    value: 'technical', 
    label: 'Técnico', 
    description: 'Preciso y detallado',
    icon: Type
  },
] as const;

const contextSuggestions = [
  'Banner para redes sociales',
  'Anuncio de producto',
  'Promoción especial',
  'Lanzamiento de servicio',
  'Evento corporativo',
  'Oferta limitada',
];

const textExamples = [
  'Descubre nuestro nuevo producto',
  'Oferta especial por tiempo limitado',
  'Soluciones innovadoras para tu negocio',
  'Calidad premium al mejor precio',
  'Únete a miles de clientes satisfechos',
];

export const AITextOptimizer: React.FC<AITextOptimizerProps> = ({
  onTextOptimized,
  isCompleted = false,
}) => {
  const [originalText, setOriginalText] = useState('');
  const [context, setContext] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<AITextRequest['style']>('marketing');
  const [maxLength, setMaxLength] = useState<number>(100);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedText, setOptimizedText] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!originalText.trim()) return;
    
    setIsOptimizing(true);
    setError(null);

    try {
      const request: AITextRequest = {
        originalText: originalText.trim(),
        context: context.trim(),
        style: selectedStyle,
        maxLength,
      };

      const response = await bannerApi.optimizeText(request);
      setOptimizedText(response.optimizedText);
      setSuggestions(response.suggestions || []);
      onTextOptimized(response.optimizedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al optimizar el texto');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleUseText = (text: string) => {
    setOptimizedText(text);
    onTextOptimized(text);
  };

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleGenerateVariation = async () => {
    if (!optimizedText) return;
    
    const variations = [
      'más persuasivo',
      'más directo',
      'más emocional',
      'más técnico',
      'más creativo',
    ];
    
    const variation = variations[Math.floor(Math.random() * variations.length)];
    const enhancedContext = `${context} - Hacer el texto ${variation}`;
    
    setContext(enhancedContext);
    await handleOptimize();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-corporate-secondary flex items-center gap-2">
          <Wand2 className="w-4 h-4" />
          OPTIMIZAR Y MEJORAR TEXTO CON IA
        </h3>
        {isCompleted && (
          <CheckCircle className="w-4 h-4 text-green-500" />
        )}
      </div>

      {/* Original Text Input */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-corporate-secondary">
          Texto original:
        </label>
        <textarea
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
          placeholder="Escribe el texto que quieres optimizar..."
          className="w-full p-3 border border-corporate-light rounded-lg bg-section-secondary text-corporate-secondary placeholder:text-corporate-secondary placeholder:opacity-50 resize-none"
          rows={3}
        />
      </div>

      {/* Context Input */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-corporate-secondary">
          Contexto (opcional):
        </label>
        <input
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Ejemplo: Banner para promoción de Black Friday..."
          className="w-full p-3 border border-corporate-light rounded-lg bg-section-secondary text-corporate-secondary placeholder:text-corporate-secondary placeholder:opacity-50"
        />
      </div>

      {/* Style Selection */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-corporate-secondary">
          Estilo de escritura:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {textStyles.map((style) => {
            const Icon = style.icon;
            return (
              <button
                key={style.value}
                className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                  selectedStyle === style.value
                    ? 'border-corporate-primary bg-corporate-primary bg-opacity-10'
                    : 'border-corporate-light bg-section-secondary hover:border-corporate-primary'
                }`}
                onClick={() => setSelectedStyle(style.value)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${
                    selectedStyle === style.value ? 'text-corporate-primary' : 'text-corporate-secondary'
                  }`} />
                  <div className={`text-sm font-medium ${
                    selectedStyle === style.value ? 'text-corporate-primary' : 'text-corporate-secondary'
                  }`}>
                    {style.label}
                  </div>
                </div>
                <div className="text-xs text-corporate-secondary opacity-75">
                  {style.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Length */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-corporate-secondary">
          Longitud máxima: {maxLength} caracteres
        </label>
        <input
          type="range"
          min="50"
          max="300"
          value={maxLength}
          onChange={(e) => setMaxLength(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Quick Examples */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-corporate-secondary">
          Ejemplos rápidos:
        </label>
        <div className="flex flex-wrap gap-2">
          {textExamples.map((example, index) => (
            <button
              key={index}
              className="text-xs px-3 py-1 bg-corporate-light rounded-full text-corporate-secondary hover:bg-corporate-primary hover:text-white transition-colors"
              onClick={() => setOriginalText(example)}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Context Suggestions */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-corporate-secondary">
          Contextos sugeridos:
        </label>
        <div className="flex flex-wrap gap-2">
          {contextSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className="text-xs px-3 py-1 bg-corporate-light rounded-full text-corporate-secondary hover:bg-corporate-primary hover:text-white transition-colors"
              onClick={() => setContext(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Optimize Button */}
      <Button
        onClick={handleOptimize}
        disabled={!originalText.trim() || isOptimizing}
        className="w-full btn-corporate-primary"
      >
        {isOptimizing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Optimizando texto...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Optimizar Texto
          </>
        )}
      </Button>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {/* Optimized Text Display */}
      {optimizedText && (
        <div className="space-y-3">
          <div className="p-4 border-2 border-corporate-primary rounded-lg bg-corporate-primary bg-opacity-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-corporate-primary">Texto optimizado:</span>
              <button
                onClick={() => handleCopyText(optimizedText)}
                className="text-corporate-primary hover:text-corporate-secondary transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-corporate-secondary">{optimizedText}</p>
            <div className="text-xs text-corporate-secondary opacity-75 mt-2">
              {optimizedText.length} caracteres
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => handleUseText(optimizedText)}
              className="flex-1 btn-corporate-primary"
            >
              <Type className="w-4 h-4 mr-2" />
              Usar este texto
            </Button>
            <Button
              onClick={handleGenerateVariation}
              disabled={isOptimizing}
              className="btn-corporate-outline"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Alternative Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-medium text-corporate-secondary">
            Alternativas sugeridas:
          </span>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 border border-corporate-light rounded-lg bg-section-secondary"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-corporate-secondary flex-1">{suggestion}</p>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => handleCopyText(suggestion)}
                      className="text-corporate-secondary hover:text-corporate-primary transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleUseText(suggestion)}
                      className="text-corporate-secondary hover:text-corporate-primary transition-colors"
                    >
                      <Type className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-corporate-secondary opacity-75 text-center">
        La IA optimizará tu texto para mayor impacto y conversión
      </div>
    </div>
  );
}; 