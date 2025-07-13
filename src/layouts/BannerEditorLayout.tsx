import React from 'react';
import { LeftPanel } from './LeftPanel';
import { CentralArea } from './CentralArea';
import { RightPanel } from './RightPanel';

export const BannerEditorLayout: React.FC = () => {
  return (
    <div 
      className="text-corporate-white" 
      style={{ 
        width: '100%', 
        height: '100%',
        padding: '8px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Main container with modern design */}
      <div 
        className="border border-corporate-light rounded-xl bg-page-primary" 
        style={{ 
          width: '100%', 
          height: '100%',
          padding: '0',
          boxSizing: 'border-box',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Top Header Bar */}
        <div 
          className="border-b border-corporate-light"
          style={{
            height: '60px',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="w-8 h-8 bg-corporate-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-white font-semibold text-lg">Flashes</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn-corporate-outline px-4 py-2 text-xs">
              Templates
            </button>
            <button className="btn-corporate-primary px-4 py-2 text-xs">
              Export
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div 
          style={{ 
            height: 'calc(100% - 60px)',
            display: 'flex',
            overflow: 'hidden'
          }}
        >
          {/* Left Sidebar - Compact */}
          <div 
            className="bg-section-secondary border-r border-corporate-light" 
            style={{ 
              width: '280px',
              height: '100%',
              padding: '24px 16px',
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            <LeftPanel />
          </div>
          
          {/* Central Work Area - Expanded */}
          <div 
            className="bg-page-primary flex-1" 
            style={{ 
              height: '100%',
              padding: '24px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <CentralArea />
          </div>
          
          {/* Right Sidebar - Compact */}
          <div 
            className="bg-section-secondary border-l border-corporate-light" 
            style={{ 
              width: '280px',
              height: '100%',
              padding: '24px 16px',
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}; 