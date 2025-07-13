# Banner Creation Feature

## Overview

This feature implements a complete banner creation workflow with AI assistance, following the process flow:

1. **Seleccionar N° Columnas** - Select number of columns for layout
2. **Seleccionar tipo de fondo** - Choose background type (solid, gradient, image, pattern)
3. **Definir contenido** - Add and organize content elements
4. **Generar imagen de producto con IA** - Generate AI product images (optional)
5. **Optimizar y mejorar texto con IA** - Optimize text with AI copywriting (optional)
6. **Previsualizar y ajustar** - Preview and make final adjustments

## Architecture

### Core Components

- **WorkflowLeftPanel** - Main workflow control panel
- **WorkflowCentralArea** - Real-time banner preview area
- **BannerPreview** - Live preview component
- **useBannerWorkflow** - State management hook

### Individual Feature Components

- **ColumnSelector** - Column layout selection with visual preview
- **BackgroundSelector** - Background type and styling options
- **ContentEditor** - Content management with drag-and-drop
- **AIImageGenerator** - AI-powered product image generation
- **AITextOptimizer** - AI-powered copywriting enhancement

### Backend Integration

The system is designed to easily connect with your backend API through:

- **bannerApi** service with all necessary endpoints
- Configurable API base URL via environment variables
- TypeScript interfaces for all API requests and responses

## Usage

### Basic Setup

```tsx
import { WorkflowLeftPanel, WorkflowCentralArea } from '@/features/banner';

// In your layout component
<div className="banner-editor">
  <WorkflowLeftPanel />
  <WorkflowCentralArea />
</div>
```

### Using Individual Components

```tsx
import { ColumnSelector, BackgroundSelector, AIImageGenerator } from '@/features/banner';

// Column selection
<ColumnSelector
  selectedColumns={columns}
  onSelectColumns={handleColumnChange}
  isCompleted={isStepCompleted}
/>

// Background selection
<BackgroundSelector
  backgroundType={backgroundType}
  backgroundValue={backgroundValue}
  onBackgroundChange={handleBackgroundChange}
/>

// AI image generation
<AIImageGenerator
  onImageGenerated={handleImageGenerated}
/>
```

### State Management

```tsx
import { useBannerWorkflow } from '@/features/banner';

const MyComponent = () => {
  const {
    workflow,
    updateConfig,
    nextStep,
    previousStep,
    canProceed,
    isStepCompleted,
    isCurrentStep,
  } = useBannerWorkflow();

  // Use workflow state and controls
};
```

## API Integration

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Expected Backend Endpoints

- `POST /api/ai/generate-image` - Generate AI product images
- `POST /api/ai/optimize-text` - Optimize text with AI
- `POST /api/banners` - Save banner configuration
- `GET /api/banners/:id` - Get banner configuration
- `PUT /api/banners/:id` - Update banner configuration
- `DELETE /api/banners/:id` - Delete banner
- `POST /api/banners/:id/export` - Export banner (PNG/JPG/SVG)
- `POST /api/media/upload` - Upload media files
- `GET /api/templates` - Get banner templates

### Request/Response Types

All API types are defined in `./types.ts`:

- `BannerConfig` - Main banner configuration
- `AIImageRequest` - AI image generation request
- `AITextRequest` - AI text optimization request
- `BannerContent` - Individual content elements

## Features

### Real-time Preview
- Live preview updates as you make changes
- Responsive column layout
- Background styling preview
- Content positioning and styling

### AI Integration
- **Product Image Generation**: Generate product images from text descriptions
- **Text Optimization**: Enhance copy for better conversion and engagement
- **Style Variations**: Multiple styles for different use cases

### Content Management
- **Multi-column Layout**: Support for 1-3 column layouts
- **Rich Content Types**: Text, images, and AI-generated content
- **Visual Editor**: Inline editing with style controls
- **Content Organization**: Drag-and-drop content management

### Export & Sharing
- **Multiple Formats**: PNG, JPG, SVG export
- **High Quality**: Optimized for web and print
- **Sharing**: Generate shareable links
- **Templates**: Save and reuse banner configurations

## Customization

### Styling
All components use CSS classes that can be customized:
- `corporate-primary`, `corporate-secondary` for brand colors
- `section-secondary`, `page-primary` for backgrounds
- `btn-corporate-primary`, `btn-corporate-outline` for buttons

### Workflow Steps
Modify the workflow steps in `useBannerWorkflow.ts`:

```tsx
const defaultSteps: WorkflowStep[] = [
  // Add, remove, or modify steps as needed
];
```

### AI Services
Replace AI service calls in `bannerApi` with your preferred AI providers.

## Development

### Adding New Content Types
1. Add type to `BannerContent['type']` in `types.ts`
2. Update `ContentEditor` component to handle new type
3. Add rendering logic to `BannerPreview` component

### Adding New Background Types
1. Add type to `BannerConfig['backgroundType']` in `types.ts`
2. Update `BackgroundSelector` component
3. Add rendering logic to `BannerPreview` component

### Adding New Workflow Steps
1. Add step definition to `defaultSteps` in `useBannerWorkflow.ts`
2. Create component for the step
3. Add rendering logic to `WorkflowLeftPanel`

## Testing

The system includes comprehensive TypeScript types and interfaces for testing:

```tsx
import { BannerConfig, useBannerWorkflow } from '@/features/banner';

// Mock banner configuration for testing
const mockBannerConfig: BannerConfig = {
  id: 'test-banner',
  columns: 2,
  backgroundType: 'gradient',
  backgroundValue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  content: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

## Performance Considerations

- **Lazy Loading**: Components are code-split for better performance
- **Memoization**: Preview updates are optimized with React.memo
- **Debouncing**: Text inputs are debounced to prevent excessive API calls
- **Image Optimization**: Images are optimized for web delivery

## Security

- **Input Validation**: All user inputs are validated
- **API Security**: API requests include proper authentication
- **File Upload**: File uploads are restricted by type and size
- **Content Sanitization**: All content is sanitized before rendering 