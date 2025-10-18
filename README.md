# Dynamic UI Editor for Customizable Components

A real-time UI editor built with React that lets users **customize furniture product interfaces dynamically** without touching a single line of code. Built as part of a frontend development assignment.

## 🌟 Component API

### **EditorProvider**
Wraps the entire application to provide global state and configuration management.

```tsx
<EditorProvider>
  <App />
</EditorProvider>

**
const {
  config,           
  updateConfig,     
  selectedMaterials
  updateMaterial,   
  exportConfig,     
  importConfig,     
  resetConfig       
} = useEditor();
**

interface UIConfig {
  typography: {
    fontFamily: 'Inter' | 'Poppins' | 'Roboto';
    fontWeight: '300' | '400' | '500' | '600' | '700';
    fontSize: number; // 10-60
  };
  button: {
    borderRadius: number;
    shadow: 'none' | 'small' | 'medium' | 'large';
    alignment: 'left' | 'center' | 'right';
    backgroundColor: string; // HEX color
    textColor: string;       // HEX color
  };
  gallery: {
    alignment: 'grid-left' | 'grid-center' | 'grid-right';
    spacing: number;
    borderRadius: number;
  };
  layout: {
    cardRadius: number;
    padding: number;
    backgroundColor: string; // HEX color
  };
  stroke: {
    color: string; // HEX color
    weight: number;
  };


---


  layoutType: 'desktop' | 'mobile';
}


### How the Editor Works

Context-Based State Management

EditorContext stores all configuration and selected material state.

Any component consuming the context automatically updates when state changes.

Real-Time Rendering

Changes in typography, button styling, or layout are reflected immediately using React state updates.

Framer Motion handles smooth animations for transitions and layout changes.

Component Isolation

ProductViewer: Displays the furniture product with zoom & interaction.

CustomizationPanel: Handles material, color, typography, button, gallery, and layout settings.

EditorControls: Manages layout switching, import/export, and reset functionality.

Configuration Import/Export

Users can save the current UI configuration as JSON or load a saved configuration.

Supports sharing setups and version control for UI designs.



### UX Improvements & Additional Customizations

1. Visual Material Swatches: Quickly pick colors for different materials.

2. Expandable Panels: Accordion-style sections organize options for better usability.

Real-Time Validation: Sliders and inputs enforce min/max constraints.

Responsive Layouts: Desktop vs. mobile views with automatic re-rendering.

Toast Notifications: Feedback for import/export and reset actions.

Zoom & Gesture Support: ProductViewer includes zoom controls and smooth interactions.

Accessible & Semantic HTML: Focused on keyboard navigation and accessibility.

