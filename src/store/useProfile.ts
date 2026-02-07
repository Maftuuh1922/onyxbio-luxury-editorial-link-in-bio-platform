import { create, UseBoundStore, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';
export interface Link {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: string;
  active: boolean;
}
export interface Socials {
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  email: string;
}
export interface Appearance {
  themeId: 'onyx-gold' | 'silver-noir' | 'royal-emerald';
  fontPairId: 'classic' | 'modern' | 'editorial';
}
const DEFAULT_PROFILE = {
  name: "ALEXANDER ONYX",
  tagline: "Visual Storyteller & Digital Architect",
  bio: "ESTABLISHED IN • CREATIVE CURATION • DESIGNED TO INSPIRE",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop",
  links: [
    { id: '1', title: 'PORTFOLIO', subtitle: 'A collection of visual experiences', url: 'https://onyx.design', icon: 'Globe', active: true },
    { id: '2', title: 'INSTAGRAM', subtitle: 'Behind the lens and into the process', url: 'https://instagram.com', icon: 'Instagram', active: true },
    { id: '3', title: 'GET IN TOUCH', subtitle: 'Inquiries for collaborative excellence', url: 'mailto:hello@onyx.bio', icon: 'Mail', active: true },
  ],
  socials: {
    instagram: 'alexander_onyx',
    twitter: 'onyx_vision',
    linkedin: 'alexander-onyx',
    youtube: '',
    email: 'hello@onyx.bio',
  },
  appearance: {
    themeId: 'onyx-gold' as const,
    fontPairId: 'editorial' as const,
  },
};
interface ProfileState {
  name: string;
  tagline: string;
  bio: string;
  avatar: string;
  links: Link[];
  socials: Socials;
  appearance: Appearance;
  updateProfile: (data: Partial<Pick<ProfileState, 'name' | 'tagline' | 'bio' | 'avatar'>>) => void;
  addLink: (link: Omit<Link, 'id'>) => void;
  updateLink: (id: string, data: Partial<Link>) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (links: Link[]) => void;
  updateAppearance: (data: Partial<Appearance>) => void;
  updateSocials: (data: Partial<Socials>) => void;
  resetProfile: () => void;
}
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
        appearance: { ...state.appearance, ...data }
      })),
      updateSocials: (data) => set((state) => ({
        socials: { 
          instagram: '',
          twitter: '',
          linkedin: '',
          youtube: '',
          email: '',
          ...state.socials, 
          ...data 
        }
      })),
      resetProfile: () => set(DEFAULT_PROFILE),
    }),
    {
      name: 'onyx-profile-storage-v2',
    }
  )
);