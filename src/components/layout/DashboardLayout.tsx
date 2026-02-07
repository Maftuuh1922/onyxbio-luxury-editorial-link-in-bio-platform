import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Link as LinkIcon, Palette, BarChart2, Settings, LogOut, Copy, ExternalLink, HelpCircle, ChevronRight, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/store/useAuth';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  const plan = useAuth((s) => s.plan);
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-brand-bg font-karla">
        <Sidebar className="border-r border-gray-200 bg-white">
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
                <p className="text-xs text-brand-muted">@{username}</p>
              </div>
              <Button size="sm" variant="outline" className="w-full rounded-lg text-xs h-8 border-gray-200">
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
                        ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/20" 
                        : "text-brand-muted hover:bg-gray-50 hover:text-brand-text"
                    )}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="mt-8 p-4 bg-brand-lime/10 border border-brand-lime/20 rounded-xl space-y-3">
              <p className="text-xs font-bold text-brand-text">Upgrade to Pro</p>
              <p className="text-[10px] text-brand-muted leading-tight">Unlock custom domains, advanced analytics, and more.</p>
              <Button size="sm" className="w-full bg-brand-text text-white text-[10px] h-7 rounded-lg">Upgrade Now</Button>
            </div>
          </SidebarContent>
          <SidebarFooter className="p-4 space-y-1">
             <button className="flex items-center gap-3 w-full px-4 py-2 text-brand-muted hover:text-brand-text text-sm font-bold">
              <HelpCircle className="w-4 h-4" /> Help Center
            </button>
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-red-500 hover:text-red-600 text-sm font-bold">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-brand-bg flex flex-col">
          <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white/50 backdrop-blur-md px-6 sticky top-0 z-20">
             <div className="flex items-center gap-4">
               <SidebarTrigger className="text-brand-text" />
               <Separator orientation="vertical" className="h-6" />
               <div className="text-xs font-bold text-brand-muted flex items-center gap-2">
                 Pages <ChevronRight className="w-3 h-3" /> <span className="text-brand-text capitalize">{location.pathname.split('/').pop()}</span>
               </div>
             </div>
             <div className="flex items-center gap-4">
                <Link 
                  to={`/${username}`} 
                  target="_blank" 
                  className="hidden sm:flex items-center gap-2 text-xs font-bold bg-brand-lime text-brand-text px-4 py-2 rounded-xl shadow-sm hover:scale-105 transition-all"
                >
                  <ExternalLink className="w-3 h-3" /> Preview Bio
                </Link>
             </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}