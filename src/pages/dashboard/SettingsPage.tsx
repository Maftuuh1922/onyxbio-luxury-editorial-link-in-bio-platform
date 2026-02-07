import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/store/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
export function SettingsPage() {
  // ZUSTAND COMPLIANCE: One primitive per selector
  const fullName = useAuth((s) => s.user?.fullName);
  const email = useAuth((s) => s.user?.email);
  const plan = useAuth((s) => s.plan);
  const setPlan = useAuth((s) => s.setPlan);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const handleUpgrade = (tier: 'Pro' | 'Business') => {
    setPlan(tier);
    setIsUpgradeOpen(false);
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-10 lg:py-12 space-y-12">
      <header>
        <h1 className="font-display text-4xl text-onyx-white uppercase tracking-wider mb-2">Atelier Settings</h1>
        <p className="text-onyx-gray font-serif italic">Manage your account and subscription.</p>
      </header>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-onyx-secondary border border-white/5 p-1 rounded-none mb-8">
          <TabsTrigger value="account" className="font-ornament tracking-widest uppercase text-[10px] data-[state=active]:bg-onyx-gold data-[state=active]:text-onyx-dark px-8 py-3 rounded-none">Account</TabsTrigger>
          <TabsTrigger value="security" className="font-ornament tracking-widest uppercase text-[10px] data-[state=active]:bg-onyx-gold data-[state=active]:text-onyx-dark px-8 py-3 rounded-none">Security</TabsTrigger>
          <TabsTrigger value="subscription" className="font-ornament tracking-widest uppercase text-[10px] data-[state=active]:bg-onyx-gold data-[state=active]:text-onyx-dark px-8 py-3 rounded-none">Subscription</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="bg-onyx-secondary border-white/5 p-8 space-y-8">
            <div className="flex items-center gap-4 border-b border-white/5 pb-8">
              <div className="w-20 h-20 rounded-full bg-onyx-gold flex items-center justify-center text-onyx-dark text-3xl font-display">
                {fullName?.charAt(0)}
              </div>
              <div>
                <h3 className="font-display text-2xl text-onyx-white uppercase">{fullName}</h3>
                <p className="text-onyx-gold font-ornament tracking-widest text-[10px] uppercase">{plan} Member</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Full Name</Label>
                <Input defaultValue={fullName} className="bg-white/5 border-white/10 rounded-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Email Address</Label>
                <Input defaultValue={email} className="bg-white/5 border-white/10 rounded-none" />
              </div>
            </div>
            <Button className="bg-onyx-gold text-onyx-dark font-ornament tracking-widest px-8 rounded-none">SAVE CHANGES</Button>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card className="bg-onyx-secondary border-white/5 p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Current Password</Label>
                <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 rounded-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-onyx-gray">New Password</Label>
                <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 rounded-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-onyx-gray">Confirm New Password</Label>
                <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 rounded-none" />
              </div>
            </div>
            <Button className="bg-white/5 border border-white/10 text-onyx-white font-ornament tracking-widest px-8 rounded-none hover:bg-white/10">UPDATE PASSWORD</Button>
          </Card>
        </TabsContent>
        <TabsContent value="subscription">
          <Card className="bg-onyx-secondary border-white/5 p-8 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <p className="text-onyx-gray font-serif italic">Your current plan is:</p>
                <h3 className="text-4xl font-display text-onyx-gold uppercase tracking-wider">{plan}</h3>
              </div>
              <Dialog open={isUpgradeOpen} onOpenChange={setIsUpgradeOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-onyx-gold text-onyx-dark font-ornament tracking-widest px-8 rounded-none">UPGRADE PLAN</Button>
                </DialogTrigger>
                <DialogContent className="bg-onyx-secondary border-white/10 text-onyx-white sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="font-display uppercase tracking-widest text-onyx-gold text-center text-2xl">Elite Memberships</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
                    {['Pro', 'Business'].map((tier) => (
                      <Card key={tier} className="bg-white/5 border-white/10 p-6 flex flex-col items-center gap-4">
                        <h4 className="font-ornament tracking-widest uppercase text-onyx-gold">{tier}</h4>
                        <div className="text-3xl font-display">${tier === 'Pro' ? '12' : '49'}<span className="text-xs text-onyx-gray">/mo</span></div>
                        <ul className="text-[10px] uppercase tracking-widest text-onyx-gray space-y-2 text-center py-4">
                          <li>Unlimited Links</li>
                          <li>Custom Domains</li>
                          <li>Advanced CRM</li>
                        </ul>
                        <Button onClick={() => handleUpgrade(tier as any)} className="w-full bg-onyx-gold text-onyx-dark rounded-none font-ornament tracking-widest text-[10px]">CHOOSE {tier}</Button>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}