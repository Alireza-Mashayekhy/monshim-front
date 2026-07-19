import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

export default function AppointmentSearch() {
  return (
    <div className="relative">
      <Search
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />

      <Input placeholder="جستجوی مشتری..." className="rounded-2xl pr-10 h-12" />
    </div>
  );
}
