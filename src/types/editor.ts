export type FontFamily = 'Inter' | 'Poppins' | 'Roboto';
export type FontWeight = '300' | '400' | '500' | '600' | '700';
export type ButtonShadow = 'none' | 'small' | 'medium' | 'large';
export type Alignment = 'left' | 'center' | 'right';
export type GalleryAlignment = 'grid-left' | 'grid-center' | 'grid-right';
export type LayoutType = 'desktop' | 'mobile';

export interface TypographyConfig {
  fontFamily: FontFamily;
  fontWeight: FontWeight;
  fontSize: number; // 10-60px
}

export interface ButtonConfig {
  borderRadius: number;
  shadow: ButtonShadow;
  alignment: Alignment;
  backgroundColor: string;
  textColor: string;
}

export interface GalleryConfig {
  alignment: GalleryAlignment;
  spacing: number;
  borderRadius: number;
}

export interface LayoutConfig {
  cardRadius: number;
  padding: number;
  backgroundColor: string;
}

export interface StrokeConfig {
  color: string;
  weight: number;
}

export interface UIConfig {
  typography: TypographyConfig;
  button: ButtonConfig;
  gallery: GalleryConfig;
  layout: LayoutConfig;
  stroke: StrokeConfig;
  layoutType: LayoutType;
}

export const defaultConfig: UIConfig = {
  typography: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    shadow: 'medium',
    alignment: 'center',
    backgroundColor: '#C97456',
    textColor: '#FFFFFF',
  },
  gallery: {
    alignment: 'grid-left',
    spacing: 12,
    borderRadius: 8,
  },
  layout: {
    cardRadius: 12,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  stroke: {
    color: '#E5E5E5',
    weight: 1,
  },
  layoutType: 'desktop',
};

export interface MaterialOption {
  id: string;
  name: string;
  category: string;
  color: string;
}

export const materialOptions: MaterialOption[] = [
  // LEATHER
  { id: 'leather-red', name: 'Red', category: 'LEATHER', color: '#8B4A4A' },
  { id: 'leather-olive', name: 'Olive', category: 'LEATHER', color: '#6B7456' },
  { id: 'leather-purple', name: 'Purple', category: 'LEATHER', color: '#6B5B7B' },
  { id: 'leather-green', name: 'Green', category: 'LEATHER', color: '#5A6B5A' },
  { id: 'leather-teal', name: 'Teal', category: 'LEATHER', color: '#3A7A7A' },
  { id: 'leather-maroon', name: 'Maroon', category: 'LEATHER', color: '#6B3A3A' },
  { id: 'leather-plum', name: 'Plum', category: 'LEATHER', color: '#6B4A7B' },
  { id: 'leather-blue', name: 'Blue', category: 'LEATHER', color: '#4A6B8B' },
  { id: 'leather-rust', name: 'Rust', category: 'LEATHER', color: '#A45A52' },
  
  // SILICON
  { id: 'silicon-teal', name: 'Teal', category: 'SILICON', color: '#2A6A6A' },
  { id: 'silicon-rust', name: 'Rust', category: 'SILICON', color: '#A44A42' },
  { id: 'silicon-purple', name: 'Purple', category: 'SILICON', color: '#6B4A8B' },
  { id: 'silicon-blue', name: 'Blue', category: 'SILICON', color: '#3A5A8B' },
  { id: 'silicon-maroon', name: 'Maroon', category: 'SILICON', color: '#7B3A3A' },
  { id: 'silicon-olive', name: 'Olive', category: 'SILICON', color: '#6B7A5A' },
  
  // ALUMINUM
  { id: 'aluminum-steel', name: 'Steel', category: 'ALUMINUM', color: '#9A9A9A' },
  { id: 'aluminum-bronze', name: 'Bronze', category: 'ALUMINUM', color: '#CD7F32' },
  { id: 'aluminum-silver', name: 'Silver', category: 'ALUMINUM', color: '#C0C0C0' },
];
