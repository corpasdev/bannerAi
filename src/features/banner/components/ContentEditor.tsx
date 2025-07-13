import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Type, 
  Image, 
  Plus, 
  Edit3, 
  Trash2, 
  Move, 
  CheckCircle,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline
} from 'lucide-react';
import type { BannerContent, ContentStyle } from '../types';

interface ContentEditorProps {
  content: BannerContent[];
  columns: number;
  onContentUpdate: (content: BannerContent[]) => void;
  isCompleted?: boolean;
}

const defaultTextStyle: ContentStyle = {
  fontSize: '16px',
  fontFamily: 'Inter, sans-serif',
  color: '#27005D',
  textAlign: 'left',
  padding: '8px',
};

const fontSizes = [
  { value: '12px', label: '12px' },
  { value: '14px', label: '14px' },
  { value: '16px', label: '16px' },
  { value: '18px', label: '18px' },
  { value: '20px', label: '20px' },
  { value: '24px', label: '24px' },
  { value: '28px', label: '28px' },
  { value: '32px', label: '32px' },
];

const fontFamilies = [
  { value: 'Inter, sans-serif', label: 'Inter' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  { value: 'Playfair Display, serif', label: 'Playfair Display' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
];

export const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  columns,
  onContentUpdate,
  isCompleted = false,
}) => {
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<BannerContent | null>(null);

  const selectedContent = content.find(c => c.id === selectedContentId);

  const addTextContent = (column: number) => {
    const newContent: BannerContent = {
      id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'text',
      position: {
        column,
        row: 0,
        width: 100,
        height: 40,
      },
      content: 'Nuevo texto',
      style: defaultTextStyle,
    };

    onContentUpdate([...content, newContent]);
    setSelectedContentId(newContent.id);
    setEditingContent(newContent);
  };

  const addImageContent = (column: number) => {
    const newContent: BannerContent = {
      id: `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'image',
      position: {
        column,
        row: 0,
        width: 100,
        height: 100,
      },
      content: '',
      style: {
        padding: '4px',
      },
    };

    onContentUpdate([...content, newContent]);
    setSelectedContentId(newContent.id);
  };

  const updateContent = (contentId: string, updates: Partial<BannerContent>) => {
    const updatedContent = content.map(c => 
      c.id === contentId ? { ...c, ...updates } : c
    );
    onContentUpdate(updatedContent);
  };

  const deleteContent = (contentId: string) => {
    const filteredContent = content.filter(c => c.id !== contentId);
    onContentUpdate(filteredContent);
    setSelectedContentId(null);
    setEditingContent(null);
  };

  const saveContentEdit = () => {
    if (editingContent) {
      updateContent(editingContent.id, editingContent);
      setEditingContent(null);
    }
  };

  const cancelContentEdit = () => {
    setEditingContent(null);
  };

  const getColumnContent = (column: number) => {
    return content.filter(c => c.position.column === column);
  };

  const renderColumnEditor = (column: number) => {
    const columnContent = getColumnContent(column);
    
    return (
      <div key={column} className="flex-1 min-h-[200px] border-2 border-dashed border-corporate-light rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-corporate-secondary">
            Columna {column + 1}
          </span>
          <div className="flex gap-1">
            <Button
              onClick={() => addTextContent(column)}
              className="btn-corporate-outline p-1 w-8 h-8"
            >
              <Type className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => addImageContent(column)}
              className="btn-corporate-outline p-1 w-8 h-8"
            >
              <Image className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          {columnContent.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedContentId === item.id
                  ? 'border-corporate-primary bg-corporate-primary bg-opacity-10'
                  : 'border-corporate-light bg-section-secondary hover:border-corporate-primary'
              }`}
              onClick={() => setSelectedContentId(item.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {item.type === 'text' ? (
                    <Type className="w-4 h-4 text-corporate-secondary" />
                  ) : (
                    <Image className="w-4 h-4 text-corporate-secondary" />
                  )}
                  <span className="text-xs font-medium text-corporate-secondary">
                    {item.type === 'text' ? 'Texto' : 'Imagen'}
                  </span>
                  {item.isAIGenerated && (
                    <div className="px-2 py-1 bg-corporate-primary rounded text-xs text-white">
                      IA
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingContent(item);
                    }}
                    className="btn-corporate-outline p-1 w-6 h-6"
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteContent(item.id);
                    }}
                    className="btn-corporate-outline p-1 w-6 h-6 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-corporate-secondary">
                {item.type === 'text' ? (
                  <div 
                    style={{
                      fontFamily: item.style.fontFamily,
                      fontSize: item.style.fontSize,
                      color: item.style.color,
                      textAlign: item.style.textAlign,
                    }}
                  >
                    {item.content || 'Texto vacío'}
                  </div>
                ) : (
                  <div className="w-full h-16 border border-corporate-light rounded bg-gray-100 flex items-center justify-center">
                    {item.content ? (
                      <img src={item.content} alt="Content" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-xs text-gray-500">Sin imagen</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {columnContent.length === 0 && (
            <div className="text-center py-8 text-corporate-secondary opacity-50">
              <Plus className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs">Añade contenido aquí</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-corporate-secondary flex items-center gap-2">
          <Edit3 className="w-4 h-4" />
          DEFINIR CONTENIDO
        </h3>
        {isCompleted && (
          <CheckCircle className="w-4 h-4 text-green-500" />
        )}
      </div>

      {/* Column Layout */}
      <div className="flex gap-4" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '16px' }}>
        {Array.from({ length: columns }, (_, i) => renderColumnEditor(i))}
      </div>

      {/* Content Editor Modal */}
      {editingContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-page-primary border border-corporate-light rounded-lg p-6 max-w-md w-full mx-4">
            <h4 className="text-lg font-semibold text-corporate-secondary mb-4">
              Editar {editingContent.type === 'text' ? 'Texto' : 'Imagen'}
            </h4>
            
            {editingContent.type === 'text' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-corporate-secondary">Contenido:</label>
                  <textarea
                    value={editingContent.content}
                    onChange={(e) => setEditingContent({
                      ...editingContent,
                      content: e.target.value
                    })}
                    className="w-full mt-1 p-2 border border-corporate-light rounded bg-section-secondary text-corporate-secondary"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-corporate-secondary">Tamaño:</label>
                    <select
                      value={editingContent.style.fontSize}
                      onChange={(e) => setEditingContent({
                        ...editingContent,
                        style: { ...editingContent.style, fontSize: e.target.value }
                      })}
                      className="w-full mt-1 p-2 border border-corporate-light rounded bg-section-secondary text-corporate-secondary"
                    >
                      {fontSizes.map(size => (
                        <option key={size.value} value={size.value}>{size.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-corporate-secondary">Fuente:</label>
                    <select
                      value={editingContent.style.fontFamily}
                      onChange={(e) => setEditingContent({
                        ...editingContent,
                        style: { ...editingContent.style, fontFamily: e.target.value }
                      })}
                      className="w-full mt-1 p-2 border border-corporate-light rounded bg-section-secondary text-corporate-secondary"
                    >
                      {fontFamilies.map(font => (
                        <option key={font.value} value={font.value}>{font.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-corporate-secondary">Color:</label>
                    <input
                      type="color"
                      value={editingContent.style.color}
                      onChange={(e) => setEditingContent({
                        ...editingContent,
                        style: { ...editingContent.style, color: e.target.value }
                      })}
                      className="w-full mt-1 h-10 border border-corporate-light rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-corporate-secondary">Alineación:</label>
                    <div className="flex gap-1 mt-1">
                      <Button
                        onClick={() => setEditingContent({
                          ...editingContent,
                          style: { ...editingContent.style, textAlign: 'left' }
                        })}
                        className={`btn-corporate-outline p-2 flex-1 ${editingContent.style.textAlign === 'left' ? 'bg-corporate-primary text-white' : ''}`}
                      >
                        <AlignLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => setEditingContent({
                          ...editingContent,
                          style: { ...editingContent.style, textAlign: 'center' }
                        })}
                        className={`btn-corporate-outline p-2 flex-1 ${editingContent.style.textAlign === 'center' ? 'bg-corporate-primary text-white' : ''}`}
                      >
                        <AlignCenter className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => setEditingContent({
                          ...editingContent,
                          style: { ...editingContent.style, textAlign: 'right' }
                        })}
                        className={`btn-corporate-outline p-2 flex-1 ${editingContent.style.textAlign === 'right' ? 'bg-corporate-primary text-white' : ''}`}
                      >
                        <AlignRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-corporate-secondary">URL de imagen:</label>
                  <input
                    type="url"
                    value={editingContent.content}
                    onChange={(e) => setEditingContent({
                      ...editingContent,
                      content: e.target.value
                    })}
                    className="w-full mt-1 p-2 border border-corporate-light rounded bg-section-secondary text-corporate-secondary"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                {editingContent.content && (
                  <div>
                    <label className="text-sm font-medium text-corporate-secondary">Vista previa:</label>
                    <div className="mt-1 w-full h-32 border border-corporate-light rounded bg-gray-100 flex items-center justify-center">
                      <img src={editingContent.content} alt="Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex gap-2 mt-6">
              <Button
                onClick={saveContentEdit}
                className="btn-corporate-primary flex-1"
              >
                Guardar
              </Button>
              <Button
                onClick={cancelContentEdit}
                className="btn-corporate-outline flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-corporate-secondary opacity-75 text-center">
        Añade y organiza el contenido de tu banner por columnas
      </div>
    </div>
  );
}; 