import React from 'react';

export const WorkflowLeftPanel: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">Flashes</h1>
        </div>
        <p className="text-slate-500">Design your banner in minutes</p>
      </div>
    </div>
  );
}; 