import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Link as LinkIcon, Palette, BarChart2, Settings, LogOut, Copy, ExternalLink, HelpCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/store/useAuth';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/overview' },
  { icon: LinkIcon, label: 'Links', path: '/dashboard/links' },
  { icon: Palette, label: 'Appearance', path: '/dashboard/appearance' },
  { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];
export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuth((s) => s.logout);
  const fullName = useAuth((s) => s.user?.fullName);
  const username = useAuth((s) => s.user?.username);
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handleCopyLink = () => {
    const profileUrl = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(profileUrl);
    toast.success('Atelier Link Copied', {
      description: 'Your legacy is ready for the world.',
      className: 'font-karla font-bold bg-white text-brand-text border-brand-border',
    });
  };
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-brand-bg font-karla">
        {/* Desktop Sidebar: Expanded Width for Editorial Feel */}
        <Sidebar className="hidden md:flex border-r border-brand-border bg-white shadow-xl w-80">
          <SidebarHeader className="p-10">
            <Link to="/" className="font-space font-bold text-3xl tracking-tighter text-brand-text hover:opacity-80 transition-opacity">
              Onyx<span className="text-brand-purple">Bio</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-6">
            <div className="mb-10 px-5 py-8 flex flex-col items-center text-center space-y-5 bg-brand-bg/60 rounded-[2.5rem] border border-brand-border/40 shadow-sm">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-brand-purple text-3xl font-bold border-4 border-white shadow-lg shrink-0 relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-purple/5 group-hover:bg-brand-purple/10 transition-colors" />
                <span className="relative z-10">{fullName?.charAt(0)}</span>
              </div>
              <div className="w-full px-2">
                <p className="text-base font-bold text-brand-text truncate leading-tight tracking-tight">{fullName}</p>
                <p className="text-[11px] text-brand-muted font-bold truncate mt-1 uppercase tracking-widest">onyx.bio/{username}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full rounded-2xl text-[10px] font-bold h-11 border-brand-border bg-white text-brand-text hover:bg-brand-purple hover:text-white hover:border-brand-purple active:scale-95 transition-all shadow-sm shrink-0 uppercase tracking-[0.2em]"
                onClick={handleCopyLink}
              >
                <Copy className="w-3.5 h-3.5 mr-2" /> Copy Atelier
              </Button>
            </div>
            <SidebarMenu className="space-y-1.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path} className={cn(
                      "flex items-center gap-5 px-6 py-4 rounded-2xl transition-all font-bold text-sm",
                      location.pathname === item.path
                        ? "bg-brand-purple text-white shadow-xl shadow-brand-purple/20 scale-[1.02]"
                        : "text-brand-muted hover:bg-brand-bg hover:text-brand-text"
                    )}>
                      <item.icon className={cn("w-5 h-5 transition-transform", location.pathname === item.path && "scale-110")} />
                      <span className="tracking-tight">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-8 space-y-4">
             <button className="flex items-center gap-5 w-full px-6 py-2 text-brand-muted hover:text-brand-text text-[11px] font-bold uppercase tracking-widest transition-colors">
              <HelpCircle className="w-4 h-4" /> Help Center
            </button>
            <button onClick={handleLogout} className="flex items-center gap-5 w-full px-6 py-2 text-red-500 hover:text-red-600 text-[11px] font-bold uppercase tracking-widest transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-brand-bg flex flex-col pb-24 md:pb-0">
          <header className="flex h-20 items-center justify-between border-b border-brand-border bg-white/70 backdrop-blur-2xl px-8 sticky top-0 z-40">
             <div className="flex items-center gap-5">
               <SidebarTrigger className="hidden md:flex text-brand-text hover:text-brand-purple transition-all scale-110" />
               <div className="md:hidden font-space font-bold text-2xl tracking-tighter text-brand-text">
                  Onyx<span className="text-brand-purple">Bio</span>
               </div>
               <Separator orientation="vertical" className="hidden md:block h-8 bg-brand-border mx-2" />
               <div className="text-[10px] font-bold text-brand-muted flex items-center gap-3 uppercase tracking-[0.25em]">
                 <span className="hidden sm:inline">Editor Workspace</span> <ChevronRight className="hidden sm:inline w-3 h-3 opacity-30" /> <span className="text-brand-text">{location.pathname.split('/').pop()}</span>
               </div>
             </div>
             <div className="flex items-center gap-5">
                <Link
                  to={`/${username}`}
                  target="_blank"
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-brand-lime text-brand-text px-6 py-3 rounded-2xl shadow-xl shadow-brand-lime/10 hover:scale-105 hover:bg-brand-lime/90 transition-all border border-brand-lime-dark/10"
                >
                  <ExternalLink className="w-4 h-4" /> <span className="hidden sm:inline">Live Preview</span>
                </Link>
             </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
          {/* Mobile Bottom Navigation: High Contrast & Tactile */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-brand-border px-8 py-5 z-50 flex items-center justify-between shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)]">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-2 transition-all relative group",
                  location.pathname === item.path ? "text-brand-purple scale-110" : "text-brand-muted"
                )}
              >
                <item.icon className={cn("w-6 h-6 transition-transform", location.pathname === item.path && "stroke-[2.5px]")} />
                <span className="text-[9px] font-bold uppercase tracking-widest">{item.label.split(' ')[0]}</span>
                {location.pathname === item.path && (
                  <motion.div layoutId="mobile-nav-active-v2" className="absolute -top-2 w-1.5 h-1.5 bg-brand-purple rounded-full shadow-[0_0_10px_rgba(129,41,217,0.5)]" />
                )}
              </Link>
            ))}
            <button onClick={handleLogout} className="flex flex-col items-center gap-2 text-red-500/70 hover:text-red-600 transition-colors">
              <LogOut className="w-6 h-6" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Exit</span>
            </button>
          </nav>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}