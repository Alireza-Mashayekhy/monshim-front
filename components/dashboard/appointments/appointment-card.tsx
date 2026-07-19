import { Check, MessageCircle, Phone } from 'lucide-react';

import AppCard from '@/components/shared/app-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AppointmentCard() {
  return (
    <AppCard>
      <div className="flex justify-between items-start">
        <div>
          <Badge className="rounded-full bg-green-100 text-green-700">
            امروز
          </Badge>

          <h3 className="mt-4 text-xl font-bold">علی رضایی</h3>

          <p className="text-slate-500">اصلاح مو + ریش</p>
        </div>

        <div className="text-left">
          <h3 className="text-2xl font-bold">09:30</h3>

          <p className="text-slate-500">45 دقیقه</p>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="font-bold">۳۵۰,۰۰۰ تومان</span>

        <div className="flex gap-2">
          <Button variant="secondary" size="icon" className="rounded-full">
            <Phone size={18} />
          </Button>

          <Button variant="secondary" size="icon" className="rounded-full">
            <MessageCircle size={18} />
          </Button>

          <Button size="icon" className="rounded-full">
            <Check size={18} />
          </Button>
        </div>
      </div>
    </AppCard>
  );
}
