import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ContentConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ContentConfig) => void;
}

interface ContentConfig {
  discountValue: string;
  discountType: string;
  productCategory: string;
  disclaimerText: string;
}

const ContentConfigurationModal: React.FC<ContentConfigurationModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [config, setConfig] = useState<ContentConfig>({
    discountValue: '35',
    discountType: 'percentage',
    productCategory: 'farmacia',
    disclaimerText: 'Válido del 10 al 13 de julio del 2025. Aplica referencias seleccionadas.',
  });

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const handleInputChange = (field: keyof ContentConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white shadow-2xl border-0">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Configura el Contenido
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Define los elementos del banner
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Discount Value */}
            <div className="space-y-2">
              <Label htmlFor="discountValue" className="text-sm font-medium text-gray-700">
                Valor del Descuento
              </Label>
              <Input
                id="discountValue"
                type="number"
                value={config.discountValue}
                onChange={(e) => handleInputChange('discountValue', e.target.value)}
                className="w-full bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="35"
              />
            </div>

            {/* Discount Type */}
            <div className="space-y-2">
              <Label htmlFor="discountType" className="text-sm font-medium text-gray-700">
                Tipo
              </Label>
              <Select
                value={config.discountType}
                onValueChange={(value) => handleInputChange('discountType', value)}
              >
                <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Selecciona tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg">
                  <SelectItem value="percentage">Porcentaje (%)</SelectItem>
                  <SelectItem value="fixed">Monto fijo</SelectItem>
                  <SelectItem value="buy_one_get_one">2x1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Category */}
          <div className="space-y-2">
            <Label htmlFor="productCategory" className="text-sm font-medium text-gray-700">
              Categoría de Productos
            </Label>
            <Select
              value={config.productCategory}
              onValueChange={(value) => handleInputChange('productCategory', value)}
            >
              <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Selecciona categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 shadow-lg">
                <SelectItem value="farmacia">Farmacia</SelectItem>
                <SelectItem value="tecnologia">Tecnología</SelectItem>
                <SelectItem value="hogar">Hogar</SelectItem>
                <SelectItem value="ropa">Ropa</SelectItem>
                <SelectItem value="deportes">Deportes</SelectItem>
                <SelectItem value="alimentacion">Alimentación</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Disclaimer Text */}
          <div className="space-y-2">
            <Label htmlFor="disclaimerText" className="text-sm font-medium text-gray-700">
              Texto de Disclaimer
            </Label>
            <Textarea
              id="disclaimerText"
              value={config.disclaimerText}
              onChange={(e) => handleInputChange('disclaimerText', e.target.value)}
              className="min-h-[100px] resize-none bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ingresa el texto del disclaimer..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentConfigurationModal; 