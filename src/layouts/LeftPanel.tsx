import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Circle, Image, Plus, Upload, Palette, Type, Layers } from 'lucide-react';

export const LeftPanel: React.FC = () => {
  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto">
      {/* Media Section */}
      <div>
        <h3 className="text-xs font-semibold text-corporate-secondary uppercase tracking-wide mb-3">MEDIA</h3>
        <div className="space-y-3">
          <button className="w-full h-20 border-2 border-dashed border-corporate-light rounded-lg flex flex-col items-center justify-center interactive-corporate group">
            <Upload className="w-5 h-5 text-corporate-secondary group-hover:text-corporate-primary transition-colors" />
            <span className="text-xs text-corporate-secondary mt-1">Upload</span>
          </button>
          <div className="text-xs text-corporate-secondary text-center opacity-75">
            Drop media or click to choose
          </div>
        </div>
      </div>

      {/* Style Section */}
      <div>
        <h3 className="text-xs font-semibold text-corporate-secondary uppercase tracking-wide mb-3">STYLE</h3>
        <div className="grid grid-cols-3 gap-2">
          {/* Default Style */}
          <div className="flex flex-col items-center space-y-1">
            <button className="w-12 h-12 border-2 border-corporate-light rounded-lg flex items-center justify-center interactive-corporate hover:border-corporate-primary transition-all duration-200">
              <div className="w-6 h-6 bg-white rounded border border-corporate-light"></div>
            </button>
            <span className="text-xs text-corporate-secondary">Default</span>
          </div>
          
          {/* Glass Light */}
          <div className="flex flex-col items-center space-y-1">
            <button className="w-12 h-12 border-2 border-corporate-light rounded-lg flex items-center justify-center interactive-corporate hover:border-corporate-primary transition-all duration-200">
              <div className="w-6 h-6 bg-corporate-light rounded opacity-60"></div>
            </button>
            <span className="text-xs text-corporate-secondary">Glass Light</span>
          </div>
          
          {/* Gradient */}
          <div className="flex flex-col items-center space-y-1">
            <button className="w-12 h-12 border-2 border-corporate-light rounded-lg flex items-center justify-center interactive-corporate hover:border-corporate-primary transition-all duration-200">
              <div className="w-6 h-6 rounded" style={{ background: 'linear-gradient(135deg, #9400FF 0%, #27005D 100%)' }}></div>
            </button>
            <span className="text-xs text-corporate-secondary">Gradient</span>
          </div>
          
          {/* Glass Dark */}
          <div className="flex flex-col items-center space-y-1">
            <button className="w-12 h-12 border-2 border-corporate-light rounded-lg flex items-center justify-center interactive-corporate hover:border-corporate-primary transition-all duration-200">
              <div className="w-6 h-6 bg-corporate-secondary rounded opacity-80"></div>
            </button>
            <span className="text-xs text-corporate-secondary">Glass Dark</span>
          </div>
          
          {/* Outline */}
          <div className="flex flex-col items-center space-y-1">
            <button className="w-12 h-12 border-2 border-corporate-light rounded-lg flex items-center justify-center interactive-corporate hover:border-corporate-primary transition-all duration-200">
              <div className="w-6 h-6 border-2 border-corporate-secondary rounded"></div>
            </button>
            <span className="text-xs text-corporate-secondary">Outline</span>
          </div>
          
          {/* Border */}
          <div className="flex flex-col items-center space-y-1">
            <button className="w-12 h-12 border-2 border-corporate-light rounded-lg flex items-center justify-center interactive-corporate hover:border-corporate-primary transition-all duration-200">
              <div className="w-6 h-6 border-2 border-corporate-primary rounded bg-white"></div>
            </button>
            <span className="text-xs text-corporate-secondary">Border</span>
          </div>
        </div>
      </div>

      {/* Background Options */}
      <div>
        <h3 className="text-xs font-semibold text-corporate-secondary uppercase tracking-wide mb-3">BACKGROUND</h3>
        <div className="flex justify-between">
          <div className="flex flex-col items-center space-y-2">
            <button className="w-12 h-12 border-2 border-corporate-light rounded-lg flex items-center justify-center interactive-corporate hover:border-corporate-primary transition-all duration-200">
              <Sparkles className="w-5 h-5 text-corporate-secondary" />
            </button>
            <span className="text-xs text-corporate-secondary">Gradient</span>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <button className="w-12 h-12 border-2 border-corporate-light rounded-lg flex items-center justify-center interactive-corporate hover:border-corporate-primary transition-all duration-200">
              <Circle className="w-5 h-5 text-corporate-secondary" />
            </button>
            <span className="text-xs text-corporate-secondary">Solid</span>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <button className="w-12 h-12 border-2 border-corporate-light rounded-lg flex items-center justify-center interactive-corporate hover:border-corporate-primary transition-all duration-200">
              <Image className="w-5 h-5 text-corporate-secondary" />
            </button>
            <span className="text-xs text-corporate-secondary">Image</span>
          </div>
        </div>
      </div>

      {/* Additional Tools */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="space-y-2">
          <Button className="btn-corporate-primary w-full px-4 py-2 text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </Button>
          <Button className="btn-corporate-outline w-full px-4 py-2 text-sm">
            <Type className="w-4 h-4 mr-2" />
            Add Text
          </Button>
        </div>
      </div>
    </div>
  );
}; 