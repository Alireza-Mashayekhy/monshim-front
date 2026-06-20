import React from 'react';
import { Home, Calendar, User, Search, Headphones } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface UserLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export default function UserLayout({
  children,
  showNav = true,
}: UserLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center w-full">
      <div className="w-full max-w-md bg-white shadow-xl min-h-screen relative flex flex-col">
        {/* Main Content Area */}
        <div className={`flex-1 overflow-y-auto ${showNav ? 'pb-20' : ''}`}>
          {children}
        </div>

        {/* Global Support FAB */}
        {showNav && (
          <button
            onClick={() => navigate('/mobile/support')}
            className="fixed bottom-20 right-4 z-40 bg-white text-primary-600 p-3 rounded-full shadow-lg border border-primary-100 active:scale-95 transition-transform"
            title="پشتیبانی آنلاین"
          >
            <Headphones size={24} />
          </button>
        )}

        {/* Bottom Navigation */}
        {showNav && (
          <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
            <Link
              to="/mobile"
              className={`flex flex-col items-center gap-1 ${isActive('/mobile') ? 'text-primary-600' : 'text-gray-400'}`}
            >
              <Home size={24} />
              <span className="text-xs">خانه</span>
            </Link>
            <Link
              to="/mobile/explore"
              className={`flex flex-col items-center gap-1 ${isActive('/mobile/explore') ? 'text-primary-600' : 'text-gray-400'}`}
            >
              <Search size={24} />
              <span className="text-xs">جستجو</span>
            </Link>
            <Link
              to="/mobile/appointments"
              className={`flex flex-col items-center gap-1 ${isActive('/mobile/appointments') ? 'text-primary-600' : 'text-gray-400'}`}
            >
              <Calendar size={24} />
              <span className="text-xs">نوبت‌ها</span>
            </Link>
            <Link
              to="/mobile/profile"
              className={`flex flex-col items-center gap-1 ${isActive('/mobile/profile') ? 'text-primary-600' : 'text-gray-400'}`}
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
