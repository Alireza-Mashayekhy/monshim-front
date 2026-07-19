import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function AppCard({ children, className }: Props) {
  return (
    <div
      className={cn(
        `rounded-[28px] border bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,.08)] active:scale-[.98]`,
        className,
      )}
    >
      {children}
    </div>
  );
}
