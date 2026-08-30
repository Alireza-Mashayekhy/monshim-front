'use client';

import {
  Calendar,
  Headphones,
  Home,
  LayoutDashboard,
  Search,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

import { useAuthStore } from '@/store/auth.store';

interface UserLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export default function UserLayout({
  children,
  showNav = true,
}: UserLayoutProps) {
  const pathname = usePathname();

  const user = useAuthStore(state => state.user);

  // بررسی ارایشگر بودن کاربر (پشتیبانی از رشته و آرایه)
  const isBarber = useMemo(() => {
    if (!user || Array.isArray(user)) return false;

    const roles = user.roles as string | string[] | undefined;

    if (!roles) return false;

    if (Array.isArray(roles)) {
      return roles.some(role => role?.toLowerCase().trim() === 'barber');
    }

    return roles
      .split(',')
      .some(role => role?.toLowerCase().trim() === 'barber');
  }, [user]);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center w-full">
      <div className="w-full bg-white shadow-xl min-h-screen relative flex flex-col">
        {/* Main Content */}
        <div className={`flex-1 overflow-y-auto ${showNav ? 'pb-20' : ''}`}>
          {children}
        </div>

        {/* Support */}
        {showNav && !isActive('/support') && (
          <Link href="/support">
            <button
              className="fixed bottom-20 right-4 z-40 bg-white text-primary-600 p-3 rounded-full shadow-lg border border-primary-100 active:scale-95 transition-transform"
              title="پشتیبانی آنلاین"
            >
              <Headphones size={24} />
            </button>
          </Link>
        )}

        {/* Bottom Navigation */}
        {showNav && (
          <div className="fixed bottom-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
            <Link
              href="/home"
              className={`flex flex-col items-center gap-1 ${
                isActive('/home') ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              <Home size={24} />
              <span className="text-xs">خانه</span>
            </Link>

            <Link
              href="/explore"
              className={`flex flex-col items-center gap-1 ${
                isActive('/explore') ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              <Search size={24} />
              <span className="text-xs">جستجو</span>
            </Link>

            <Link
              href="/appointments"
              className={`flex flex-col items-center gap-1 ${
                isActive('/appointments') ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              <Calendar size={24} />
              <span className="text-xs">نوبت‌های من</span>
            </Link>

            {isBarber && (
              <Link
                href="/dashboard"
                className={`flex flex-col items-center gap-1 ${
                  pathname.startsWith('/dashboard')
                    ? 'text-primary-600'
                    : 'text-gray-400'
                }`}
              >
                <LayoutDashboard size={24} />
                <span className="text-xs">داشبورد</span>
              </Link>
            )}

            <Link
              href="/profile"
              className={`flex flex-col items-center gap-1 ${
                isActive('/profile') ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              <User size={24} />
              <span className="text-xs">پروفایل</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
