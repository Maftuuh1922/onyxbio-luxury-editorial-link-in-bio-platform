import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { Globe, Smartphone, MousePointer2, Users, ArrowUpRight, Download, FileText, Sparkles, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useProfile } from '@/store/useProfile';
import { toast } from 'sonner';
const trafficData = [
  { date: 'Oct 01', views: 1200, clicks: 800 },
  { date: 'Oct 02', views: 1900, clicks: 1100 },
  { date: 'Oct 03', views: 1500, clicks: 950 },
  { date: 'Oct 04', views: 2100, clicks: 1400 },
  { date: 'Oct 05', views: 2500, clicks: 1700 },
  { date: 'Oct 06', views: 3200, clicks: 2100 },
  { date: 'Oct 07', views: 2800, clicks: 1900 },
];
export function AnalyticsDashboard() {
  const links = useProfile(s => s.links);
  const handleExport = (format: string) => {
    toast.success(`Exporting as ${format}...`, {
      description: "Your comprehensive link audit is being prepared.",
      className: "font-karla font-bold"
    });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-12 font-karla">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-space text-4xl text-brand-text font-bold uppercase tracking-wider mb-2">Editorial Intel</h1>
          <p className="text-brand-muted font-medium italic">High-fidelity metrics for your digital portfolio.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('CSV')} className="rounded-xl border-brand-border h-12 px-6 font-bold text-xs uppercase tracking-widest hover:bg-brand-bg transition-all">
            <FileText className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Button onClick={() => handleExport('PDF')} className="bg-brand-purple text-white rounded-xl h-12 px-6 font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-purple/20 hover:scale-105 transition-all">
            <Download className="w-4 h-4 mr-2" /> PDF Report
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Growth Score', value: '+24%', icon: ArrowUpRight, color: 'text-brand-lime-dark' },
          { label: 'Total Links', value: links.length.toString(), icon: Users, color: 'text-brand-purple' },
          { label: 'Global Rank', value: '#1,202', icon: Globe, color: 'text-blue-500' },
          { label: 'Conversion', value: '12.4%', icon: TrendingUp, color: 'text-orange-500' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="bg-white border border-brand-border p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-muted uppercase">{stat.label}</span>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
              <p className="text-3xl font-bold text-brand-text">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-white border border-brand-border p-8 shadow-sm">
          <h3 className="font-bold text-sm tracking-widest uppercase text-brand-purple mb-8">Link Performance Audit</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-brand-border pb-4">
                  <th className="text-[10px] font-bold uppercase tracking-widest text-brand-muted py-4">Link Title</th>
                  <th className="text-[10px] font-bold uppercase tracking-widest text-brand-muted py-4">Type</th>
                  <th className="text-[10px] font-bold uppercase tracking-widest text-brand-muted py-4">Clicks</th>
                  <th className="text-[10px] font-bold uppercase tracking-widest text-brand-muted py-4">CTR</th>
                  <th className="text-[10px] font-bold uppercase tracking-widest text-brand-muted py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {links.map((link) => (
                  <tr key={link.id} className="group hover:bg-brand-bg/50 transition-colors">
                    <td className="py-4 font-bold text-xs text-brand-text">{link.title}</td>
                    <td className="py-4"><span className="text-[9px] font-bold bg-brand-bg text-brand-muted px-2 py-0.5 rounded-full uppercase">{link.type}</span></td>
                    <td className="py-4 font-bold text-xs text-brand-text">{(Math.random() * 500).toFixed(0)}</td>
                    <td className="py-4 font-bold text-xs text-brand-purple">{(Math.random() * 15 + 2).toFixed(1)}%</td>
                    <td className="py-4 text-[10px] font-bold text-brand-lime-dark uppercase">Healthy</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <div className="space-y-8">
          <Card className="bg-brand-purple text-white p-8 border-none shadow-xl shadow-brand-purple/20 relative overflow-hidden">
             <Sparkles className="absolute -top-4 -right-4 w-24 h-24 opacity-10" />
             <h3 className="font-bold text-sm tracking-widest uppercase mb-4">AI Editorial Insights</h3>
             <p className="text-sm font-medium leading-relaxed opacity-90 italic">
               "Your 'LIMITED EDITION PRINT' link is performing 42% better than your baseline. Consider moving it to the top position or adding a 'Spotlight' effect to maximize conversions this weekend."
             </p>
             <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Onyx Intelligence V2</span>
                <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-white" />
                   <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                   <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>
             </div>
          </Card>
          <Card className="bg-white border border-brand-border p-8 shadow-sm">
             <h3 className="font-bold text-sm tracking-widest uppercase text-brand-muted mb-6">Traffic Composition</h3>
             <div className="space-y-4">
                {[
                  { label: 'Direct Traffic', value: 65, color: 'bg-brand-purple' },
                  { label: 'Social Referral', value: 25, color: 'bg-blue-500' },
                  { label: 'Email Links', value: 10, color: 'bg-brand-lime-dark' }
                ].map(item => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                       <span>{item.label}</span>
                       <span className="text-brand-purple">{item.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-brand-bg rounded-full overflow-hidden">
                       <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}