'use client';

import { useEffect } from 'react';

import { useMe } from '@/services/features/auth/hooks';
import { UserResponse } from '@/services/features/auth/types';
import { useAuthStore } from '@/store/auth.store';

type Props = {
  children: React.ReactNode;
  initialUser: UserResponse | null;
};

export default function AuthProvider({ children, initialUser }: Props) {
  const setUser = useAuthStore(state => state.setUser);

  const { data } = useMe();
  const user = data?.data ?? initialUser ?? null;

  // بازتاب دادن کاربر در استور (برای مصرف‌کننده‌های قدیمی استور)
  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return children;
}
