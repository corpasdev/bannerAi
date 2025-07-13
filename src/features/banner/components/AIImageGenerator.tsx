import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Image, 
  CheckCircle, 
  Loader2, 
  Download,
  RefreshCw,
  Wand2,
  Palette
} from 'lucide-react';
import { bannerApi } from '../services/api';
import type { AIImageRequest } from '../types';

interface AIImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
  isCompleted?: boolean;
}

const imageStyles = [
  { value: 'realistic', label: 'Realista', description: 'Imágenes fotorrealistas' },
  { value: 'artistic', label: 'Artístico', description: 'Estilo artístico y creativo' },
  { value: 'minimal', label: 'Minimalista', description: 'Diseño limpio y simple' },
  { value: 'corporate', label: 'Corporativo', description: 'Profesional y elegante' },
] as const;

const promptSuggestions = [
  'Producto tecnológico moderno sobre fondo blanco',
  'Comida gourmet con presentación elegante',
  'Dispositivo electrónico con iluminación profesional',
  'Ropa casual en ambiente natural',
  'Producto de belleza con elementos naturales',
  'Herramienta profesional en entorno de trabajo',
];

export const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({
  onImageGenerated,
  isCompleted = false,
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<AIImageRequest['style']>('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);

    try {
      const request: AIImageRequest = {
        prompt: prompt.trim(),
        style: selectedStyle,
        dimensions: { width: 512, height: 512 },
      };

      const response = await bannerApi.generateProductImage(request);
      setGeneratedImage(response.imageUrl);
      onImageGenerated(response.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar la imagen');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseImage = () => {
    if (generatedImage) {
      onImageGenerated(generatedImage);
    }
  };

  const handleRegenerateWithVariation = async () => {
    const variations = [
      'con mejor iluminación',
      'desde otro ángulo',
      'con fondo diferente',
      'con más detalle',
      'en alta resolución',
    ];
    
    const variation = variations[Math.floor(Math.random() * variations.length)];
    const enhancedPrompt = `${prompt} ${variation}`;
    
    setPrompt(enhancedPrompt);
    await handleGenerate();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-corporate-secondary flex items-center gap-2">
          <Wand2 className="w-4 h-4" />
          GENERAR IMAGEN DE PRODUCTO CON IA
        </h3>
        {isCompleted && (
          <CheckCircle className="w-4 h-4 text-green-500" />
        )}
      </div>

      {/* Prompt Input */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-corporate-secondary">
          Describe el producto que quieres generar:
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ejemplo: Un smartphone moderno con pantalla brillante sobre una mesa de madera..."
          className="w-full p-3 border border-corporate-light rounded-lg bg-section-secondary text-corporate-secondary placeholder:text-corporate-secondary placeholder:opacity-50 resize-none"
          rows={3}
        />
      </div>

      {/* Style Selection */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-corporate-secondary">
          Estilo visual:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {imageStyles.map((style) => (
            <button
              key={style.value}
              className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                selectedStyle === style.value
                  ? 'border-corporate-primary bg-corporate-primary bg-opacity-10'
                  : 'border-corporate-light bg-section-secondary hover:border-corporate-primary'
              }`}
              onClick={() => setSelectedStyle(style.value)}
            >
              <div className="space-y-1">
                <div className={`text-sm font-medium ${
                  selectedStyle === style.value ? 'text-corporate-primary' : 'text-corporate-secondary'
                }`}>
                  {style.label}
                </div>
                <div className="text-xs text-corporate-secondary opacity-75">
                  {style.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Suggestions */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-corporate-secondary">
          Sugerencias de prompts:
        </label>
        <div className="flex flex-wrap gap-2">
          {promptSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className="text-xs px-3 py-1 bg-corporate-light rounded-full text-corporate-secondary hover:bg-corporate-primary hover:text-white transition-colors"
              onClick={() => setPrompt(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full btn-corporate-primary"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generando imagen...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generar Imagen
          </>
        )}
      </Button>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {/* Generated Image Display */}
      {generatedImage && (
        <div className="space-y-3">
          <div className="border-2 border-corporate-light rounded-lg overflow-hidden">
            <img
              src={generatedImage}
              alt="Generated product"
              className="w-full h-48 object-cover"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleUseImage}
              className="flex-1 btn-corporate-primary"
            >
              <Download className="w-4 h-4 mr-2" />
              Usar esta imagen
            </Button>
            <Button
              onClick={handleRegenerateWithVariation}
              disabled={isGenerating}
              className="btn-corporate-outline"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="text-xs text-corporate-secondary opacity-75 text-center">
        La IA generará una imagen de producto basada en tu descripción
      </div>
    </div>
  );
}; 