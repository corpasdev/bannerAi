import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Download,
  Grid3x3,
  Palette,
  Image,
  Camera,
  ChevronDown,
  Settings,
  Wand2,
  FileText
} from 'lucide-react';
import ContentConfigurationModal from '@/components/ContentConfigurationModal';
import AIProductGeneratorModal from '@/components/AIProductGeneratorModal';

export const RightPanel: React.FC = () => {
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [isAIProductModalOpen, setIsAIProductModalOpen] = useState(false);

  const handleContentSave = (config: any) => {
    console.log('Content configuration saved:', config);
    // Here you would typically save the configuration to your state management system
  };

  const handleAIProductGenerate = (config: any) => {
    console.log('AI Product generation config:', config);
    // Here you would typically call the AI service to generate the product
  };

  const handleOptimizeCopy = () => {
    console.log('Optimize copy with AI clicked');
    // Here you would implement the copy optimization functionality
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pb-6 border-b border-slate-100">
          <Button 
            className="w-full justify-start gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Select Layout Columns */}
        <div className="pb-4 border-b border-slate-100">
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-1">Layout Columns</h3>
              <p className="text-xs text-slate-500">Choose columns for your banner</p>
            </div>
            
            {/* Column Options */}
            <div className="flex gap-2">
              {[1, 2, 3].map((columns) => (
                <div 
                  key={columns}
                  className="flex-1 border border-slate-200 bg-white cursor-pointer hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 rounded-lg"
                >
                  <div className="p-2">
                    <div className="w-full h-6 border border-slate-200 rounded overflow-hidden flex">
                      {Array.from({ length: columns }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-full bg-slate-300 ${
                            i < columns - 1 ? 'border-r border-slate-200' : ''
                          }`}
                          style={{ width: `${100 / columns}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Selector */}
        <div className="pb-4 border-b border-slate-100">
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-1">Background</h3>
              <p className="text-xs text-slate-500">Choose background type</p>
            </div>
            
            {/* Background Type Options */}
            <div className="grid grid-cols-4 gap-2">
              <div className="flex flex-col items-center p-3 border border-slate-200 bg-white cursor-pointer hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 rounded-lg">
                <Grid3x3 className="w-5 h-5 text-slate-600 mb-1" />
                <span className="text-xs text-slate-600 text-center">Trans...</span>
              </div>
              <div className="flex flex-col items-center p-3 border border-slate-200 bg-white cursor-pointer hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 rounded-lg">
                <Palette className="w-5 h-5 text-slate-600 mb-1" />
                <span className="text-xs text-slate-600 text-center">Color</span>
              </div>
              <div className="flex flex-col items-center p-3 border border-slate-200 bg-white cursor-pointer hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 rounded-lg">
                <Image className="w-5 h-5 text-slate-600 mb-1" />
                <span className="text-xs text-slate-600 text-center">Image</span>
              </div>
              <div className="flex flex-col items-center p-3 border border-slate-200 bg-white cursor-pointer hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 rounded-lg">
                <Camera className="w-5 h-5 text-slate-600 mb-1" />
                <span className="text-xs text-slate-600 text-center">Unspl...</span>
              </div>
            </div>

            {/* Solid Color Options */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-700">Solid Color</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-purple-300 transition-all duration-200"></div>
                <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg cursor-pointer hover:border-purple-300 transition-all duration-200"></div>
                <div className="w-10 h-10 bg-slate-400 border border-slate-200 rounded-lg cursor-pointer hover:border-purple-300 transition-all duration-200"></div>
                <div className="w-10 h-10 bg-slate-200 border border-slate-200 rounded-lg cursor-pointer hover:border-purple-300 transition-all duration-200 flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            </div>

            {/* Gradient Options */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-700">Gradient</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 border border-slate-200 rounded-lg cursor-pointer hover:border-purple-300 transition-all duration-200"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 border border-slate-200 rounded-lg cursor-pointer hover:border-purple-300 transition-all duration-200"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-200 border border-slate-200 rounded-lg cursor-pointer hover:border-purple-300 transition-all duration-200"></div>
                <div className="w-10 h-10 bg-slate-200 border border-slate-200 rounded-lg cursor-pointer hover:border-purple-300 transition-all duration-200 flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Configuration */}
        <div className="pb-4 border-b border-slate-100">
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-1">Contenido</h3>
              <p className="text-xs text-slate-500">Configura el contenido del banner</p>
            </div>
            
            <Button
              onClick={() => setIsContentModalOpen(true)}
              className="w-full justify-start gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm rounded-full"
            >
              <Settings className="w-4 h-4" />
              Configurar Contenido
            </Button>
          </div>
        </div>

        {/* Improve with AI */}
        <div className="pb-4 border-b border-slate-100">
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-1">Improve with AI</h3>
              <p className="text-xs text-slate-500">Enhance your banner with artificial intelligence</p>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={handleOptimizeCopy}
                className="w-full justify-start gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm rounded-full"
              >
                <FileText className="w-4 h-4" />
                Optimize Copy with AI
              </Button>
              
              <Button
                onClick={() => setIsAIProductModalOpen(true)}
                className="w-full justify-start gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-sm rounded-full"
              >
                <Wand2 className="w-4 h-4" />
                Generate Product with AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Configuration Modal */}
      <ContentConfigurationModal
        isOpen={isContentModalOpen}
        onClose={() => setIsContentModalOpen(false)}
        onSave={handleContentSave}
      />
      
      {/* AI Product Generator Modal */}
      <AIProductGeneratorModal
        isOpen={isAIProductModalOpen}
        onClose={() => setIsAIProductModalOpen(false)}
        onGenerate={handleAIProductGenerate}
      />
    </ScrollArea>
  );
}; 