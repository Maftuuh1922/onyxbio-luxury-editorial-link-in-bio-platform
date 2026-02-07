import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Link as LinkIcon, Palette, BarChart2, Settings, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/store/useAuth';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
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
  const user = useAuth((s) => s.user);
  const plan = useAuth((s) => s.plan);
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-onyx-dark text-onyx-white font-sans">
        <Sidebar className="border-r border-white/5 bg-onyx-secondary">
          <SidebarHeader className="p-6">
            <Link to="/" className="font-ornament text-onyx-gold text-xl tracking-[0.3em]">ONYXBIO</Link>
          </SidebarHeader>
          <SidebarContent className="px-4">
            <div className="mb-8 p-4 bg-white/5 border border-white/5 rounded-lg space-y-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-onyx-gold flex items-center justify-center text-onyx-dark font-display">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <div className="truncate">
                  <p className="text-sm font-medium text-onyx-white truncate">{user?.fullName}</p>
                  <p className="text-[10px] text-onyx-gold tracking-widest uppercase">{plan} PLAN</p>
                </div>
              </div>
            </div>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path} className={cn("flex items-center gap-3 px-4 py-3 rounded-md transition-all", location.pathname === item.path ? "bg-onyx-gold/10 text-onyx-gold" : "text-onyx-gray hover:text-onyx-white hover:bg-white/5")}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-ornament tracking-widest text-xs uppercase">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-white/5">
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-onyx-gray hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-ornament tracking-widest text-xs uppercase">Logout</span>
            </button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-[#0c0c0c]">
          <header className="flex h-16 items-center border-b border-white/5 px-6 shrink-0">
             <SidebarTrigger className="text-onyx-gold" />
             <div className="ml-auto flex items-center gap-4">
                <Link to={`/${user?.username}`} target="_blank" className="text-xs font-ornament text-onyx-gold hover:text-onyx-gold-light tracking-widest uppercase border border-onyx-gold/20 px-3 py-1 rounded">View Live Bio</Link>
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