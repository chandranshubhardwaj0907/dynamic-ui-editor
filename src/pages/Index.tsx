import { EditorProvider, useEditor } from '@/contexts/EditorContext';
import { ProductViewer } from '@/components/ProductViewer';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { EditorControls } from '@/components/EditorControls';
import { motion } from 'framer-motion';

const EditorLayout = () => {
  const { config } = useEditor();
  const isMobile = config.layoutType === 'mobile';

  if (isMobile) {
    return (
      <div className="min-h-screen bg-[hsl(var(--editor-bg))] flex flex-col">
        <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
          {/* Left: Editor Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80 shrink-0"
          >
            <EditorControls />
          </motion.div>

          {/* Center: Mobile View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="w-full max-w-md">
              <div className="bg-card rounded-3xl shadow-2xl overflow-hidden" style={{ height: '80vh' }}>
                <div className="h-full flex flex-col">
                  <div className="flex-1 overflow-hidden">
                    <ProductViewer />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Customization Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-96 shrink-0"
          >
            <CustomizationPanel />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--editor-bg))] flex flex-col">
      <div className="flex-1 flex gap-6 p-6">
        {/* Left: Editor Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 shrink-0"
        >
          <EditorControls />
        </motion.div>

        {/* Center: Desktop View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-card rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="h-full flex">
            <div className="flex-1">
              <ProductViewer />
            </div>
            <div className="w-96 border-l border-border">
              <CustomizationPanel />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <EditorProvider>
      <EditorLayout />
    </EditorProvider>
  );
};

export default Index;
