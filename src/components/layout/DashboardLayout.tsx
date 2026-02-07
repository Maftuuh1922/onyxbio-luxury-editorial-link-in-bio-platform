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
    toast.success('Link copied to clipboard', {
      description: 'Your public atelier is ready to share.',
      className: 'font-karla font-bold bg-white text-brand-text border-brand-border',
    });
  };
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-brand-bg font-karla">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex border-r border-brand-border bg-white shadow-sm w-72">
          <SidebarHeader className="p-8">
            <Link to="/" className="font-space font-bold text-2xl tracking-tight text-brand-text">
              Onyx<span className="text-brand-purple">Bio</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-5">
            <div className="mb-8 px-4 py-6 flex flex-col items-center text-center space-y-4 bg-brand-bg/50 rounded-[2rem] border border-brand-border/40">
              <div className="w-20 h-20 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple text-2xl font-bold border-2 border-white shadow-md shrink-0">
                {fullName?.charAt(0)}
              </div>
              <div className="w-full px-2 overflow-hidden">
                <p className="text-sm font-bold text-brand-text truncate leading-tight">{fullName}</p>
                <p className="text-xs text-brand-muted font-medium truncate mt-0.5">@{username}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full rounded-xl text-[10px] font-bold h-10 border-brand-border bg-white text-brand-text hover:bg-white hover:border-brand-purple/30 active:scale-95 transition-all shadow-sm shrink-0 uppercase tracking-widest"
                onClick={handleCopyLink}
              >
                <Copy className="w-3 h-3 mr-2" /> Copy Atelier
              </Button>
            </div>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path} className={cn(
                      "flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all font-bold text-sm",
                      location.pathname === item.path
                        ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/20"
                        : "text-brand-muted hover:bg-brand-bg hover:text-brand-text"
                    )}>
                      <item.icon className={cn("w-4.5 h-4.5 transition-transform", location.pathname === item.path && "scale-110")} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-6 space-y-2">
             <button className="flex items-center gap-4 w-full px-5 py-2 text-brand-muted hover:text-brand-text text-sm font-bold transition-colors">
              <HelpCircle className="w-4 h-4" /> Help Center
            </button>
            <button onClick={handleLogout} className="flex items-center gap-4 w-full px-5 py-2 text-red-500 hover:text-red-600 text-sm font-bold transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-brand-bg flex flex-col pb-24 md:pb-0">
          <header className="flex h-16 items-center justify-between border-b border-brand-border bg-white/80 backdrop-blur-md px-6 sticky top-0 z-20">
             <div className="flex items-center gap-4">
               <SidebarTrigger className="hidden md:flex text-brand-text hover:text-brand-purple transition-colors" />
               <div className="md:hidden font-space font-bold text-xl text-brand-text">
                  Onyx<span className="text-brand-purple">Bio</span>
               </div>
               <Separator orientation="vertical" className="hidden md:block h-6 bg-brand-border mx-2" />
               <div className="text-[10px] font-bold text-brand-muted flex items-center gap-2 uppercase tracking-widest">
                 <span className="hidden sm:inline">Editor</span> <ChevronRight className="hidden sm:inline w-3 h-3 opacity-40" /> <span className="text-brand-text">{location.pathname.split('/').pop()}</span>
               </div>
             </div>
             <div className="flex items-center gap-4">
                <Link
                  to={`/${username}`}
                  target="_blank"
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-brand-lime text-brand-text px-5 py-2.5 rounded-xl shadow-md hover:scale-105 hover:bg-brand-lime/90 transition-all border border-brand-lime-dark/10"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Live Preview</span>
                </Link>
             </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
          {/* Mobile Bottom Navigation */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-brand-border px-8 py-4 z-50 flex items-center justify-between shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1.5 transition-all relative group",
                  location.pathname === item.path ? "text-brand-purple" : "text-brand-muted"
                )}
              >
                <item.icon className={cn("w-5.5 h-5.5 transition-transform", location.pathname === item.path && "scale-110")} />
                <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
                {location.pathname === item.path && (
                  <motion.div layoutId="mobile-nav-active" className="absolute -top-1 w-1 h-1 bg-brand-purple rounded-full" />
                )}
              </Link>
            ))}
            <button onClick={handleLogout} className="flex flex-col items-center gap-1.5 text-red-400 opacity-80 hover:opacity-100 transition-opacity">
              <LogOut className="w-5.5 h-5.5" />
              <span className="text-[9px] font-bold uppercase tracking-tighter">Exit</span>
            </button>
          </nav>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}