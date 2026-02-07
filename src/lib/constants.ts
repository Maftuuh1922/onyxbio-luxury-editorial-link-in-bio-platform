import {
  Globe, Instagram, Mail, Twitter, Youtube, Linkedin,
  ShoppingBag, Camera, Music, Video, MapPin,
  Link as LinkIcon, Heart, Star, Briefcase, Zap,
  Send, MessageCircle, Phone, Github, Figma,
  Twitch, Slack, Dribbble, ExternalLink,
  Smartphone, User, MessageSquare, Code, Layout, Palette
} from 'lucide-react';
import { Appearance } from '@/store/useProfile';
export const SYSTEM_FONTS = [
  { id: 'arial', name: 'Arial', family: 'Arial, sans-serif' },
  { id: 'georgia', name: 'Georgia', family: 'Georgia, serif' },
  { id: 'times', name: 'Times New Roman', family: '"Times New Roman", serif' },
  { id: 'courier', name: 'Courier New', family: '"Courier New", monospace' },
];
export const GOOGLE_FONTS = [
  { id: 'inter', name: 'Inter', family: '"Inter", sans-serif' },
  { id: 'poppins', name: 'Poppins', family: '"Poppins", sans-serif' },
  { id: 'roboto', name: 'Roboto', family: '"Roboto", sans-serif' },
  { id: 'playfair', name: 'Playfair Display', family: '"Playfair Display", serif' },
  { id: 'montserrat', name: 'Montserrat', family: '"Montserrat", sans-serif' },
  { id: 'lato', name: 'Lato', family: '"Lato", sans-serif' },
];
export const BUTTON_SHAPES = [
  { id: 'sharp', name: 'Sharp', class: 'rounded-none' },
  { id: 'rounded', name: 'Rounded', class: 'rounded-xl' },
  { id: 'extra', name: 'Extra', class: 'rounded-2xl' },
  { id: 'pill', name: 'Pill', class: 'rounded-full' },
];
export const COLOR_PALETTES = [
  { id: 'imperial-gold', name: 'Imperial Gold', primary: '#c9a961', secondary: '#0a0a0a' },
  { id: 'noir', name: 'Noir', primary: '#ffffff', secondary: '#0a0a0a' },
  { id: 'midnight', name: 'Midnight', primary: '#3b82f6', secondary: '#0a0a0a' },
  { id: 'emerald', name: 'Emerald', primary: '#10b981', secondary: '#0a0a0a' },
];
export const GRADIENT_PRESETS = [
  { id: 'onyx-fade', name: 'Onyx Fade', stops: [{ color: '#0a0a0a', offset: 0 }, { color: '#1a1a1a', offset: 100 }] },
  { id: 'golden-glow', name: 'Golden Hour', stops: [{ color: '#1a1a1a', offset: 0 }, { color: '#c9a961', offset: 100 }] },
  { id: 'midnight-royal', name: 'Midnight Royal', stops: [{ color: '#0a0a0a', offset: 0 }, { color: '#1e3a8a', offset: 100 }] },
  { id: 'deep-maroon', name: 'Velvet Maroon', stops: [{ color: '#0a0a0a', offset: 0 }, { color: '#450a0a', offset: 100 }] },
];
export const ICON_OPTIONS = [
  { id: 'Globe', icon: Globe, label: 'Website' },
  { id: 'Instagram', icon: Instagram, label: 'Instagram' },
  { id: 'Mail', icon: Mail, label: 'Email' },
  { id: 'Twitter', icon: Twitter, label: 'Twitter' },
  { id: 'Youtube', icon: Youtube, label: 'YouTube' },
  { id: 'Linkedin', icon: Linkedin, label: 'LinkedIn' },
  { id: 'ShoppingBag', icon: ShoppingBag, label: 'Shop' },
  { id: 'Camera', icon: Camera, label: 'Portfolio' },
  { id: 'Code', icon: Code, label: 'Custom' },
  { id: 'Layout', icon: Layout, label: 'Layout' },
  { id: 'Palette', icon: Palette, label: 'Design' },
  { id: 'Discord', icon: MessageSquare, label: 'Discord' },
];
export const FONT_FAMILIES = [
  { id: 'editorial', name: 'Editorial', class: 'font-serif', desc: 'Cinzel / Garamond' },
  { id: 'modern', name: 'Modern', class: 'font-sans', desc: 'Inter / Karla' },
  { id: 'classic', name: 'Classic', class: 'font-serif', desc: 'Playfair Display' },
];
export const BG_PATTERNS = [
  { id: 'none', name: 'None', desc: 'Pure solid background' },
  { id: 'dust', name: 'Dust', desc: 'Floating cinematic particles' },
  { id: 'grid', name: 'Grid', desc: 'Technical structural grid' },
  { id: 'constellation', name: 'Constellation', desc: 'Ethereal connecting nodes' },
] as const;
export interface ThemePreset {
  id: string;
  name: string;
  category: 'Editorial' | 'Vibrant' | 'Minimal' | 'Dark' | 'Creative';
  isPro: boolean;
  appearance: Appearance;
}
export const ONYX_THEMES: ThemePreset[] = [
  {
    id: 'elegant-dark-gold',
    name: 'Elegant Dark Gold',
    category: 'Editorial',
    isPro: false,
    appearance: {
      themeId: 'onyx-gold',
      paletteId: 'imperial-gold',
      fontPairId: 'playfair',
      buttonShape: 'sharp',
      buttonStyle: 'fill',
      buttonShadow: 'none',
      bgType: 'color',
      bgColor: '#0a0a0a',
      bgPattern: 'dust',
      bgGradient: { type: 'linear', angle: 180, stops: [{ color: '#0a0a0a', offset: 0 }, { color: '#1a1a1a', offset: 100 }] },
      colors: { btnFill: '#c9a961', btnText: '#0a0a0a', btnBorder: '#c9a961', profileText: '#e8e8e8', accent: '#c9a961' },
      layout: { avatarShape: 'circle', avatarBorderWidth: 2, avatarBorderColor: '#c9a961', buttonSpacing: 16, containerWidth: 680 }
    }
  },
  {
    id: 'light-minimal',
    name: 'Light Minimal',
    category: 'Minimal',
    isPro: false,
    appearance: {
      themeId: 'light',
      paletteId: 'noir',
      fontPairId: 'inter',
      buttonShape: 'rounded',
      buttonStyle: 'outline',
      buttonShadow: 'soft',
      bgType: 'color',
      bgColor: '#ffffff',
      bgPattern: 'none',
      bgGradient: { type: 'linear', angle: 180, stops: [{ color: '#ffffff', offset: 0 }, { color: '#f5f5f5', offset: 100 }] },
      colors: { btnFill: '#000000', btnText: '#000000', btnBorder: '#e5e7eb', profileText: '#111827', accent: '#8129D9' },
      layout: { avatarShape: 'rounded', avatarBorderWidth: 0, avatarBorderColor: '#000000', buttonSpacing: 12, containerWidth: 600 }
    }
  },
  {
    id: 'coral-sunset',
    name: 'Coral Sunset',
    category: 'Vibrant',
    isPro: true,
    appearance: {
      themeId: 'sunset',
      paletteId: 'vibrant',
      fontPairId: 'montserrat',
      buttonShape: 'pill',
      buttonStyle: 'fill',
      buttonShadow: 'none',
      bgType: 'gradient',
      bgColor: '#ff7e5f',
      bgPattern: 'none',
      bgGradient: { type: 'linear', angle: 45, stops: [{ color: '#ff7e5f', offset: 0 }, { color: '#feb47b', offset: 100 }] },
      colors: { btnFill: '#ffffff', btnText: '#ff7e5f', btnBorder: '#ffffff', profileText: '#ffffff', accent: '#ffffff' },
      layout: { avatarShape: 'circle', avatarBorderWidth: 3, avatarBorderColor: '#ffffff', buttonSpacing: 20, containerWidth: 640 }
    }
  },
  {
    id: 'vibrant-neon',
    name: 'Vibrant Neon',
    category: 'Creative',
    isPro: true,
    appearance: {
      themeId: 'neon',
      paletteId: 'vibrant',
      fontPairId: 'roboto',
      buttonShape: 'sharp',
      buttonStyle: 'outline',
      buttonShadow: 'hard',
      bgType: 'color',
      bgColor: '#000000',
      bgPattern: 'grid',
      bgGradient: { type: 'linear', angle: 180, stops: [{ color: '#000000', offset: 0 }, { color: '#111111', offset: 100 }] },
      colors: { btnFill: 'transparent', btnText: '#39ff14', btnBorder: '#39ff14', profileText: '#39ff14', accent: '#39ff14' },
      layout: { avatarShape: 'square', avatarBorderWidth: 2, avatarBorderColor: '#39ff14', buttonSpacing: 16, containerWidth: 600 }
    }
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    category: 'Vibrant',
    isPro: false,
    appearance: {
      themeId: 'ocean',
      paletteId: 'midnight',
      fontPairId: 'lato',
      buttonShape: 'extra',
      buttonStyle: 'fill',
      buttonShadow: 'soft',
      bgType: 'gradient',
      bgColor: '#00c6ff',
      bgPattern: 'none',
      bgGradient: { type: 'linear', angle: 180, stops: [{ color: '#00c6ff', offset: 0 }, { color: '#0072ff', offset: 100 }] },
      colors: { btnFill: '#ffffff', btnText: '#0072ff', btnBorder: '#ffffff', profileText: '#ffffff', accent: '#00c6ff' },
      layout: { avatarShape: 'circle', avatarBorderWidth: 0, avatarBorderColor: '#ffffff', buttonSpacing: 14, containerWidth: 620 }
    }
  }
];