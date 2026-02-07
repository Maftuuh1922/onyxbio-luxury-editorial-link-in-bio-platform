import {
  Globe, Instagram, Mail, Twitter, Youtube, Linkedin,
  ShoppingBag, Camera, Music, Video, MapPin,
  Link as LinkIcon, Heart, Star, Briefcase, Zap,
  Send, MessageCircle, Phone, Github, Figma,
  Twitch, Slack, Dribbble, ExternalLink,
  Smartphone, User, MessageSquare, Code, Layout, Palette
} from 'lucide-react';
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
  { id: 'imperial-gold', name: 'Imperial Gold', primary: '#D4AF37', secondary: '#0a0a0a' },
  { id: 'noir', name: 'Noir', primary: '#ffffff', secondary: '#0a0a0a' },
  { id: 'midnight', name: 'Midnight', primary: '#3b82f6', secondary: '#0a0a0a' },
  { id: 'emerald', name: 'Emerald', primary: '#10b981', secondary: '#0a0a0a' },
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
  { id: 'dust', name: 'Dust', desc: 'Floating cinematic particles' },
  { id: 'grid', name: 'Grid', desc: 'Technical structural grid' },
  { id: 'constellation', name: 'Constellation', desc: 'Ethereal connecting nodes' },
];