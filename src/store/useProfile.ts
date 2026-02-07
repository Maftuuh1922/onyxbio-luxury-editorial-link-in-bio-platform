import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export interface Link {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: string;
  active: boolean;
}
export interface Appearance {
  themeId: 'onyx-gold' | 'silver-noir' | 'royal-emerald';
  fontPairId: 'classic' | 'modern' | 'editorial';
}
interface ProfileState {
  name: string;
  tagline: string;
  bio: string;
  avatar: string;
  links: Link[];
  appearance: Appearance;
  updateProfile: (data: Partial<Pick<ProfileState, 'name' | 'tagline' | 'bio' | 'avatar'>>) => void;
  addLink: (link: Omit<Link, 'id'>) => void;
  updateLink: (id: string, data: Partial<Link>) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (links: Link[]) => void;
  updateAppearance: (data: Partial<Appearance>) => void;
}
export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      name: "ALEXANDER ONYX",
      tagline: "Visual Storyteller & Digital Architect",
      bio: "CREATIVE • INNOVATOR • DREAMER",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop",
      links: [
        { id: '1', title: 'PORTFOLIO', subtitle: 'View my latest creative projects', url: 'https://onyx.design', icon: 'Globe', active: true },
        { id: '2', title: 'INSTAGRAM', subtitle: 'Daily glimpses into my process', url: 'https://instagram.com', icon: 'Instagram', active: true },
        { id: '3', title: 'CONTACT', subtitle: 'Let’s build something together', url: 'mailto:hello@onyx.bio', icon: 'Mail', active: true },
      ],
      appearance: {
        themeId: 'onyx-gold',
        fontPairId: 'editorial',
      },
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
    }),
    {
      name: 'onyx-profile-storage',
    }
  )
);