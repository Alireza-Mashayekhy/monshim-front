'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import FloatingActionButton from './floating-action-button';
import { dashboardRoutes } from './routes';

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 px-4 pb-4">
      <div className="relative">
        <FloatingActionButton />

        <div className="h-16 rounded-full bg-white/95 backdrop-blur-xl border shadow-xl ">
          <div className="grid grid-cols-5 h-full">
            {dashboardRoutes.map((item, index) => {
              const Icon = item.icon;

              const active =
                pathname === item.href || pathname.startsWith(item.href);

              if (index === 2) {
                return <div key={item.href} />;
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col justify-center items-center gap-1"
                >
                  <Icon
                    size={20}
                    className={cn(active ? 'text-primary' : 'text-slate-400')}
                  />

                  <span
                    className={cn(
                      'text-[10px]',
                      active ? 'text-primary' : 'text-slate-400',
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
