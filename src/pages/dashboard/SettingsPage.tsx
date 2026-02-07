import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Crown, ShieldCheck, CreditCard } from 'lucide-react';
import { useAuth } from '@/store/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
export function SettingsPage() {
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
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-10 lg:py-12 space-y-12 font-karla">
      <header>
        <h1 className="font-space text-4xl text-brand-text font-bold uppercase tracking-wider mb-2">Atelier Settings</h1>
        <p className="text-brand-muted font-medium italic">Manage your account and subscription.</p>
      </header>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-brand-bg border border-brand-border p-1 rounded-xl mb-8 w-fit gap-1">
          <TabsTrigger value="account" className="font-bold tracking-widest uppercase text-[10px] data-[state=active]:bg-white data-[state=active]:text-brand-purple data-[state=active]:shadow-sm px-8 py-3 rounded-lg transition-all text-brand-muted">Account</TabsTrigger>
          <TabsTrigger value="security" className="font-bold tracking-widest uppercase text-[10px] data-[state=active]:bg-white data-[state=active]:text-brand-purple data-[state=active]:shadow-sm px-8 py-3 rounded-lg transition-all text-brand-muted">Security</TabsTrigger>
          <TabsTrigger value="subscription" className="font-bold tracking-widest uppercase text-[10px] data-[state=active]:bg-white data-[state=active]:text-brand-purple data-[state=active]:shadow-sm px-8 py-3 rounded-lg transition-all text-brand-muted">Subscription</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="bg-white border border-brand-border p-8 space-y-8 shadow-sm rounded-2xl">
            <div className="flex items-center gap-6 border-b border-brand-border pb-8">
              <div className="w-20 h-20 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple text-3xl font-bold border-2 border-white shadow-md">
                {fullName?.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-text uppercase">{fullName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-brand-purple/10 text-brand-purple font-bold tracking-widest text-[10px] px-2 py-0.5 rounded-full border border-brand-purple/20 uppercase">
                    {plan} Member
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Full Name</Label>
                <Input defaultValue={fullName} className="bg-brand-bg border-brand-border rounded-xl text-brand-text h-12" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Email Address</Label>
                <Input defaultValue={email} className="bg-brand-bg border-brand-border rounded-xl text-brand-text h-12" />
              </div>
            </div>
            <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white font-bold tracking-widest px-8 rounded-xl h-12 shadow-lg shadow-brand-purple/20">SAVE CHANGES</Button>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card className="bg-white border border-brand-border p-8 space-y-6 shadow-sm rounded-2xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Current Password</Label>
                <Input type="password" placeholder="••••••••" className="bg-brand-bg border-brand-border rounded-xl text-brand-text h-12" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">New Password</Label>
                <Input type="password" placeholder="••••••••" className="bg-brand-bg border-brand-border rounded-xl text-brand-text h-12" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Confirm New Password</Label>
                <Input type="password" placeholder="••••••••" className="bg-brand-bg border-brand-border rounded-xl text-brand-text h-12" />
              </div>
            </div>
            <Button variant="outline" className="border-brand-border text-brand-text font-bold tracking-widest px-8 rounded-xl h-12 hover:bg-brand-bg">UPDATE PASSWORD</Button>
          </Card>
        </TabsContent>
        <TabsContent value="subscription">
          <Card className="bg-white border border-brand-border p-8 space-y-8 shadow-sm rounded-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <p className="text-brand-muted font-medium italic">Your current plan is:</p>
                <h3 className="text-4xl font-bold text-brand-purple uppercase tracking-wider">{plan}</h3>
              </div>
              <Dialog open={isUpgradeOpen} onOpenChange={setIsUpgradeOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white font-bold tracking-widest px-8 rounded-xl h-12 shadow-lg shadow-brand-purple/20">UPGRADE PLAN</Button>
                </DialogTrigger>
                <DialogContent className="bg-white border-brand-border text-brand-text sm:max-w-[600px] rounded-3xl p-8">
                  <DialogHeader>
                    <DialogTitle className="font-bold uppercase tracking-widest text-brand-purple text-center text-2xl">Elite Memberships</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
                    {['Pro', 'Business'].map((tier) => (
                      <Card key={tier} className="bg-brand-bg border border-brand-border p-6 flex flex-col items-center gap-4 rounded-2xl transition-all hover:border-brand-purple/30">
                        <h4 className="font-bold tracking-widest uppercase text-brand-purple text-sm">{tier}</h4>
                        <div className="text-3xl font-bold text-brand-text">${tier === 'Pro' ? '12' : '49'}<span className="text-xs text-brand-muted">/mo</span></div>
                        <ul className="text-[10px] uppercase tracking-widest text-brand-muted space-y-3 text-center py-4 font-bold">
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-brand-lime-dark" /> Unlimited Links</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-brand-lime-dark" /> Custom Domains</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-brand-lime-dark" /> Advanced CRM</li>
                        </ul>
                        <Button onClick={() => handleUpgrade(tier as any)} className="w-full bg-brand-purple text-white rounded-xl font-bold tracking-widest text-[10px] h-10 shadow-md shadow-brand-purple/10">CHOOSE {tier}</Button>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="pt-8 border-t border-brand-border grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-blue-50 text-blue-500"><ShieldCheck className="w-5 h-5" /></div>
                 <div><p className="text-xs font-bold text-brand-text">Secure Billing</p><p className="text-[10px] text-brand-muted">Encrypted by Stripe</p></div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-brand-lime/10 text-brand-lime-dark"><Crown className="w-5 h-5" /></div>
                 <div><p className="text-xs font-bold text-brand-text">Priority Support</p><p className="text-[10px] text-brand-muted">24/7 Concierge</p></div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-orange-50 text-orange-500"><CreditCard className="w-5 h-5" /></div>
                 <div><p className="text-xs font-bold text-brand-text">Cancel Anytime</p><p className="text-[10px] text-brand-muted">No contracts</p></div>
               </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}