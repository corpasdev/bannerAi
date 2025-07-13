import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ZoomIn, ZoomOut, RotateCw, Move, Square, Layout, Grid3x3 } from 'lucide-react';

export const RightPanel: React.FC = () => {
  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto">
      {/* Zoom Controls */}
      <div>
        <h3 className="text-xs font-semibold text-corporate-secondary uppercase tracking-wide mb-3">ZOOM</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Button className="btn-corporate-outline p-2 w-10 h-10">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <div className="flex-1 mx-3">
              <div className="bg-corporate-light rounded-full h-2 relative">
                <div className="absolute left-0 top-0 h-2 bg-corporate-primary rounded-full" style={{ width: '100%' }}></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-corporate-primary rounded-full shadow-sm"></div>
              </div>
            </div>
            <Button className="btn-corporate-outline p-2 w-10 h-10">
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-center">
            <span className="text-sm font-medium text-corporate-secondary">100%</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xs font-semibold text-corporate-secondary uppercase tracking-wide mb-3">TOOLS</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button className="btn-corporate-outline p-3 flex flex-col items-center space-y-1">
            <Move className="w-4 h-4" />
            <span className="text-xs">Move</span>
          </Button>
          <Button className="btn-corporate-outline p-3 flex flex-col items-center space-y-1">
            <RotateCw className="w-4 h-4" />
            <span className="text-xs">Rotate</span>
          </Button>
        </div>
      </div>

      {/* Layout Presets */}
      <div>
        <h3 className="text-xs font-semibold text-corporate-secondary uppercase tracking-wide mb-3">LAYOUT PRESETS</h3>
        <div className="space-y-3">
          {/* Social Media Layouts */}
          <div className="p-3 border-2 border-corporate-primary rounded-lg bg-corporate-primary text-white">
            <div className="w-full h-16 rounded-md mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <div className="h-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full opacity-50"></div>
              </div>
            </div>
            <div className="text-xs font-medium">Custom Layout</div>
          </div>
          
          {/* Instagram Post */}
          <div className="p-3 border-2 border-corporate-light rounded-lg bg-page-primary interactive-corporate cursor-pointer hover:border-corporate-primary transition-all duration-200">
            <div className="w-full h-16 border border-corporate-light rounded-md bg-white mb-2"></div>
            <div className="text-xs font-medium text-corporate-secondary">Instagram Post</div>
            <div className="text-xs text-corporate-secondary opacity-75">1080 × 1080</div>
          </div>
          
          {/* Story Format */}
          <div className="p-3 border-2 border-corporate-light rounded-lg bg-page-primary interactive-corporate cursor-pointer hover:border-corporate-primary transition-all duration-200">
            <div className="w-full h-16 border border-corporate-light rounded-md bg-white mb-2 flex">
              <div className="w-1/3 h-full border-r border-corporate-light"></div>
              <div className="w-2/3 h-full"></div>
            </div>
            <div className="text-xs font-medium text-corporate-secondary">Story Format</div>
            <div className="text-xs text-corporate-secondary opacity-75">1080 × 1920</div>
          </div>
          
          {/* YouTube Thumbnail */}
          <div className="p-3 border-2 border-corporate-light rounded-lg bg-page-primary interactive-corporate cursor-pointer hover:border-corporate-primary transition-all duration-200">
            <div className="w-full h-16 border border-corporate-light rounded-md bg-white mb-2 flex">
              <div className="w-1/3 h-full border-r border-corporate-light"></div>
              <div className="w-1/3 h-full border-r border-corporate-light"></div>
              <div className="w-1/3 h-full"></div>
            </div>
            <div className="text-xs font-medium text-corporate-secondary">YouTube Thumbnail</div>
            <div className="text-xs text-corporate-secondary opacity-75">1280 × 720</div>
          </div>
        </div>
      </div>

      {/* Column Layout */}
      <div>
        <h3 className="text-xs font-semibold text-corporate-secondary uppercase tracking-wide mb-3">COLUMNS</h3>
        <div className="flex justify-center gap-3">
          <button className="w-10 h-10 active-corporate rounded-lg text-sm font-semibold">
            1
          </button>
          <button className="w-10 h-10 border-2 border-corporate-light text-corporate-secondary rounded-lg text-sm font-medium interactive-corporate transition-all duration-200">
            2
          </button>
          <button className="w-10 h-10 border-2 border-corporate-light text-corporate-secondary rounded-lg text-sm font-medium interactive-corporate transition-all duration-200">
            3
          </button>
        </div>
      </div>

      {/* Export Options */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="space-y-3">
          <Button className="btn-corporate-primary w-full px-4 py-3">
            <Download className="w-4 h-4 mr-2" />
            Export Design
          </Button>
          <div className="flex gap-2">
            <Button className="btn-corporate-outline flex-1 px-3 py-2 text-xs">
              PNG
            </Button>
            <Button className="btn-corporate-outline flex-1 px-3 py-2 text-xs">
              JPG
            </Button>
            <Button className="btn-corporate-outline flex-1 px-3 py-2 text-xs">
              SVG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 