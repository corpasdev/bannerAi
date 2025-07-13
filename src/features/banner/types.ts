export interface BannerConfig {
  id: string;
  columns: number;
  backgroundType: 'solid' | 'gradient' | 'image' | 'pattern';
  backgroundValue: string;
  content: BannerContent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BannerContent {
  id: string;
  type: 'text' | 'image' | 'product-image';
  position: ContentPosition;
  content: string;
  style: ContentStyle;
  isAIGenerated?: boolean;
  isOptimized?: boolean;
}

export interface ContentPosition {
  column: number;
  row: number;
  width: number;
  height: number;
}

export interface ContentStyle {
  fontSize?: string;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  padding?: string;
  margin?: string;
}

export interface AIImageRequest {
  prompt: string;
  style?: 'realistic' | 'artistic' | 'minimal' | 'corporate';
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface AITextRequest {
  originalText: string;
  context: string;
  style?: 'professional' | 'casual' | 'marketing' | 'technical';
  maxLength?: number;
}

export interface WorkflowStep {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
  optional?: boolean;
}

export interface BannerWorkflow {
  currentStep: number;
  steps: WorkflowStep[];
  config: BannerConfig;
} 