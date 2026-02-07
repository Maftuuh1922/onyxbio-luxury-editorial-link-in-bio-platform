import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { Globe, Smartphone, MousePointer2, Users, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
const trafficData = [
  { date: 'Oct 01', views: 1200, clicks: 800 },
  { date: 'Oct 02', views: 1900, clicks: 1100 },
  { date: 'Oct 03', views: 1500, clicks: 950 },
  { date: 'Oct 04', views: 2100, clicks: 1400 },
  { date: 'Oct 05', views: 2500, clicks: 1700 },
  { date: 'Oct 06', views: 3200, clicks: 2100 },
  { date: 'Oct 07', views: 2800, clicks: 1900 },
];
const deviceData = [
  { name: 'Mobile', value: 78, color: '#c9a961' },
  { name: 'Desktop', value: 22, color: '#2a2a2a' },
];
const regionData = [
  { name: 'USA', value: 450 },
  { name: 'UK', value: 320 },
  { name: 'France', value: 280 },
  { name: 'Japan', value: 190 },
];
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-onyx-dark/90 backdrop-blur-md border border-onyx-gold/20 p-4 shadow-2xl">
        <p className="font-ornament text-[10px] tracking-widest text-onyx-gray uppercase mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="font-display text-sm text-onyx-white flex items-center justify-between gap-4">
            <span className="capitalize">{entry.name}:</span>
            <span className="text-onyx-gold">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};
export function AnalyticsDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-12">
      <header>
        <h1 className="font-display text-4xl text-onyx-white uppercase tracking-wider mb-2">Deep Analytics</h1>
        <p className="text-onyx-gray font-serif italic">Insights for the discerning creator.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Growth Score', value: '+24%', icon: ArrowUpRight, color: 'text-green-400' },
          { label: 'Unique Curators', value: '8.4k', icon: Users, color: 'text-onyx-gold' },
          { label: 'Global Rank', value: '#1,202', icon: Globe, color: 'text-blue-400' },
          { label: 'Avg Engagement', value: '4m 12s', icon: MousePointer2, color: 'text-purple-400' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-onyx-secondary border-white/5 p-6 space-y-4 hover:border-onyx-gold/20 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-ornament text-[10px] tracking-[0.2em] text-onyx-gray uppercase">{stat.label}</span>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
              <p className="text-3xl font-display text-onyx-white">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card className="bg-onyx-secondary border-white/5 p-8">
        <h3 className="font-ornament text-sm tracking-widest uppercase text-onyx-gold mb-8">Traffic Flows</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a961" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#c9a961" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="date" stroke="#666" fontSize={10} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke="#666" fontSize={10} axisLine={false} tickLine={false} dx={-10} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" name="views" dataKey="views" stroke="#c9a961" fill="url(#viewsGrad)" strokeWidth={2} activeDot={{ r: 6, fill: '#c9a961' }} />
              <Area type="monotone" name="clicks" dataKey="clicks" stroke="#e8e8e8" fill="transparent" strokeWidth={1} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-onyx-secondary border-white/5 p-8">
          <h3 className="font-ornament text-sm tracking-widest uppercase text-onyx-gold mb-8">Audience Composition</h3>
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="h-[200px] w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deviceData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 w-full md:w-auto">
              {deviceData.map((d) => (
                <div key={d.name} className="flex items-center gap-4 border-b border-white/5 pb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="font-ornament text-[10px] tracking-widest uppercase text-onyx-white flex-1">{d.name}</span>
                  <span className="text-onyx-gold font-display text-xl">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card className="bg-onyx-secondary border-white/5 p-8">
          <h3 className="font-ornament text-sm tracking-widest uppercase text-onyx-gold mb-8">Top Regions</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#666" fontSize={10} axisLine={false} tickLine={false} width={60} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} content={<CustomTooltip />} />
                <Bar dataKey="value" name="visitors" fill="#c9a961" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}