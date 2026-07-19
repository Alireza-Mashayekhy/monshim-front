'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

const filters = ['امروز', 'فردا', 'این هفته'];

export default function AppointmentFilter() {
  const [selected, setSelected] = useState(filters[0]);

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {filters.map(item => (
        <button
          key={item}
          onClick={() => setSelected(item)}
          className={cn(
            'rounded-full px-5 py-2 whitespace-nowrap transition',
            item === selected
              ? 'bg-primary text-white'
              : 'bg-primary-50 text-primary',
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
