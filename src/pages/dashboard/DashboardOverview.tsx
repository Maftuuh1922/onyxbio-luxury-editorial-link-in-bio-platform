import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { Eye, MousePointer2, Link as LinkIcon, TrendingUp, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
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
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-brand-border p-4 shadow-xl rounded-2xl">
        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
            <span className="text-xs font-bold text-brand-text flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
              {p.name}
            </span>
            <span className="text-xs font-bold font-karla text-brand-text">{p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};
export function DashboardOverview() {
  const navigate = useNavigate();
  const links = useProfile(useShallow(s => s.links));
  const activeLinksCount = React.useMemo(() => links.filter(l => l.active).length, [links]);
  const stats = [
    { label: 'Total Views', value: '1,284', trend: '+12.5%', isUp: true, icon: Eye, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
    { label: 'Total Clicks', value: '842', trend: '+8.2%', isUp: true, icon: MousePointer2, color: 'text-brand-lime-dark', bg: 'bg-brand-lime/10' },
    { label: 'Avg CTR', value: '65.5%', trend: '-2.1%', isUp: false, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Active Links', value: activeLinksCount.toString(), trend: '+1', isUp: true, icon: LinkIcon, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto font-karla">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-text flex items-center gap-3">
            Atelier Overview <Sparkles className="w-6 h-6 text-brand-purple/40" />
          </h1>
          <p className="text-brand-muted text-sm font-medium">Insights and growth metrics for your digital legacy.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-brand-border bg-white text-brand-text hover:bg-brand-bg shadow-sm transition-all active:scale-95">Share Profile</Button>
          <Button
            onClick={() => navigate('/dashboard/links')}
            className="bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-xl px-6 shadow-lg shadow-brand-purple/20 transition-all hover:scale-105 active:scale-95"
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
            <Card className="bg-white border border-brand-border shadow-sm p-6 hover:shadow-md transition-all group cursor-default relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={cn("p-2 rounded-lg", s.bg)}>
                  <s.icon className={cn("w-5 h-5", s.color)} />
                </div>
                <div className={cn("flex items-center text-xs font-bold", s.isUp ? "text-brand-lime-dark" : "text-red-500")}>
                  {s.trend} {s.isUp ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                </div>
              </div>
              <p className="text-3xl font-bold text-brand-text group-hover:translate-x-1 transition-transform origin-left relative z-10">{s.value}</p>
              <p className="text-xs font-bold text-brand-muted uppercase tracking-wider mt-1 relative z-10">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-white border border-brand-border shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-brand-text">Traffic Performance</h3>
            <select className="text-xs font-bold border border-brand-border bg-brand-bg text-brand-text rounded-lg p-2 focus:ring-2 focus:ring-brand-purple/20 outline-none cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8129D9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8129D9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E2DB" vertical={false} />
                <XAxis dataKey="name" stroke="#6A7280" fontSize={11} tickLine={false} axisLine={false} dy={10} fontWeight={600} />
                <YAxis stroke="#6A7280" fontSize={11} tickLine={false} axisLine={false} dx={-10} fontWeight={600} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  name="Views"
                  dataKey="views"
                  stroke="#8129D9"
                  fillOpacity={1}
                  fill="url(#colorPurple)"
                  strokeWidth={4}
                  dot={{ r: 4, fill: '#8129D9', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#8129D9', strokeWidth: 2, stroke: '#fff' }}
                />
                <Area
                  type="monotone"
                  name="Clicks"
                  dataKey="clicks"
                  stroke="#2D9E42"
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="bg-white border border-brand-border shadow-sm p-8">
          <h3 className="font-bold text-brand-text mb-6">Recent Curator Activity</h3>
          <div className="space-y-6">
            {[
              { title: 'Portfolio Click', detail: 'Visitor from Tokyo clicked "My Portfolio"', time: '2M AGO' },
              { title: 'New Subscriber', detail: 'Email captured via "Contact" gateway', time: '14M AGO' },
              { title: 'Social Discovery', detail: 'Referral traffic from Instagram Stories', time: '1H AGO' },
              { title: 'Global View', detail: 'Profile visited from London, UK', time: '3H AGO' }
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-brand-bg transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand-purple/5 flex items-center justify-center shrink-0 border border-brand-purple/10">
                   <TrendingUp className="w-4 h-4 text-brand-purple" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-brand-text font-bold">{log.title}</p>
                  <p className="text-[11px] text-brand-muted truncate leading-relaxed">{log.detail}</p>
                  <p className="text-[9px] text-brand-muted font-bold mt-1 uppercase tracking-tighter">{log.time}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-brand-purple text-xs font-bold hover:bg-brand-purple/5 mt-4 rounded-xl border border-brand-border transition-all">
              View Detailed Audit Log
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}