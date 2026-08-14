import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  createSubscriptionPlan,
  deleteSubscriptionPlan,
  getSubscriptionPlans,
  toggleSubscriptionPlan,
  updateSubscriptionPlan,
} from './api';
import { CreateSubscriptionPlanDto, UpdateSubscriptionPlanDto } from './types';

export const subscriptionKeys = {
  all: ['adminSubscriptions'] as const,
  list: () => [...subscriptionKeys.all, 'list'] as const,
};

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: subscriptionKeys.list(),
    queryFn: getSubscriptionPlans,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateSubscriptionPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateSubscriptionPlanDto) => createSubscriptionPlan(dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.all,
      });

      toast.success('پلن اشتراک با موفقیت ایجاد شد');
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'خطا در ایجاد پلن اشتراک');
    },
  });
}

export function useUpdateSubscriptionPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateSubscriptionPlanDto }) =>
      updateSubscriptionPlan(id, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.all,
      });

      toast.success('پلن اشتراک با موفقیت ویرایش شد');
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'خطا در ویرایش پلن اشتراک');
    },
  });
}

export function useDeleteSubscriptionPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubscriptionPlan,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.all,
      });

      toast.success('پلن اشتراک حذف شد');
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'خطا در حذف پلن اشتراک');
    },
  });
}

export function useToggleSubscriptionPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleSubscriptionPlan,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.all,
      });

      toast.success('وضعیت پلن تغییر کرد');
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'خطا در تغییر وضعیت پلن');
    },
  });
}
