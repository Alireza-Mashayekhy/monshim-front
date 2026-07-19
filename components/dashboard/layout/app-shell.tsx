import BottomNavigation from './bottom-navigation';
import DesktopSidebar from './desktop-sidebar';
import MobileHeader from './mobile-header';

interface Props {
  children: React.ReactNode;
}

export default function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <DesktopSidebar />

      <div className="lg:mr-60">
        <MobileHeader />

        <main className="p-2 lg:p-5 pb-24 lg:pb-8">{children}</main>
      </div>

      <BottomNavigation />
    </div>
  );
}
