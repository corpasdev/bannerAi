import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { RightPanel } from './RightPanel';
import { WorkflowLeftPanel } from '../features/banner/components/WorkflowLeftPanel';
import { Edit2, Check, X } from 'lucide-react';

export const BannerEditorLayout: React.FC = () => {
  const [projectTitle, setProjectTitle] = useState('Untitle');
  const [tempTitle, setTempTitle] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleEditTitle = () => {
    setTempTitle(projectTitle);
    setIsPopoverOpen(true);
  };

  const handleSaveTitle = () => {
    if (tempTitle.trim()) {
      setProjectTitle(tempTitle.trim());
    }
    setIsPopoverOpen(false);
  };

  const handleCancelTitle = () => {
    setTempTitle('');
    setIsPopoverOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      handleCancelTitle();
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100/50 p-4">
      {/* Main Three-Panel Layout */}
      <div className="flex gap-6 h-[calc(100vh-32px)]">
        
        {/* Left Sidebar - Workflow Tools */}
        <div className="w-80 flex-shrink-0">
          <Card className="h-full border-0 shadow-lg bg-white/95 backdrop-blur-sm">
            <div className="h-full overflow-hidden">
              <WorkflowLeftPanel />
            </div>
          </Card>
        </div>

        {/* Center Workspace - Main Editing Area */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 border-0 shadow-xl bg-white/95 backdrop-blur-sm">
            <div className="h-full flex flex-col">
              <div className="px-8 py-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-slate-800">{projectTitle}</h2>
                    <Popover 
                      open={isPopoverOpen}
                      onOpenChange={setIsPopoverOpen}
                      trigger={
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-1 h-8 w-8 hover:bg-slate-100"
                          onClick={handleEditTitle}
                        >
                          <Edit2 className="h-4 w-4 text-slate-500" />
                        </Button>
                      }
                    >
                      <PopoverContent className="w-80">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">
                              Título del proyecto
                            </label>
                                                         <Input
                               value={tempTitle}
                               onChange={(e) => setTempTitle(e.target.value)}
                               onKeyDown={handleKeyDown}
                               placeholder="Ingrese el título del proyecto"
                               className="w-full"
                               autoFocus
                             />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelTitle}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancelar
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSaveTitle}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Guardar
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-600">
                      800 × 400px
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-8">
                <div className="h-full flex items-center justify-center">
                  {/* Canvas Container with Modern Styling */}
                  <div className="relative">
                    <Card className="w-[800px] h-[400px] border-2 border-dashed border-slate-200 bg-white shadow-2xl">
                      <div className="w-full h-full flex items-center justify-center rounded-xl">
                        <div className="text-center">
                          <Button 
                            variant="outline" 
                            className="mb-4 px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 border-2 border-slate-300 hover:border-slate-400"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Templates
                          </Button>
                          <h3 className="text-lg font-semibold text-slate-700 mb-2">Start Creating</h3>
                          <p className="text-slate-500 max-w-sm">Begin by selecting the number of columns for your banner layout</p>
                        </div>
                      </div>
                    </Card>
                    
                    {/* Canvas Shadow Enhancement */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl blur-xl -z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar - Tools & Export */}
        <div className="w-80 flex-shrink-0">
          <Card className="h-full border-0 shadow-lg bg-white/95 backdrop-blur-sm">
            <div className="h-full overflow-hidden">
              <RightPanel />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}; 