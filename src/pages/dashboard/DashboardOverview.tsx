import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MousePointer2, Link as LinkIcon, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  { name: 'Mon', views: 400, clicks: 240 },
  { name: 'Tue', views: 300, clicks: 139 },
  { name: 'Wed', views: 200, clicks: 980 },
  { name: 'Thu', views: 278, clicks: 390 },
  { name: 'Fri', views: 189, clicks: 480 },
  { name: 'Sat', views: 239, clicks: 380 },
  { name: 'Sun', views: 349, clicks: 430 },
];
const stats = [
  { label: 'Total Views', value: '1,284', icon: Eye, color: 'text-blue-400' },
  { label: 'Total Clicks', value: '842', icon: MousePointer2, color: 'text-onyx-gold' },
  { label: 'Avg CTR', value: '65.5%', icon: TrendingUp, color: 'text-green-400' },
  { label: 'Active Links', value: '8', icon: LinkIcon, color: 'text-purple-400' },
];
export function DashboardOverview() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-onyx-white uppercase tracking-wider">Overview</h1>
          <p className="text-onyx-gray font-serif italic">Your digital presence at a glance.</p>
        </div>
        <Button className="bg-onyx-gold hover:bg-onyx-gold-light text-onyx-dark font-ornament tracking-widest px-6">
          + ADD NEW LINK
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-onyx-secondary border-white/5 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-ornament text-[10px] tracking-[0.2em] text-onyx-gray uppercase">{s.label}</span>
                <s.icon className={cn("w-4 h-4", s.color)} />
              </div>
              <p className="text-3xl font-display text-onyx-white">{s.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card className="bg-onyx-secondary border-white/5 p-8">
        <h3 className="font-ornament text-sm tracking-widest uppercase text-onyx-gold mb-8">Performance Flow</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a961" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#c9a961" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#e8e8e8' }}
                itemStyle={{ color: '#c9a961' }}
              />
              <Area type="monotone" dataKey="views" stroke="#c9a961" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-onyx-secondary border-white/5 p-8 space-y-6">
          <h3 className="font-ornament text-sm tracking-widest uppercase text-onyx-gold">Top Performing Links</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-onyx-dark border border-onyx-gold/20 flex items-center justify-center text-onyx-gold font-ornament">{i}</div>
                  <div>
                    <p className="text-sm font-medium text-onyx-white">Portfolio Website</p>
                    <p className="text-[10px] text-onyx-gray uppercase">alexonyx.design</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-display text-onyx-gold">432 Clicks</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="bg-onyx-secondary border-white/5 p-8 space-y-6">
          <h3 className="font-ornament text-sm tracking-widest uppercase text-onyx-gold">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 text-sm font-serif italic text-onyx-gray border-l-2 border-onyx-gold/30 pl-4 py-1">
                <span className="text-xs font-ornament not-italic text-onyx-gray-dark">2h ago</span>
                <p>New view from <span className="text-onyx-white">Instagram / Mobile</span></p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}