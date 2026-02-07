import { create, UseBoundStore, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';
export interface Link {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: string;
  active: boolean;
  animation: 'none' | 'fade' | 'slide' | 'bounce';
}
export interface Socials {
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  email: string;
  discord?: string;
  position: 'top' | 'bottom' | 'both';
}
export interface Appearance {
  themeId: string;
  paletteId: string;
  fontPairId: string;
  buttonShape: 'sharp' | 'rounded' | 'extra' | 'pill';
  buttonStyle: 'fill' | 'outline';
  buttonShadow: 'none' | 'soft' | 'hard';
  bgType: 'color' | 'gradient' | 'image' | 'video';
  bgColor: string;
  bgPattern: 'none' | 'dust' | 'grid' | 'constellation';
  bgGradient: {
    type: 'linear' | 'radial';
    angle: number;
    stops: { color: string; offset: number }[];
  };
  bgImage?: {
    url: string;
    overlay: number;
    blur: number;
  };
  colors: {
    btnFill: string;
    btnText: string;
    btnBorder: string;
    profileText: string;
    accent: string;
  };
  layout: {
    avatarShape: 'circle' | 'rounded' | 'square';
    avatarBorderWidth: number;
    avatarBorderColor: string;
    buttonSpacing: number;
    containerWidth: number;
  };
}
export interface CustomCode {
  html: string;
  css: string;
  js: string;
  enabled: boolean;
}
interface ProfileState {
  name: string;
  tagline: string;
  bio: string;
  avatar: string;
  links: Link[];
  socials: Socials;
  appearance: Appearance;
  customCode: CustomCode;
  updateProfile: (data: Partial<Pick<ProfileState, 'name' | 'tagline' | 'bio' | 'avatar'>>) => void;
  addLink: (link: Omit<Link, 'id'>) => void;
  updateLink: (id: string, data: Partial<Link>) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (links: Link[]) => void;
  updateAppearance: (data: Partial<Appearance> | ((prev: Appearance) => Appearance)) => void;
  updateSocials: (data: Partial<Socials>) => void;
  updateCustomCode: (data: Partial<CustomCode>) => void;
  resetProfile: () => void;
}
const DEFAULT_PROFILE: Omit<ProfileState, 'updateProfile' | 'addLink' | 'updateLink' | 'deleteLink' | 'reorderLinks' | 'updateAppearance' | 'updateSocials' | 'updateCustomCode' | 'resetProfile'> = {
  name: "ALEXANDER ONYX",
  tagline: "Visual Storyteller & Digital Architect",
  bio: "ESTABLISHED IN • CREATIVE CURATION • DESIGNED TO INSPIRE THE EXTRAORDINARY",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop",
  links: [
    { id: '1', title: 'PORTFOLIO', subtitle: 'A collection of cinematic visual experiences', url: 'https://onyx.design', icon: 'Globe', active: true, animation: 'fade' as const },
    { id: '2', title: 'INSTAGRAM', subtitle: 'Behind the lens and into the creative process', url: 'https://instagram.com', icon: 'Instagram', active: true, animation: 'fade' as const },
  ],
  socials: {
    instagram: 'alexander_onyx',
    twitter: 'onyx_vision',
    linkedin: 'alexander-onyx',
    youtube: 'onyx_studio',
    email: 'hello@onyx.bio',
    discord: 'onyx_collective',
    position: 'bottom' as const,
  },
  appearance: {
    themeId: 'onyx-gold',
    paletteId: 'imperial-gold',
    fontPairId: 'editorial',
    buttonShape: 'sharp' as const,
    buttonStyle: 'fill' as const,
    buttonShadow: 'none' as const,
    bgType: 'color' as const,
    bgColor: '#0a0a0a',
    bgPattern: 'dust' as const,
    bgGradient: {
      type: 'linear' as const,
      angle: 180,
      stops: [{ color: '#0a0a0a', offset: 0 }, { color: '#1a1a1a', offset: 100 }]
    },
    colors: {
      btnFill: '#c9a961',
      btnText: '#0a0a0a',
      btnBorder: '#c9a961',
      profileText: '#e8e8e8',
      accent: '#c9a961',
    },
    layout: {
      avatarShape: 'circle' as const,
      avatarBorderWidth: 2,
      avatarBorderColor: '#c9a961',
      buttonSpacing: 16,
      containerWidth: 680,
    }
  },
  customCode: {
    html: '',
    css: '',
    js: '',
    enabled: false
  }
};
type ProfileStore = UseBoundStore<StoreApi<ProfileState>>;
export const useProfile: ProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      ...DEFAULT_PROFILE,
      updateProfile: (data) => set((state) => ({ ...state, ...data })),
      addLink: (link) => set((state) => ({
        links: [...state.links, { ...link, id: Math.random().toString(36).substr(2, 9) }]
      })),
      updateLink: (id, data) => set((state) => ({
        links: state.links.map((l) => (l.id === id ? { ...l, ...data } : l))
      })),
      deleteLink: (id) => set((state) => ({
        links: state.links.filter((l) => l.id !== id)
      })),
      reorderLinks: (links) => set({ links }),
      updateAppearance: (data) => set((state) => ({
        appearance: typeof data === 'function' ? data(state.appearance) : { ...state.appearance, ...data }
      })),
      updateSocials: (data) => set((state) => ({
        socials: { ...state.socials, ...data }
      })),
      updateCustomCode: (data) => set((state) => ({
        customCode: { ...state.customCode, ...data }
      })),
      resetProfile: () => set(DEFAULT_PROFILE as any),
    }),
    {
      name: 'onyx-profile-storage-pro-v1',
    }
  )
);