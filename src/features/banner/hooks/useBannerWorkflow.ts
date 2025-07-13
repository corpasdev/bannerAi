import { useState, useCallback } from 'react';
import type { BannerWorkflow, BannerConfig, WorkflowStep } from '../types';

const defaultSteps: WorkflowStep[] = [
  { id: 'columns', title: 'Seleccionar N° Columnas', completed: false, current: true },
  { id: 'background', title: 'Seleccionar tipo de fondo', completed: false, current: false },
  { id: 'content', title: 'Definir contenido', completed: false, current: false },
  { id: 'ai-image', title: 'Generar imagen de producto con IA', completed: false, current: false, optional: true },
  { id: 'ai-text', title: 'Optimizar y mejorar texto con IA', completed: false, current: false, optional: true },
  { id: 'preview', title: 'Previsualizar y ajustar', completed: false, current: false },
];

const defaultConfig: BannerConfig = {
  id: '',
  columns: 1,
  backgroundType: 'solid',
  backgroundValue: '#ffffff',
  content: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useBannerWorkflow = (initialConfig?: Partial<BannerConfig>) => {
  const [workflow, setWorkflow] = useState<BannerWorkflow>({
    currentStep: 0,
    steps: defaultSteps,
    config: { ...defaultConfig, ...initialConfig },
  });

  const updateConfig = useCallback((updates: Partial<BannerConfig>) => {
    setWorkflow(prev => ({
      ...prev,
      config: {
        ...prev.config,
        ...updates,
        updatedAt: new Date(),
      },
    }));
  }, []);

  const nextStep = useCallback(() => {
    setWorkflow(prev => {
      const newSteps = [...prev.steps];
      const currentIndex = prev.currentStep;
      
      // Mark current step as completed
      if (newSteps[currentIndex]) {
        newSteps[currentIndex] = { ...newSteps[currentIndex], completed: true, current: false };
      }

      // Move to next step
      const nextIndex = currentIndex + 1;
      if (nextIndex < newSteps.length) {
        newSteps[nextIndex] = { ...newSteps[nextIndex], current: true };
      }

      return {
        ...prev,
        currentStep: nextIndex,
        steps: newSteps,
      };
    });
  }, []);

  const previousStep = useCallback(() => {
    setWorkflow(prev => {
      const newSteps = [...prev.steps];
      const currentIndex = prev.currentStep;
      
      // Mark current step as not current
      if (newSteps[currentIndex]) {
        newSteps[currentIndex] = { ...newSteps[currentIndex], current: false };
      }

      // Move to previous step
      const prevIndex = Math.max(0, currentIndex - 1);
      if (newSteps[prevIndex]) {
        newSteps[prevIndex] = { ...newSteps[prevIndex], current: true };
      }

      return {
        ...prev,
        currentStep: prevIndex,
        steps: newSteps,
      };
    });
  }, []);

  const goToStep = useCallback((stepId: string) => {
    setWorkflow(prev => {
      const newSteps = [...prev.steps];
      const currentIndex = prev.currentStep;
      const targetIndex = newSteps.findIndex(step => step.id === stepId);
      
      if (targetIndex === -1) return prev;

      // Mark current step as not current
      if (newSteps[currentIndex]) {
        newSteps[currentIndex] = { ...newSteps[currentIndex], current: false };
      }

      // Mark target step as current
      newSteps[targetIndex] = { ...newSteps[targetIndex], current: true };

      return {
        ...prev,
        currentStep: targetIndex,
        steps: newSteps,
      };
    });
  }, []);

  const completeStep = useCallback((stepId: string) => {
    setWorkflow(prev => {
      const newSteps = [...prev.steps];
      const stepIndex = newSteps.findIndex(step => step.id === stepId);
      
      if (stepIndex !== -1) {
        newSteps[stepIndex] = { ...newSteps[stepIndex], completed: true };
      }

      return {
        ...prev,
        steps: newSteps,
      };
    });
  }, []);

  const canProceed = useCallback(() => {
    const currentStep = workflow.steps[workflow.currentStep];
    if (!currentStep) return false;

    switch (currentStep.id) {
      case 'columns':
        return workflow.config.columns > 0;
      case 'background':
        return workflow.config.backgroundType && workflow.config.backgroundValue;
      case 'content':
        return workflow.config.content.length > 0;
      case 'ai-image':
      case 'ai-text':
        return true; // Optional steps can always be skipped
      case 'preview':
        return true;
      default:
        return false;
    }
  }, [workflow]);

  const isStepCompleted = useCallback((stepId: string) => {
    const step = workflow.steps.find(s => s.id === stepId);
    return step?.completed || false;
  }, [workflow.steps]);

  const isCurrentStep = useCallback((stepId: string) => {
    const step = workflow.steps.find(s => s.id === stepId);
    return step?.current || false;
  }, [workflow.steps]);

  const resetWorkflow = useCallback(() => {
    setWorkflow({
      currentStep: 0,
      steps: defaultSteps.map((step, index) => ({
        ...step,
        completed: false,
        current: index === 0,
      })),
      config: { ...defaultConfig, ...initialConfig },
    });
  }, [initialConfig]);

  return {
    workflow,
    updateConfig,
    nextStep,
    previousStep,
    goToStep,
    completeStep,
    canProceed,
    isStepCompleted,
    isCurrentStep,
    resetWorkflow,
  };
}; 