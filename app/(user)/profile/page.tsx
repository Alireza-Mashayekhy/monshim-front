// app/profile/page.tsx
'use client';

import { useState } from 'react';

import { EditProfileModal } from '@/components/pages/profile/editProfileModal';
import { FeedbackModal } from '@/components/pages/profile/feedBackModal';
import { SettingsMenu } from '@/components/pages/profile/settingMenu';
import { UserCard } from '@/components/pages/profile/userCard';
import { useMe } from '@/services/features/auth/hooks';

export default function ProfilePage() {
  const { data: user } = useMe();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  return (
    <div className="p-5 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">پروفایل من</h1>

      <UserCard user={user} onEdit={() => setShowEditModal(true)} />

      <SettingsMenu
        onFeedback={() => setShowFeedbackModal(true)}
        onSupport={() => {}}
        onShare={() => {}}
        onLogout={() => {}}
      />

      <div className="mt-8 text-center text-xs text-gray-400">
        نسخه ۱.۳.۰ | توسعه داده شده با ❤️
      </div>

      <EditProfileModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        user={user}
      />

      <FeedbackModal
        open={showFeedbackModal}
        onOpenChange={setShowFeedbackModal}
      />
    </div>
  );
}
