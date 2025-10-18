import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UIConfig, defaultConfig, MaterialOption } from '@/types/editor';

interface EditorContextType {
  config: UIConfig;
  updateConfig: (updates: Partial<UIConfig>) => void;
  selectedMaterials: {
    arms: string;
    armsFinish: string;
    legsFinish: string;
  };
  updateMaterial: (section: 'arms' | 'armsFinish' | 'legsFinish', materialId: string) => void;
  exportConfig: () => string;
  importConfig: (jsonString: string) => void;
  resetConfig: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<UIConfig>(defaultConfig);
  const [selectedMaterials, setSelectedMaterials] = useState({
    arms: 'arms-fixed',
    armsFinish: 'leather-red',
    legsFinish: 'aluminum-steel',
  });

  const updateConfig = (updates: Partial<UIConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...updates,
      typography: { ...prev.typography, ...(updates.typography || {}) },
      button: { ...prev.button, ...(updates.button || {}) },
      gallery: { ...prev.gallery, ...(updates.gallery || {}) },
      layout: { ...prev.layout, ...(updates.layout || {}) },
      stroke: { ...prev.stroke, ...(updates.stroke || {}) },
    }));
  };

  const updateMaterial = (section: 'arms' | 'armsFinish' | 'legsFinish', materialId: string) => {
    setSelectedMaterials((prev) => ({ ...prev, [section]: materialId }));
  };

  const exportConfig = () => {
    return JSON.stringify({ config, selectedMaterials }, null, 2);
  };

  const importConfig = (jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString);
      if (imported.config) setConfig(imported.config);
      if (imported.selectedMaterials) setSelectedMaterials(imported.selectedMaterials);
    } catch (error) {
      console.error('Invalid JSON configuration', error);
    }
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    setSelectedMaterials({
      arms: 'arms-fixed',
      armsFinish: 'leather-red',
      legsFinish: 'aluminum-steel',
    });
  };

  return (
    <EditorContext.Provider
      value={{
        config,
        updateConfig,
        selectedMaterials,
        updateMaterial,
        exportConfig,
        importConfig,
        resetConfig,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return context;
};
