import {
  Globe, Instagram, Mail, Twitter, Youtube, Linkedin,
  ShoppingBag, Camera, Music2, AtSign, Ghost, Share2,
  Code, MessageCircle, CreditCard, Play, Podcast, Twitch, Video
} from 'lucide-react';
import { Appearance } from '@/store/useProfile';
export const SYSTEM_FONTS = [
  { id: 'arial', name: 'Arial', family: 'Arial, sans-serif' },
  { id: 'georgia', name: 'Georgia', family: 'Georgia, serif' },
  { id: 'times', name: 'Times New Roman', family: '"Times New Roman", serif' },
];
export const GOOGLE_FONTS = [
  { id: 'inter', name: 'Modern Sans', family: '"Inter", sans-serif' },
  { id: 'playfair', name: 'Master Editorial', family: '"Playfair Display", "Cormorant Garamond", serif' },
  { id: 'cinzel', name: 'Ornamental', family: '"Cinzel", serif' },
  { id: 'karla', name: 'Clean Editorial', family: '"Karla", "Inter", sans-serif' },
  { id: 'poppins', name: 'Vibrant Geometric', family: '"Poppins", sans-serif' },
  { id: 'fraunces', name: 'Luxury Display', family: '"Fraunces", serif' },
  { id: 'montserrat', name: 'Corporate Bold', family: '"Montserrat", sans-serif' },
  { id: 'cormorant', name: 'Antique Serif', family: '"Cormorant Garamond", serif' },
  { id: 'outfit', name: 'High-Tech Sans', family: '"Outfit", sans-serif' },
  { id: 'space-mono', name: 'Brutalist Code', family: '"Space Mono", monospace' },
  { id: 'syne', name: 'Artistic Avant', family: '"Syne", sans-serif' },
  { id: 'dm-serif', name: 'Classic News', family: '"DM Serif Display", serif' },
  { id: 'archivo', name: 'Editorial Archival', family: '"Archivo Black", sans-serif' },
  { id: 'bodoni', name: 'Fashion High-End', family: '"Libre Bodoni", serif' },
  { id: 'manrope', name: 'Universal Swiss', family: '"Manrope", sans-serif' },
  { id: 'lexend', name: 'Hyper-Readable', family: '"Lexend", sans-serif' },
  { id: 'bricolage', name: 'Humanist Fun', family: '"Bricolage Grotesque", sans-serif' },
  { id: 'instrument', name: 'Tech Minimalist', family: '"Instrument Sans", sans-serif' },
  { id: 'marcellus', name: 'Ancient Sculpted', family: '"Marcellus", serif' },
  { id: 'tenor', name: 'Classic Sophist', family: '"Tenor Sans", sans-serif' },
  { id: 'crimson', name: 'Bookish Text', family: '"Crimson Pro", serif' }
];
export const LINK_TYPES = [
  { id: 'standard', name: 'Standard Link', icon: Globe, desc: 'Classic URL button' },
  { id: 'commerce', name: 'Commerce & Shop', icon: CreditCard, desc: 'Sell products or collect donations' },
  { id: 'widget', name: 'Multimedia Widget', icon: Play, desc: 'Embed Spotify, YouTube, or Twitch' }
];
export const CURRENCY_OPTIONS = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' }
];
export const COMMERCE_PROVIDERS = [
  { id: 'stripe', name: 'Stripe', color: '#635bff' },
  { id: 'paypal', name: 'PayPal', color: '#003087' },
  { id: 'buymeacoffee', name: 'Buy Me a Coffee', color: '#FFDD00' }
];
export const WIDGET_PLATFORMS = [
  { id: 'spotify', name: 'Spotify', icon: Music2 },
  { id: 'youtube', name: 'YouTube', icon: Youtube },
  { id: 'soundcloud', name: 'SoundCloud', icon: Podcast },
  { id: 'twitch', name: 'Twitch', icon: Twitch },
  { id: 'vimeo', name: 'Vimeo', icon: Video }
];
export const BUTTON_SHAPES = [
  { id: 'sharp', name: 'Sharp', class: 'rounded-none' },
  { id: 'rounded', name: 'Rounded', class: 'rounded-2xl' },
  { id: 'pill', name: 'Pill', class: 'rounded-full' },
];
export const ICON_OPTIONS = [
  { id: 'Globe', icon: Globe, label: 'Website' },
  { id: 'Instagram', icon: Instagram, label: 'Instagram' },
  { id: 'TikTok', icon: Music2, label: 'TikTok' },
  { id: 'Threads', icon: AtSign, label: 'Threads' },
  { id: 'Twitter', icon: Twitter, label: 'Twitter' },
  { id: 'Snapchat', icon: Ghost, label: 'Snapchat' },
  { id: 'Youtube', icon: Youtube, label: 'YouTube' },
  { id: 'Linkedin', icon: Linkedin, label: 'LinkedIn' },
  { id: 'Mail', icon: Mail, label: 'Email' },
  { id: 'ShoppingBag', icon: ShoppingBag, label: 'Shop' },
  { id: 'Camera', icon: Camera, label: 'Portfolio' },
  { id: 'Code', icon: Code, label: 'Custom' },
  { id: 'Social', icon: Share2, label: 'Social' },
  { id: 'Commerce', icon: CreditCard, label: 'Checkout' }
];
export const BG_PATTERNS = [
  { id: 'none', name: 'None', desc: 'Minimal solid canvas' },
  { id: 'dust', name: 'Dust', desc: 'Floating cinematic particles' },
  { id: 'grid', name: 'Grid', desc: 'Structural designer grid' },
  { id: 'constellation', name: 'Constellation', desc: 'Ethereal node connections' },
] as const;
export const GRADIENT_PRESETS = [
  { id: 'onyx-fade', name: 'Onyx Fade', stops: [{ color: '#0a0a0a', offset: 0 }, { color: '#1a1a1a', offset: 100 }] },
  { id: 'golden-hour', name: 'Golden Hour', stops: [{ color: '#0a0a0a', offset: 0 }, { color: '#c9a961', offset: 100 }] },
  { id: 'velvet-night', name: 'Velvet Night', stops: [{ color: '#000000', offset: 0 }, { color: '#1e1b4b', offset: 100 }] },
];
export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  category: 'Editorial' | 'Minimal' | 'Vibrant' | 'Dark';
  isPro: boolean;
  appearance: Appearance;
}
export const ONYX_THEMES: ThemePreset[] = [
  {
    id: 'editorial-onyx',
    name: 'Onyx Editorial',
    description: 'The signature dark-luxury look with metallic gold accents and cinematic dust particles.',
    category: 'Editorial',
    isPro: false,
    appearance: {
      themeId: 'editorial-onyx',
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
      layout: { avatarShape: 'circle', avatarBorderWidth: 1, avatarBorderColor: '#c9a961', buttonSpacing: 12, containerWidth: 600, socialPosition: 'bottom', socialIconStyle: 'minimal', hideBranding: false }
    }
  },
  {
    id: 'vogue-light',
    name: 'Vogue Light',
    description: 'A clean, high-fashion aesthetic inspired by modern editorial print layouts.',
    category: 'Minimal',
    isPro: true,
    appearance: {
      themeId: 'vogue-light',
      paletteId: 'noir',
      fontPairId: 'karla',
      buttonShape: 'pill',
      buttonStyle: 'outline',
      buttonShadow: 'soft',
      bgType: 'color',
      bgColor: '#ffffff',
      bgPattern: 'none',
      bgGradient: { type: 'linear', angle: 180, stops: [{ color: '#ffffff', offset: 0 }, { color: '#f5f5f5', offset: 100 }] },
      colors: { btnFill: '#000000', btnText: '#000000', btnBorder: '#000000', profileText: '#000000', accent: '#000000' },
      layout: { avatarShape: 'rounded', avatarBorderWidth: 0, avatarBorderColor: '#000000', buttonSpacing: 16, containerWidth: 540, socialPosition: 'bottom', socialIconStyle: 'glass', hideBranding: true }
    }
  }
];