import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Maximize2, ZoomIn, ZoomOut, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';
import furnitureMain from '@/assets/furniture-main.png';
import furnitureThumb from '@/assets/furniture-thumb.png';

export const ProductViewer = () => {
  const { config, selectedMaterials } = useEditor();
  const [zoom, setZoom] = useState(1);
  const [showDetails, setShowDetails] = useState(config.layoutType === 'mobile');
  
  const images = [furnitureThumb, furnitureThumb, furnitureThumb, furnitureThumb, furnitureThumb, furnitureThumb];
  
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));
  
  const isMobile = config.layoutType === 'mobile';

  return (
    <div 
      className="flex-1 flex flex-col h-full"
      style={{ backgroundColor: config.layout.backgroundColor }}
    >
      {/* Controls */}
      <div className="flex items-center justify-between p-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm hover:bg-accent transition-smooth"
        >
          <ImageIcon className="w-4 h-4" />
          View photos
        </motion.button>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg border border-border bg-card hover:bg-accent transition-smooth"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg border border-border bg-card hover:bg-accent transition-smooth"
          >
            <Maximize2 className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleZoomIn}
            className="p-2 rounded-lg border border-border bg-card hover:bg-accent transition-smooth"
          >
            <ZoomIn className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleZoomOut}
            className="p-2 rounded-lg border border-border bg-card hover:bg-accent transition-smooth"
          >
            <ZoomOut className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Main Product Image */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-8">
        <motion.div
          animate={{ scale: zoom }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative"
        >
          <img
            src={furnitureMain}
            alt="Cozy Longe chair"
            className="max-w-full max-h-full object-contain"
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))',
            }}
          />
        </motion.div>
      </div>

      {/* Image Gallery */}
      {!isMobile && (
        <div 
          className="px-8 pb-8"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${images.length}, 1fr)`,
            gap: `${config.gallery.spacing}px`,
            justifyContent: config.gallery.alignment.replace('grid-', ''),
          }}
        >
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer overflow-hidden bg-white shadow-card"
              style={{ borderRadius: `${config.gallery.borderRadius}px` }}
            >
              <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Mobile Bottom Sheet */}
      {isMobile && (
        <motion.div
          initial={false}
          animate={{ y: showDetails ? 0 : '70%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative bg-card rounded-t-3xl shadow-xl"
          style={{
            borderRadius: `${config.layout.cardRadius}px ${config.layout.cardRadius}px 0 0`,
            padding: `${config.layout.padding}px`,
          }}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(!showDetails)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-accent transition-smooth"
          >
            <motion.div
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>

          <div className="space-y-4">
            <div>
              <h2 
                className="font-semibold text-foreground"
                style={{
                  fontFamily: config.typography.fontFamily,
                  fontWeight: config.typography.fontWeight,
                  fontSize: `${Math.min(config.typography.fontSize * 1.5, 32)}px`,
                }}
              >
                Cozy Longe chair
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">AR available</span>
              </div>
            </div>

            <div className="h-1 bg-muted rounded-full" />

            <p 
              className="text-muted-foreground"
              style={{
                fontFamily: config.typography.fontFamily,
                fontWeight: config.typography.fontWeight,
                fontSize: `${config.typography.fontSize}px`,
              }}
            >
              Customize your Chair
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
