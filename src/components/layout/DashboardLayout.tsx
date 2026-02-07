import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
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
        <Sidebar className="hidden md:flex border-r border-brand-border bg-white shadow-sm">
          <SidebarHeader className="p-6">
            <Link to="/" className="font-space font-bold text-2xl tracking-tight text-brand-text">
              Onyx<span className="text-brand-purple">Bio</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-4">
            <div className="mb-6 px-2 py-4 flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple text-xl font-bold border-2 border-white shadow-sm">
                {fullName?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-brand-text">{fullName}</p>
                <p className="text-xs text-brand-muted font-medium">@{username}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full rounded-lg text-xs h-8 border-brand-border text-brand-text hover:bg-brand-bg active:scale-95 transition-transform"
                onClick={handleCopyLink}
              >
                <Copy className="w-3 h-3 mr-2" /> Copy Link
              </Button>
            </div>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path} className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm",
                      location.pathname === item.path
                        ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                        : "text-brand-muted hover:bg-brand-bg hover:text-brand-text"
                    )}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 space-y-1">
             <button className="flex items-center gap-3 w-full px-4 py-2 text-brand-muted hover:text-brand-text text-sm font-bold transition-colors">
              <HelpCircle className="w-4 h-4" /> Help Center
            </button>
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-red-500 hover:text-red-600 text-sm font-bold transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-brand-bg flex flex-col pb-20 md:pb-0">
          <header className="flex h-16 items-center justify-between border-b border-brand-border bg-white/80 backdrop-blur-md px-6 sticky top-0 z-20">
             <div className="flex items-center gap-4">
               <SidebarTrigger className="hidden md:flex text-brand-text" />
               <div className="md:hidden font-space font-bold text-xl text-brand-text">
                  Onyx<span className="text-brand-purple">Bio</span>
               </div>
               <Separator orientation="vertical" className="hidden md:block h-6 bg-brand-border" />
               <div className="text-xs font-bold text-brand-muted flex items-center gap-2">
                 <span className="hidden sm:inline">Pages</span> <ChevronRight className="hidden sm:inline w-3 h-3" /> <span className="text-brand-text capitalize">{location.pathname.split('/').pop()}</span>
               </div>
             </div>
             <div className="flex items-center gap-4">
                <Link
                  to={`/${username}`}
                  target="_blank"
                  className="flex items-center gap-2 text-xs font-bold bg-brand-lime text-brand-text px-4 py-2 rounded-xl shadow-sm hover:scale-105 hover:bg-brand-lime/90 transition-all border border-brand-lime-dark/10"
                >
                  <ExternalLink className="w-3 h-3" /> <span className="hidden sm:inline">Preview Bio</span>
                </Link>
             </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
          {/* Mobile Bottom Navigation */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-brand-border px-6 py-3 z-50 flex items-center justify-between shadow-2xl">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all",
                  location.pathname === item.path ? "text-brand-purple" : "text-brand-muted"
                )}
              >
                <item.icon className={cn("w-5 h-5", location.pathname === item.path && "scale-110")} />
                <span className="text-[10px] font-bold uppercase">{item.label.split(' ')[0]}</span>
              </Link>
            ))}
            <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-red-400">
              <LogOut className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase">Exit</span>
            </button>
          </nav>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}