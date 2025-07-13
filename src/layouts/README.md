# Layouts Directory

This directory contains the layout components for the promotional banner creation tool.

## Structure

### `BannerEditorLayout.tsx`
Main layout component that orchestrates the three-panel interface:
- **Left Panel**: Styles and colors configuration
- **Central Area**: Banner design workspace  
- **Right Panel**: Functionality controls and export options

### `LeftPanel.tsx`
Contains:
- **Select Background Section**: Gradient, Solid, and Image options
- **Add Content Button**: For adding text or images to the banner

### `CentralArea.tsx`
Features:
- **Banner Design Area**: Large workspace for viewing and editing banners
- **Improve AI Button**: AI-powered design enhancement tool

### `RightPanel.tsx`
Includes:
- **Export Button**: Export the final banner
- **Choose Columns Section**: Select 1, 2, or 3 column layouts
- **Templates Section**: Pre-designed layout templates

## Usage

```typescript
import { BannerEditorLayout } from '@/layouts';

function App() {
  return <BannerEditorLayout />;
}
```

## Dependencies

- ShadCN UI components (Button, Card, Separator)
- Lucide React icons
- Tailwind CSS for styling 