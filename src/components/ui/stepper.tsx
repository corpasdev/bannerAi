import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface StepperProps {
  steps: StepperStep[];
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

interface StepperStep {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'current' | 'completed';
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  orientation = 'vertical',
  className,
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <div className={cn('stepper', className)}>
      <div className={cn(
        'flex',
        isVertical ? 'flex-col' : 'flex-row items-center'
      )}>
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              'step-item',
              isVertical ? 'flex gap-4' : 'flex flex-col items-center',
              index === steps.length - 1 ? '' : isVertical ? 'pb-8' : 'pr-6'
            )}
          >
            {/* Step Indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'step-indicator flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200',
                  step.status === 'completed' 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : step.status === 'current'
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'bg-white border-slate-300 text-slate-400',
                  'relative z-10'
                )}
              >
                {step.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'connector-line',
                    isVertical 
                      ? 'w-0.5 h-8 mt-3' 
                      : 'h-0.5 w-6 ml-2',
                    step.status === 'completed' 
                      ? 'bg-green-500' 
                      : 'bg-slate-200'
                  )}
                />
              )}
            </div>

            {/* Step Content */}
            <div className={cn(
              'step-content',
              isVertical ? 'flex-1' : 'mt-2 text-center'
            )}>
              <div className={cn(
                'step-title text-sm font-medium',
                step.status === 'completed' 
                  ? 'text-green-600' 
                  : step.status === 'current'
                  ? 'text-purple-600'
                  : 'text-slate-600'
              )}>
                {step.title}
              </div>
              {step.description && (
                <div className="step-description text-xs text-slate-500 mt-1">
                  {step.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export type { StepperProps, StepperStep }; 