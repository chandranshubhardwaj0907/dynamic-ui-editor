# Dynamic UI Editor for Customizable Components

A powerful, real-time UI editor built with React that allows users to customize furniture product interfaces dynamically without touching code. Built for the frontend development assignment.

![Dynamic UI Editor](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-blue) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.0-purple)

## 🌟 Features

### ✨ Core Features
- **Real-time Live Preview** - All changes update instantly
- **Layout Switching** - Toggle between Desktop and Mobile layouts
- **Export/Import Configuration** - Save and load UI configurations as JSON
- **Reset Functionality** - Quick reset to default settings
- **Responsive Design** - Works flawlessly on all screen sizes

### 🎨 Customizable Elements

#### Typography
- Font Family (Inter, Poppins, Roboto)
- Font Weight (300-700)
- Font Size (10px - 60px with slider control)

#### Button Styling
- Border Radius (0-50px)
- Shadow (None, Small, Medium, Large)
- Alignment (Left, Center, Right)
- Background Color (HEX/RGB color picker)
- Text Color (HEX/RGB color picker)

#### Gallery/Images
- Gallery Alignment (Grid Left, Center, Right)
- Spacing between images (0-48px)
- Image border radius (0-50px)

#### General Layout
- Card Corner Radius (0-50px)
- Container Padding (8-64px)
- Section Background Color (full color picker)

#### Stroke/Border
- Stroke Color (HEX/RGB picker)
- Stroke Weight (0-10px)

### 🛋️ Product Customization
- Material Selection (Leather, Silicon, Aluminum)
- Color variations for each material type
- Expandable customization sections
- Visual material swatches
- Real-time price display

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd <project-name>

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── assets/                 # Generated furniture images
│   ├── furniture-main.png
│   └── furniture-thumb.png
├── components/
│   ├── ui/                # shadcn UI components
│   ├── ProductViewer.tsx  # Main product display with zoom/controls
│   ├── CustomizationPanel.tsx  # Material & product customization
│   └── EditorControls.tsx # UI editor control panel
├── contexts/
│   └── EditorContext.tsx  # Global state management
├── types/
│   └── editor.ts          # TypeScript definitions
├── pages/
│   └── Index.tsx          # Main application layout
└── index.css              # Design system & custom styles
```

## 🎯 Component API

### EditorProvider

Wraps the entire application to provide global state management.

```tsx
<EditorProvider>
  <YourApp />
</EditorProvider>
```

### useEditor Hook

Access and modify UI configuration:

```tsx
const {
  config,           // Current UI configuration
  updateConfig,     // Update configuration
  selectedMaterials, // Current material selections
  updateMaterial,   // Update material selection
  exportConfig,     // Export as JSON string
  importConfig,     // Import from JSON string
  resetConfig       // Reset to defaults
} = useEditor();
```

### Configuration Object Structure

```typescript
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
    textColor: string; // HEX color
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
  layoutType: 'desktop' | 'mobile';
}
```

## 🎨 Design System

The project uses a carefully crafted design system with semantic tokens defined in `src/index.css`:

### Color Tokens
- `--primary`, `--secondary`, `--accent` - Main brand colors
- `--brown-leather`, `--terracotta` - Product-specific colors
- `--editor-bg`, `--editor-panel` - Editor interface colors

### Shadows
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` - Elevation system

### Transitions
- `--transition-smooth` - Standard easing
- `--transition-bounce` - Playful animations

### Typography
- `--font-inter` - UI elements
- `--font-poppins` - Headings

## 🔧 How It Works

### Editor Architecture

1. **Context-Based State Management**: The `EditorContext` manages all UI configuration state globally, ensuring consistency across components.

2. **Real-Time Updates**: All changes trigger immediate re-renders through React's state system, providing instant visual feedback.

3. **Component Isolation**: Each major feature (Product Viewer, Customization Panel, Editor Controls) is isolated in its own component for maintainability.

4. **Type Safety**: Full TypeScript support ensures configuration validity and prevents runtime errors.

### Layout Switching

The editor supports two distinct layouts:

- **Desktop Layout**: Side-by-side product view and customization panel
- **Mobile Layout**: Stacked layout with bottom sheet for details

Switching is handled by updating the `layoutType` in the configuration, which triggers conditional rendering throughout the app.

### Configuration Export/Import

Users can:
1. Export current configuration as JSON file
2. Import previously saved configurations
3. Share configurations across teams
4. Version control UI designs

## 🎭 Design Decisions

### Why Framer Motion?
- Smooth, physics-based animations
- Gesture support for interactive elements
- Layout animations for dynamic UI changes
- Better developer experience than CSS animations

### Component Architecture
- **Small, focused components** for better reusability
- **Composition over inheritance** for flexibility
- **Controlled components** for predictable state management

### Design Philosophy
- **Professional & Clean**: Modern furniture e-commerce aesthetic
- **Warm Earth Tones**: Browns, terracotta, and neutrals
- **Smooth Interactions**: Polished animations and transitions
- **Accessibility First**: Semantic HTML and keyboard navigation

### UX Improvements Beyond Requirements

1. **Visual Material Swatches**: Color circles for quick material selection
2. **Expandable Sections**: Accordion-style customization for better organization
3. **Real-Time Validation**: Min/max constraints prevent invalid configurations
4. **Toast Notifications**: User feedback for import/export actions
5. **Zoom Controls**: Enhanced product viewing experience
6. **Smooth Animations**: Framer Motion for professional feel
7. **Responsive Grid**: Automatic layout adjustments
8. **Color Picker Integration**: Native color input + text field for precision

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Deploy to Lovable

Simply click the **Publish** button in the Lovable interface to deploy your app.

## 🧪 Testing

The application has been tested for:
- ✅ Real-time configuration updates
- ✅ Layout switching (Desktop ↔ Mobile)
- ✅ Export/Import functionality
- ✅ Material selection
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Browser compatibility (Chrome, Firefox, Safari, Edge)
- ✅ TypeScript type safety

## 🎓 Technologies Used

- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icons
- **React Router** - Navigation
- **Vite** - Build tool & dev server

## 📝 Future Enhancements

Potential additions for future versions:
- [ ] Undo/Redo functionality
- [ ] Configuration presets/themes
- [ ] A/B testing different configurations
- [ ] Collaborative editing
- [ ] 3D product model integration
- [ ] AR preview functionality
- [ ] More material categories
- [ ] Custom font upload
- [ ] Advanced animation controls
- [ ] Keyboard shortcuts

## 📄 License

This project is part of a frontend development assignment.

## 🤝 Contributing

This is an assignment project, but feedback and suggestions are welcome!

---

**Built with ❤️ using Lovable**
#   d y n a m i c - u i - e d i t o r  
 