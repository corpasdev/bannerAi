import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Upload, Image, Video, Plus } from 'lucide-react';

export const CentralArea: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Top Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-corporate-secondary">Work Area</h1>
          <p className="text-sm text-corporate-secondary opacity-75">Create your banner design</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="btn-corporate-outline px-4 py-2">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button className="btn-corporate-primary px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Improve AI
          </Button>
        </div>
      </div>

      {/* Main Drop Zone */}
      <div 
        className="flex-1 border-2 border-dashed border-corporate-light rounded-2xl bg-transparent flex flex-col items-center justify-center relative transition-all duration-300 hover:border-corporate-primary hover:bg-corporate-light group cursor-pointer"
        style={{ 
          minHeight: '400px',
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(148, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(39, 0, 93, 0.1) 0%, transparent 50%)',
          backgroundSize: '100% 100%'
        }}
      >
        {/* Drop Area Content */}
        <div className="text-center space-y-4 z-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-corporate-primary rounded-full flex items-center justify-center">
              <Image className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-corporate-secondary rounded-full flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-corporate-light rounded-full flex items-center justify-center border-2 border-corporate-secondary">
              <Plus className="w-6 h-6 text-corporate-secondary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-corporate-secondary">Drop or Paste</h3>
            <p className="text-lg text-corporate-secondary opacity-75">Images & Videos</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-corporate-secondary opacity-60">
              Drag and drop your media files here or click to browse
            </p>
            <p className="text-xs text-corporate-secondary opacity-50">
              Supports JPG, PNG, SVG, MP4, MOV up to 50MB
            </p>
          </div>
        </div>

        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${encodeURIComponent('27005D')}' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-3">
          <Button className="btn-corporate-outline px-4 py-2">
            <Upload className="w-4 h-4 mr-2" />
            Browse Files
          </Button>
          <Button className="btn-corporate-outline px-4 py-2">
            <Image className="w-4 h-4 mr-2" />
            From URL
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-corporate-secondary opacity-75">Canvas Size:</span>
          <div className="bg-corporate-light px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-corporate-secondary">1920 × 1080</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 