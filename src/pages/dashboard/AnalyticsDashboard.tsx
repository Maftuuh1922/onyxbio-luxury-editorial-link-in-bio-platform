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
  { name: 'Mobile', value: 78, color: '#8129D9' },
  { name: 'Desktop', value: 22, color: '#1E2330' },
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
      <div className="bg-white/95 backdrop-blur-md border border-brand-border p-4 shadow-2xl rounded-2xl">
        <p className="font-bold text-[10px] tracking-widest text-brand-muted uppercase mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="font-bold text-sm text-brand-text flex items-center justify-between gap-6">
            <span className="capitalize">{entry.name}:</span>
            <span className="text-brand-purple font-mono">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};
export function AnalyticsDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-12 font-karla">
      <header>
        <h1 className="font-space text-4xl text-brand-text font-bold uppercase tracking-wider mb-2">Deep Analytics</h1>
        <p className="text-brand-muted font-medium italic">Insights for the discerning creator.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Growth Score', value: '+24%', icon: ArrowUpRight, color: 'text-brand-lime-dark' },
          { label: 'Unique Curators', value: '8.4k', icon: Users, color: 'text-brand-purple' },
          { label: 'Global Rank', value: '#1,202', icon: Globe, color: 'text-blue-500' },
          { label: 'Avg Engagement', value: '4m 12s', icon: MousePointer2, color: 'text-orange-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-white border border-brand-border p-6 space-y-4 hover:border-brand-purple/20 transition-colors shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-muted uppercase">{stat.label}</span>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
              <p className="text-3xl font-bold text-brand-text">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card className="bg-white border border-brand-border p-8 shadow-sm">
        <h3 className="font-bold text-sm tracking-widest uppercase text-brand-purple mb-8">Traffic Flows</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8129D9" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#8129D9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E2DB" vertical={false} />
              <XAxis dataKey="date" stroke="#6A7280" fontSize={10} axisLine={false} tickLine={false} dy={10} fontWeight={600} />
              <YAxis stroke="#6A7280" fontSize={10} axisLine={false} tickLine={false} dx={-10} fontWeight={600} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" name="views" dataKey="views" stroke="#8129D9" fill="url(#viewsGrad)" strokeWidth={3} activeDot={{ r: 6, fill: '#8129D9' }} />
              <Area type="monotone" name="clicks" dataKey="clicks" stroke="#2D9E42" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white border border-brand-border p-8 shadow-sm">
          <h3 className="font-bold text-sm tracking-widest uppercase text-brand-purple mb-8">Audience Composition</h3>
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="h-[200px] w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deviceData} innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value" stroke="none">
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
                <div key={d.name} className="flex items-center gap-6 border-b border-brand-border pb-2 last:border-0">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: d.color }} />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-brand-text flex-1">{d.name}</span>
                  <span className="text-brand-purple font-bold text-xl">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card className="bg-white border border-brand-border p-8 shadow-sm">
          <h3 className="font-bold text-sm tracking-widest uppercase text-brand-purple mb-8">Top Regions</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#6A7280" fontSize={10} axisLine={false} tickLine={false} width={60} fontWeight={600} />
                <Tooltip cursor={{ fill: '#F6F7F5' }} content={<CustomTooltip />} />
                <Bar dataKey="value" name="visitors" fill="#8129D9" radius={[0, 8, 8, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}