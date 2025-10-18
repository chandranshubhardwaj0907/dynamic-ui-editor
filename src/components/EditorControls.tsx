import { useState } from 'react';
import { motion } from 'framer-motion';
import { Type, Square, Image, Layout, Pen, Download, Upload, RotateCcw, Monitor, Smartphone } from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export const EditorControls = () => {
  const { config, updateConfig, exportConfig, importConfig, resetConfig } = useEditor();
  const [activeTab, setActiveTab] = useState('typography');

  const handleExport = () => {
    const configJson = exportConfig();
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ui-config.json';
    a.click();
    toast.success('Configuration exported successfully!');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const json = event.target?.result as string;
        importConfig(json);
        toast.success('Configuration imported successfully!');
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    resetConfig();
    toast.success('Configuration reset to default!');
  };

  const toggleLayout = () => {
    updateConfig({ 
      layoutType: config.layoutType === 'desktop' ? 'mobile' : 'desktop' 
    });
  };

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--editor-panel))] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold mb-2">UI Editor</h2>
        <p className="text-sm text-muted-foreground">
          Customize every aspect of your design
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button
            onClick={toggleLayout}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            {config.layoutType === 'desktop' ? (
              <><Smartphone className="w-4 h-4 mr-2" /> Mobile</>
            ) : (
              <><Monitor className="w-4 h-4 mr-2" /> Desktop</>
            )}
          </Button>
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => document.getElementById('import-config')?.click()}
            variant="outline"
            size="sm"
          >
            <Upload className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <input
            id="import-config"
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full grid grid-cols-5 p-2">
          <TabsTrigger value="typography" className="text-xs">
            <Type className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="button" className="text-xs">
            <Square className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="gallery" className="text-xs">
            <Image className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="layout" className="text-xs">
            <Layout className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="stroke" className="text-xs">
            <Pen className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Typography */}
          <TabsContent value="typography" className="mt-0 space-y-6">
            <div className="space-y-3">
              <Label>Font Family</Label>
              <Select
                value={config.typography.fontFamily}
                onValueChange={(value) => updateConfig({ typography: { ...config.typography, fontFamily: value as any } })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Poppins">Poppins</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Font Weight</Label>
              <Select
                value={config.typography.fontWeight}
                onValueChange={(value) => updateConfig({ typography: { ...config.typography, fontWeight: value as any } })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">Light (300)</SelectItem>
                  <SelectItem value="400">Regular (400)</SelectItem>
                  <SelectItem value="500">Medium (500)</SelectItem>
                  <SelectItem value="600">Semibold (600)</SelectItem>
                  <SelectItem value="700">Bold (700)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Font Size</Label>
                <span className="text-sm text-muted-foreground">{config.typography.fontSize}px</span>
              </div>
              <Slider
                value={[config.typography.fontSize]}
                onValueChange={([value]) => updateConfig({ typography: { ...config.typography, fontSize: value } })}
                min={10}
                max={60}
                step={1}
              />
            </div>
          </TabsContent>

          {/* Button */}
          <TabsContent value="button" className="mt-0 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Border Radius</Label>
                <span className="text-sm text-muted-foreground">{config.button.borderRadius}px</span>
              </div>
              <Slider
                value={[config.button.borderRadius]}
                onValueChange={([value]) => updateConfig({ button: { ...config.button, borderRadius: value } })}
                min={0}
                max={50}
                step={1}
              />
            </div>

            <div className="space-y-3">
              <Label>Shadow</Label>
              <Select
                value={config.button.shadow}
                onValueChange={(value) => updateConfig({ button: { ...config.button, shadow: value as any } })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Alignment</Label>
              <Select
                value={config.button.alignment}
                onValueChange={(value) => updateConfig({ button: { ...config.button, alignment: value as any } })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={config.button.backgroundColor}
                  onChange={(e) => updateConfig({ button: { ...config.button, backgroundColor: e.target.value } })}
                  className="w-16 h-10 cursor-pointer"
                />
                <Input
                  type="text"
                  value={config.button.backgroundColor}
                  onChange={(e) => updateConfig({ button: { ...config.button, backgroundColor: e.target.value } })}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Text Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={config.button.textColor}
                  onChange={(e) => updateConfig({ button: { ...config.button, textColor: e.target.value } })}
                  className="w-16 h-10 cursor-pointer"
                />
                <Input
                  type="text"
                  value={config.button.textColor}
                  onChange={(e) => updateConfig({ button: { ...config.button, textColor: e.target.value } })}
                  className="flex-1"
                />
              </div>
            </div>
          </TabsContent>

          {/* Gallery */}
          <TabsContent value="gallery" className="mt-0 space-y-6">
            <div className="space-y-3">
              <Label>Alignment</Label>
              <Select
                value={config.gallery.alignment}
                onValueChange={(value) => updateConfig({ gallery: { ...config.gallery, alignment: value as any } })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid-left">Grid Left</SelectItem>
                  <SelectItem value="grid-center">Grid Center</SelectItem>
                  <SelectItem value="grid-right">Grid Right</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Spacing</Label>
                <span className="text-sm text-muted-foreground">{config.gallery.spacing}px</span>
              </div>
              <Slider
                value={[config.gallery.spacing]}
                onValueChange={([value]) => updateConfig({ gallery: { ...config.gallery, spacing: value } })}
                min={0}
                max={48}
                step={4}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Border Radius</Label>
                <span className="text-sm text-muted-foreground">{config.gallery.borderRadius}px</span>
              </div>
              <Slider
                value={[config.gallery.borderRadius]}
                onValueChange={([value]) => updateConfig({ gallery: { ...config.gallery, borderRadius: value } })}
                min={0}
                max={50}
                step={1}
              />
            </div>
          </TabsContent>

          {/* Layout */}
          <TabsContent value="layout" className="mt-0 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Card Radius</Label>
                <span className="text-sm text-muted-foreground">{config.layout.cardRadius}px</span>
              </div>
              <Slider
                value={[config.layout.cardRadius]}
                onValueChange={([value]) => updateConfig({ layout: { ...config.layout, cardRadius: value } })}
                min={0}
                max={50}
                step={1}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Padding</Label>
                <span className="text-sm text-muted-foreground">{config.layout.padding}px</span>
              </div>
              <Slider
                value={[config.layout.padding]}
                onValueChange={([value]) => updateConfig({ layout: { ...config.layout, padding: value } })}
                min={8}
                max={64}
                step={4}
              />
            </div>

            <div className="space-y-3">
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={config.layout.backgroundColor}
                  onChange={(e) => updateConfig({ layout: { ...config.layout, backgroundColor: e.target.value } })}
                  className="w-16 h-10 cursor-pointer"
                />
                <Input
                  type="text"
                  value={config.layout.backgroundColor}
                  onChange={(e) => updateConfig({ layout: { ...config.layout, backgroundColor: e.target.value } })}
                  className="flex-1"
                />
              </div>
            </div>
          </TabsContent>

          {/* Stroke */}
          <TabsContent value="stroke" className="mt-0 space-y-6">
            <div className="space-y-3">
              <Label>Stroke Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={config.stroke.color}
                  onChange={(e) => updateConfig({ stroke: { ...config.stroke, color: e.target.value } })}
                  className="w-16 h-10 cursor-pointer"
                />
                <Input
                  type="text"
                  value={config.stroke.color}
                  onChange={(e) => updateConfig({ stroke: { ...config.stroke, color: e.target.value } })}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Stroke Weight</Label>
                <span className="text-sm text-muted-foreground">{config.stroke.weight}px</span>
              </div>
              <Slider
                value={[config.stroke.weight]}
                onValueChange={([value]) => updateConfig({ stroke: { ...config.stroke, weight: value } })}
                min={0}
                max={10}
                step={1}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
