import React, { useState } from 'react';
import { Wand2, Sparkles, Loader2 } from 'lucide-react';
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

interface AIProductGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (config: ProductGenerationConfig) => void;
}

interface ProductGenerationConfig {
  productName: string;
  productCategory: string;
  style: string;
  description: string;
  specifications: string;
  imageStyle: string;
  backgroundColor: string;
}

const AIProductGeneratorModal: React.FC<AIProductGeneratorModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
}) => {
  const [config, setConfig] = useState<ProductGenerationConfig>({
    productName: '',
    productCategory: 'electronics',
    style: 'modern',
    description: '',
    specifications: '',
    imageStyle: 'realistic',
    backgroundColor: 'transparent',
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!config.productName.trim() || !config.description.trim()) {
      return;
    }

    setIsGenerating(true);
    try {
      await onGenerate(config);
      onClose();
    } catch (error) {
      console.error('Error generating product:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (field: keyof ProductGenerationConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    if (!isGenerating) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-white shadow-2xl border-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Generate Product with AI
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Describe your product and let AI create it for you
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {/* Product Name and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName" className="text-sm font-medium text-gray-700">
                Product Name
              </Label>
              <Input
                id="productName"
                type="text"
                value={config.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                className="w-full bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                placeholder="e.g., Wireless Headphones"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productCategory" className="text-sm font-medium text-gray-700">
                Category
              </Label>
              <Select
                value={config.productCategory}
                onValueChange={(value) => handleInputChange('productCategory', value)}
              >
                <SelectTrigger className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg">
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="food">Food & Beverages</SelectItem>
                  <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="sports">Sports & Outdoors</SelectItem>
                  <SelectItem value="books">Books & Media</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                  <SelectItem value="health">Health & Wellness</SelectItem>
                  <SelectItem value="toys">Toys & Games</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Style and Image Style */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="style" className="text-sm font-medium text-gray-700">
                Product Style
              </Label>
              <Select
                value={config.style}
                onValueChange={(value) => handleInputChange('style', value)}
              >
                <SelectTrigger className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg">
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="futuristic">Futuristic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageStyle" className="text-sm font-medium text-gray-700">
                Image Style
              </Label>
              <Select
                value={config.imageStyle}
                onValueChange={(value) => handleInputChange('imageStyle', value)}
              >
                <SelectTrigger className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                  <SelectValue placeholder="Select image style" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg">
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="artistic">Artistic</SelectItem>
                  <SelectItem value="illustration">Illustration</SelectItem>
                  <SelectItem value="3d_render">3D Render</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="cartoon">Cartoon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Background Color */}
          <div className="space-y-2">
            <Label htmlFor="backgroundColor" className="text-sm font-medium text-gray-700">
              Background
            </Label>
            <Select
              value={config.backgroundColor}
              onValueChange={(value) => handleInputChange('backgroundColor', value)}
            >
              <SelectTrigger className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                <SelectValue placeholder="Select background" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 shadow-lg">
                <SelectItem value="transparent">Transparent</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
                <SelectItem value="studio">Studio Setup</SelectItem>
                <SelectItem value="natural">Natural Environment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Product Description
            </Label>
            <Textarea
              id="description"
              value={config.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[100px] resize-none bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Describe your product in detail. Include appearance, features, colors, materials, etc."
            />
          </div>

          {/* Specifications */}
          <div className="space-y-2">
            <Label htmlFor="specifications" className="text-sm font-medium text-gray-700">
              Specifications (Optional)
            </Label>
            <Textarea
              id="specifications"
              value={config.specifications}
              onChange={(e) => handleInputChange('specifications', e.target.value)}
              className="min-h-[80px] resize-none bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Technical specifications, dimensions, materials, colors, etc."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isGenerating}
            className="px-6 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={!config.productName.trim() || !config.description.trim() || isGenerating}
            className="px-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Product
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIProductGeneratorModal; 