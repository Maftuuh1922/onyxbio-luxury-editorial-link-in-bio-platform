import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Plus,
  GripVertical,
  Trash2,
  Globe,
  Instagram,
  Mail,
  Twitter,
  Youtube,
  Linkedin,
  BarChart2,
  Edit2,
  Copy,
  Calendar,
  Link as LinkIcon
} from 'lucide-react';
import { useProfile, Link as LinkType } from '@/store/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProfilePreview } from '@/components/dashboard/ProfilePreview';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
const iconMap: Record<string, any> = { Globe, Instagram, Mail, Twitter, Youtube, Linkedin };
function SortableLinkCard({ link }: { link: LinkType }) {
  const updateLink = useProfile((s) => s.updateLink);
  const deleteLink = useProfile((s) => s.deleteLink);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: link.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };
  const IconComponent = iconMap[link.icon] || Globe;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white border border-gray-100 rounded-2xl p-5 mb-4 flex items-center gap-4 group transition-all",
        isDragging ? "shadow-2xl ring-2 ring-brand-purple" : "hover:border-gray-200 shadow-sm",
        !link.active && "opacity-60"
      )}
    >
      <button {...attributes} {...listeners} className="cursor-grab text-gray-300 hover:text-brand-purple transition-colors p-1">
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-brand-purple border border-gray-100">
        <IconComponent className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="font-bold text-sm text-brand-text truncate">{link.title}</h4>
          {Math.random() > 0.8 && <Badge className="bg-brand-purple/10 text-brand-purple border-none text-[8px] h-4">PRO: SCHEDULED</Badge>}
        </div>
        <p className="text-xs text-brand-muted truncate">{link.url}</p>
        <div className="flex items-center gap-4 mt-2">
           <span className="text-[10px] font-bold text-brand-lime flex items-center gap-1"><BarChart2 className="w-3 h-3" /> 128 clicks</span>
           <span className="text-[10px] font-bold text-brand-muted flex items-center gap-1"><Calendar className="w-3 h-3" /> Added 2d ago</span>
        </div>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Copy className="w-4 h-4 text-gray-400" /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Edit2 className="w-4 h-4 text-gray-400" /></Button>
        <Button variant="ghost" size="icon" onClick={() => deleteLink(link.id)} className="h-8 w-8 rounded-lg hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
      </div>
      <div className="pl-4 border-l border-gray-100 ml-2">
        <Switch
          checked={link.active}
          onCheckedChange={(checked) => updateLink(link.id, { active: checked })}
          className="data-[state=checked]:bg-brand-lime"
        />
      </div>
    </div>
  );
}
export function LinksEditor() {
  const links = useProfile((s) => s.links);
  const reorderLinks = useProfile((s) => s.reorderLinks);
  const addLink = useProfile((s) => s.addLink);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', subtitle: '', url: '', icon: 'Globe', active: true });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((l) => l.id === active.id);
      const newIndex = links.findIndex((l) => l.id === over.id);
      reorderLinks(arrayMove(links, oldIndex, newIndex));
    }
  };
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLink(newLink);
    setNewLink({ title: '', subtitle: '', url: '', icon: 'Globe', active: true });
    setIsAddOpen(false);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 font-karla">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Editor Side */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-brand-text">Links</h1>
              <p className="text-brand-muted text-sm">Curate and manage your bio's external connections.</p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-xl px-6 h-12 shadow-lg shadow-brand-purple/20">
                  <Plus className="w-4 h-4 mr-2" /> Add Link
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-none text-brand-text sm:max-w-[425px] rounded-3xl p-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">New Link</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSubmit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-wider">Display Title</Label>
                    <Input required value={newLink.title} onChange={(e) => setNewLink({ ...newLink, title: e.target.value })} placeholder="My Portfolio" className="h-12 rounded-xl border-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-wider">URL</Label>
                    <Input required value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} placeholder="https://..." className="h-12 rounded-xl border-gray-200" />
                  </div>
                  <Button type="submit" className="w-full h-12 bg-brand-purple text-white font-bold rounded-xl mt-4">Create Link</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={links.map(l => l.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                <AnimatePresence>
                  {links.map((link) => (
                    <SortableLinkCard key={link.id} link={link} />
                  ))}
                </AnimatePresence>
                {links.length === 0 && (
                  <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                       <LinkIcon className="w-10 h-10 text-gray-200" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-text">No links yet</h3>
                      <p className="text-sm text-brand-muted">Start by adding your first link to your profile.</p>
                    </div>
                    <Button onClick={() => setIsAddOpen(true)} className="bg-brand-purple text-white font-bold rounded-xl">Add First Link</Button>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
        {/* Preview Side */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <ProfilePreview />
        </div>
      </div>
      <button onClick={() => setIsAddOpen(true)} className="fixed bottom-24 right-8 md:hidden w-14 h-14 bg-brand-purple text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-transform">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}