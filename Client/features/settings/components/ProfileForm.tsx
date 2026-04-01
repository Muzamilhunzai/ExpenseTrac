'use client';

import React, { memo, useState } from 'react';
import { User, Edit2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import type { User as UserType } from '@/types/user';

interface ProfileFormProps {
  user: UserType | null;
  isLoading: boolean;
  isSaving: boolean;
  onSave: (data: { name: string; email: string }) => void;
}

export const ProfileForm = memo(function ProfileForm({
  user,
  isLoading,
  isSaving,
  onSave,
}: ProfileFormProps) {
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <section className="md:col-span-8 bg-surface-container p-8 neon-border-primary rounded-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors pointer-events-none" />
      <h2 className="font-headline font-bold text-lg mb-8 flex items-center gap-2 uppercase tracking-wider">
        <User size={18} className="text-primary" />
        Identity Profile
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Avatar */}
        <div className="relative group/avatar shrink-0">
          <div className="w-28 h-28 rounded-full border-2 border-primary overflow-hidden shadow-neon-primary">
            {isLoading ? (
              <Skeleton className="w-full h-full rounded-full" />
            ) : user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary text-4xl font-headline font-black">
                {user?.name.charAt(0) ?? 'U'}
              </div>
            )}
          </div>
          <button
            className="absolute bottom-0 right-0 p-2 bg-background border border-primary text-primary rounded-full hover:bg-primary hover:text-on-primary transition-all shadow-neon-primary-sm"
            aria-label="Change avatar"
          >
            <Edit2 size={12} />
          </button>
        </div>

        {/* Fields */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {isLoading ? (
            <>
              <Skeleton className="h-10 rounded" />
              <Skeleton className="h-10 rounded" />
              <Skeleton className="h-6 w-48 sm:col-span-2" />
            </>
          ) : (
            <>
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="sm:col-span-2">
                <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest mb-1">
                  Current Status
                </p>
                <p className="text-secondary font-label text-xs tracking-tight neon-text-secondary">
                  Active Financial Node — Level {user?.clearanceLevel} Clearance
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8 pt-6 border-t border-outline-variant/20">
        <Button
          variant="primary"
          isLoading={isSaving}
          onClick={() => onSave({ name, email })}
          disabled={isLoading}
        >
          Save Profile
        </Button>
      </div>
    </section>
  );
});
