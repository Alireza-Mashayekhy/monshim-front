// app/(dashboard)/services/page.tsx
'use client';

import { Banknote, Clock, Edit, Plus, Scissors, Trash2 } from 'lucide-react';
import { useState } from 'react';

import DashboardShell from '@/components/dashboard/layout/dashboard-shell';
import { ServiceModal } from '@/components/dashboard/services/services-modal';
import AppCard from '@/components/shared/app-card';
import FadeIn from '@/components/shared/fade-in';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const handleDelete = (serviceId: string) => {
    console.log(serviceId);
  };

  const openModal = (service?: any) => {
    setEditingService(service || null);
    setIsModalOpen(true);
  };

  return (
    <DashboardShell>
      <FadeIn>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">مدیریت خدمات</h2>
            <p className="text-sm text-gray-500">5 خدمت فعال</p>
          </div>
          <Button onClick={() => openModal()} className="gap-2">
            <Plus size={16} /> افزودن
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="space-y-3">
          {[0, 1].map(service => (
            <AppCard
              key={service}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-200">
                  <Scissors size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">سرویس</h4>
                  <div className="flex gap-3 text-xs text-gray-500 mt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> 45 دقیقه
                    </span>
                    <span className="flex items-center gap-1 text-primary-700 font-bold">
                      <Banknote size={12} /> {formatPrice(100000)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-600 hover:bg-blue-50"
                  onClick={() => openModal(service)}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => handleDelete(service.toString())}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </AppCard>
          ))}
          {false && (
            <p className="text-gray-400 text-center py-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              هیچ خدمتی ثبت نشده است.
            </p>
          )}
        </div>
      </FadeIn>

      <ServiceModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingService={editingService}
      />
    </DashboardShell>
  );
}
