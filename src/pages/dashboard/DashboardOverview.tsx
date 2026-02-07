import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, MousePointer2, Link as LinkIcon, TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useProfile } from '@/store/useProfile';
import { cn } from '@/lib/utils';
const data = [
  { name: 'Mon', views: 400, clicks: 240 },
  { name: 'Tue', views: 300, clicks: 139 },
  { name: 'Wed', views: 800, clicks: 580 },
  { name: 'Thu', views: 678, clicks: 390 },
  { name: 'Fri', views: 989, clicks: 780 },
  { name: 'Sat', views: 1239, clicks: 880 },
  { name: 'Sun', views: 1349, clicks: 930 },
];
export function DashboardOverview() {
  const navigate = useNavigate();
  const links = useProfile((s) => s.links);
  const activeLinksCount = React.useMemo(() => links.filter(l => l.active).length, [links]);
  const stats = [
    { label: 'Total Views', value: '1,284', trend: '+12.5%', isUp: true, icon: Eye, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
    { label: 'Total Clicks', value: '842', trend: '+8.2%', isUp: true, icon: MousePointer2, color: 'text-brand-lime', bg: 'bg-brand-lime/10' },
    { label: 'Avg CTR', value: '65.5%', trend: '-2.1%', isUp: false, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Active Links', value: activeLinksCount.toString(), trend: '+1', isUp: true, icon: LinkIcon, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-text">Dashboard</h1>
          <p className="text-brand-muted text-sm font-medium">Welcome back to your OnyxBio workspace.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-gray-200">Share Profile</Button>
          <Button
            onClick={() => navigate('/dashboard/links')}
            className="bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-xl px-6"
          >
            Add New Link
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-white border-none shadow-sm p-6 hover:shadow-md transition-shadow group cursor-default">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-lg", s.bg)}>
                  <s.icon className={cn("w-5 h-5", s.color)} />
                </div>
                <div className={cn("flex items-center text-xs font-bold", s.isUp ? "text-brand-lime" : "text-red-500")}>
                  {s.trend} {s.isUp ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                </div>
              </div>
              <p className="text-3xl font-bold text-brand-text group-hover:scale-105 transition-transform origin-left">{s.value}</p>
              <p className="text-xs font-bold text-brand-muted uppercase tracking-wider mt-1">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-white border-none shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-brand-text">Traffic Overview</h3>
            <select className="text-xs font-bold border-none bg-gray-50 rounded-lg p-2 focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBrand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8129D9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8129D9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" vertical={false} />
                <XAxis dataKey="name" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="views" stroke="#8129D9" fillOpacity={1} fill="url(#colorBrand)" strokeWidth={3} dot={{ r: 4, fill: '#8129D9', strokeWidth: 2, stroke: '#fff' }} />
                <Area type="monotone" dataKey="clicks" stroke="#43E660" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="bg-white border-none shadow-sm p-8">
          <h3 className="font-bold text-brand-text mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                   <TrendingUp className="w-4 h-4 text-brand-lime" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-brand-text font-bold">New click recorded</p>
                  <p className="text-[10px] text-brand-muted truncate">Someone clicked your "Portfolio" link from Instagram.</p>
                  <p className="text-[9px] text-brand-muted mt-1 uppercase">2 MINUTES AGO</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-brand-purple text-xs font-bold hover:bg-brand-purple/5 mt-4">View All Logs</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}