import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sliders } from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';
import { materialOptions } from '@/types/editor';
import { Button } from '@/components/ui/button';

export const CustomizationPanel = () => {
  const { config, selectedMaterials, updateMaterial } = useEditor();
  const [expandedSection, setExpandedSection] = useState<string>('armsFinish');
  
  const isMobile = config.layoutType === 'mobile';

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const getSectionIcon = (section: string) => {
    if (section === 'arms') return '🪑';
    if (section === 'armsFinish') return '🎨';
    if (section === 'legsFinish') return '⚙️';
    return '';
  };

  const getSectionTitle = (section: string) => {
    if (section === 'arms') return '1. Arms';
    if (section === 'armsFinish') return '2. Arms Finish';
    if (section === 'legsFinish') return '3. Legs Finish';
    return '';
  };

  const getSectionSubtitle = (section: string) => {
    if (section === 'arms') return 'Fixed Arms';
    if (section === 'armsFinish') return 'Leather Brown';
    if (section === 'legsFinish') return 'Steel';
    return '';
  };

  return (
    <div 
      className="h-full flex flex-col bg-card overflow-hidden"
      style={{
        borderRadius: `${config.layout.cardRadius}px`,
        borderColor: config.stroke.color,
        borderWidth: `${config.stroke.weight}px`,
      }}
    >
      {/* Header */}
      <div 
        className="border-b"
        style={{
          padding: `${config.layout.padding}px`,
          borderColor: config.stroke.color,
        }}
      >
        <h2 
          className="font-semibold text-foreground"
          style={{
            fontFamily: config.typography.fontFamily,
            fontWeight: config.typography.fontWeight,
            fontSize: `${Math.min(config.typography.fontSize * 1.5, 28)}px`,
          }}
        >
          Cozy Longe chair
        </h2>
        
        <div className="flex items-center justify-between mt-4">
          <p 
            className="text-muted-foreground flex items-center gap-2"
            style={{
              fontFamily: config.typography.fontFamily,
              fontWeight: config.typography.fontWeight,
              fontSize: `${config.typography.fontSize}px`,
            }}
          >
            <Sliders className="w-4 h-4" />
            Customize your Chair
          </p>
        </div>
      </div>

      {/* Customization Sections */}
      <div className="flex-1 overflow-y-auto" style={{ padding: `${config.layout.padding}px` }}>
        <div className="space-y-3">
          {['arms', 'armsFinish', 'legsFinish'].map((section) => (
            <motion.div
              key={section}
              className="rounded-lg overflow-hidden border bg-card"
              style={{
                borderRadius: `${config.layout.cardRadius}px`,
                borderColor: config.stroke.color,
                borderWidth: `${config.stroke.weight}px`,
              }}
            >
              <motion.button
                onClick={() => toggleSection(section)}
                className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-smooth"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                    {getSectionIcon(section)}
                  </div>
                  <div className="text-left">
                    <p 
                      className="font-medium"
                      style={{
                        fontFamily: config.typography.fontFamily,
                        fontSize: `${config.typography.fontSize}px`,
                      }}
                    >
                      {getSectionTitle(section)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getSectionSubtitle(section)}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedSection === section ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedSection === section && section === 'armsFinish' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t" style={{ borderColor: config.stroke.color }}>
                      {['LEATHER', 'SILICON', 'ALUMINUM'].map((category) => (
                        <div key={category} className="mb-4">
                          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                            {category}
                          </p>
                          <div className="grid grid-cols-5 gap-2">
                            {materialOptions
                              .filter((m) => m.category === category)
                              .map((material) => (
                                <motion.button
                                  key={material.id}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => updateMaterial('armsFinish', material.id)}
                                  className="aspect-square rounded-full border-2 transition-smooth"
                                  style={{
                                    backgroundColor: material.color,
                                    borderColor: selectedMaterials.armsFinish === material.id 
                                      ? config.button.backgroundColor 
                                      : 'transparent',
                                    borderWidth: selectedMaterials.armsFinish === material.id ? '3px' : '2px',
                                  }}
                                  title={material.name}
                                />
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div 
        className="border-t mt-auto"
        style={{
          padding: `${config.layout.padding}px`,
          borderColor: config.stroke.color,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Product Price</p>
            <div className="flex items-baseline gap-2">
              <span 
                className="font-bold"
                style={{
                  fontFamily: config.typography.fontFamily,
                  fontSize: `${config.typography.fontSize * 1.5}px`,
                }}
              >
                $ 200
              </span>
              <span className="text-sm text-muted-foreground line-through">$ 245</span>
            </div>
          </div>
          
          <Button
            className="transition-smooth"
            style={{
              borderRadius: `${config.button.borderRadius}px`,
              backgroundColor: config.button.backgroundColor,
              color: config.button.textColor,
              boxShadow: config.button.shadow === 'none' ? 'none' :
                         config.button.shadow === 'small' ? '0 1px 2px rgba(0,0,0,0.1)' :
                         config.button.shadow === 'medium' ? '0 4px 6px rgba(0,0,0,0.1)' :
                         '0 10px 15px rgba(0,0,0,0.15)',
              fontFamily: config.typography.fontFamily,
              fontWeight: config.typography.fontWeight,
              fontSize: `${config.typography.fontSize}px`,
              textAlign: config.button.alignment,
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};
