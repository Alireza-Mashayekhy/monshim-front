'use client';

import { Bell, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function MobileHeader() {
  return (
    <header className="lg:hidden sticky top-0 z-50 bg-white border-b h-16 px-4 flex items-center justify-between">
      <Button variant="ghost" size="icon">
        <Menu />
      </Button>

      <div className="text-center">
        <p className="text-xs text-slate-500">سلام 👋</p>

        <h2 className="font-bold">علیرضا</h2>
      </div>

      <Button variant="ghost" size="icon">
        <Bell />
      </Button>
    </header>
  );
}
