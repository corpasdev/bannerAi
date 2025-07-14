import React from 'react';
import { Stepper, type StepperStep } from '@/components/ui/stepper';

interface WorkflowLeftPanelProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export const WorkflowLeftPanel: React.FC<WorkflowLeftPanelProps> = ({ 
  currentStep, 
  onStepChange 
}) => {

  const workflowSteps: StepperStep[] = [
    {
      id: 'layout',
      title: 'Choose layout columns',
      description: 'Select the number of columns for your banner layout',
      status: currentStep === 0 ? 'current' : currentStep > 0 ? 'completed' : 'pending'
    },
    {
      id: 'background',
      title: 'Choose background type',
      description: 'Select background color, gradient, or image',
      status: currentStep === 1 ? 'current' : currentStep > 1 ? 'completed' : 'pending'
    },
    {
      id: 'content',
      title: 'Configure banner content',
      description: 'Add text, images, and other elements',
      status: currentStep === 2 ? 'current' : currentStep > 2 ? 'completed' : 'pending'
    },
    {
      id: 'ai',
      title: 'Improve with AI',
      description: 'Optimize text and generate images with AI',
      status: currentStep === 3 ? 'current' : currentStep > 3 ? 'completed' : 'pending'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-slate-100 pt-0 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">Flashes</h1>
        </div>
        <p className="text-slate-500 text-sm">Design your banner in minutes</p>
      </div>

      {/* Workflow Steps */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 pb-4 flex-shrink-0 hidden">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Banner Creation Workflow</h2>
            <p className="text-sm text-slate-500">Follow these steps to create your banner</p>
          </div>
        </div>

        <div className="flex-1 px-5 pb-5 overflow-y-auto stepper-workflow-container">
          <Stepper
            steps={workflowSteps}
            orientation="vertical"
            className="stepper-workflow"
          />
        </div>
      </div>

      {/* Demo Controls */}
      <div className="p-5 border-t border-slate-100">
        <div className="mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => onStepChange(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-3 py-1 text-xs bg-slate-200 text-slate-700 rounded hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => onStepChange(Math.min(workflowSteps.length - 1, currentStep + 1))}
              disabled={currentStep === workflowSteps.length - 1}
              className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 