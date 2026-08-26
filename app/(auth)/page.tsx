'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  ChevronLeft,
  Scissors,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { PersianDatePicker } from '@/components/form/persian-date-picker';
import { jalaliToIso } from '@/lib/date-utils';
import FormProvider from '@/components/form/form-provider';
import RHFInput from '@/components/form/rhf-input';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useLogin, useSendOtp, useSignUp } from '@/services/features/auth/hooks';
import { sendOtpDto } from '@/services/features/auth/types';

export default function Login() {
  const [step, setStep] = useState<number>(1);
  const [code, setCode] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const sendOtpMutation = useSendOtp();
  const loginMutation = useLogin();
  const signUpMutation = useSignUp();

  const router = useRouter();

  const schema = z.object({
    phone: z
      .string()
      .length(11, 'شماره تلفن وارد شده اشتباه است.')
      .startsWith('09', 'شماره تلفن وارد شده اشتباه است.'),
  });

  const methods = useForm<sendOtpDto>({
    defaultValues: {
      phone: '',
    },
    resolver: zodResolver(schema),
  });

  const schemaInfo = z.object({
    fullName: z.string().nonempty('نام و نام خانوادگی اجباری است.'),
    birthDate: z.string().optional(),
  });

  const methodsInfo = useForm({
    defaultValues: {
      fullName: '',
      birthDate: '',
    },
    resolver: zodResolver(schemaInfo),
  });

  const onSubmit = async (data: sendOtpDto) => {
    try {
      const response = await sendOtpMutation.mutateAsync(data);
      const newUser = (response as any)?.data?.newUser ?? false;
      setIsNewUser(newUser);
      setStep(2);
    } catch {
      // خطا در ارسال OTP
    }
  };

  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // کاربر جدید → رفتن به مرحله ۳
    if (isNewUser) {
      setStep(3);
      return;
    }

    // کاربر قدیمی → ورود مستقیم
    try {
      await loginMutation.mutateAsync({
        code,
        phone: methods.getValues().phone,
      });
      router.push('/home');
    } catch (error: any) {
      if (error.status === 400) toast.error('کد وارد شده اشتباه است');
    }
  };

  const onSubmitSignUp = async (data: { fullName: string; birthDate: string }) => {
    try {
      await signUpMutation.mutateAsync({
        phone: methods.getValues().phone,
        code,
        fullName: data.fullName,
        birthDate: jalaliToIso(data.birthDate) || undefined,
      });
      toast.success('ثبت‌نام شما با موفقیت انجام شد!');
      router.push('/home');
    } catch (error: any) {
      if (error.status === 400) toast.error('خطا در ثبت‌نام. مجدداً تلاش کنید.');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-[45vh] bg-linear-to-br from-primary-600 to-teal-800 rounded-b-[40px] shadow-lg z-0">
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col min-h-dhv p-6">
        <div className="mt-8 mb-6 text-center text-white shrink-0">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-xl">
            <Sparkles className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2 drop-shadow-md">
            منشیم
          </h1>
          <p className="text-primary-100 text-sm font-medium opacity-90">
            سامانه هوشمند رزرو آنلاین آرایشگاه
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col animate-slide-up transition-all border border-white/50 relative mb-6">
          {step === 1 ? (
            <>
              <FormProvider
                methods={methods}
                onSubmit={onSubmit}
                className="space-y-4"
              >
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    ورود / عضویت
                  </h2>
                  <p className="text-gray-500 text-xs mt-2 leading-5">
                    برای استفاده از خدمات، لطفا شماره موبایل خود را وارد کنید
                  </p>
                </div>

                <RHFInput
                  label="شماره تلفن"
                  name="phone"
                  placeholder="شماره موبایل (۰۹۱۲...)"
                />
                <Button
                  type="submit"
                  loading={sendOtpMutation.isPending}
                  size="lg"
                  className="w-full"
                >
                  دریافت کد
                </Button>
              </FormProvider>
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center gap-3">
                <Link href="/barbaer-signup" className="w-full">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full p-1 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors group border border-orange-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg text-orange-500 shadow-sm">
                        <Scissors size={18} />
                      </div>
                      <span className="text-sm font-bold text-orange-700">
                        ثبت نام آرایشگران
                      </span>
                    </div>
                    <ChevronLeft
                      size={16}
                      className="text-orange-400 group-hover:-translate-x-1 transition-transform"
                    />
                  </button>
                </Link>
              </div>
            </>
          ) : step === 2 ? (
            <form onSubmit={onSubmitLogin} className="space-y-6">
              <div className="text-center relative">
                <button
                  onClick={() => setStep(1)}
                  className="absolute -top-2 right-0 text-gray-400 hover:text-gray-600 transition-colors p-2"
                >
                  <ArrowRight size={24} />
                </button>
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">کد تایید</h2>
                <p className="text-gray-500 text-xs mt-2">
                  کد ارسال شده به{' '}
                  <span className="font-bold text-gray-800 dir-ltr inline-block mx-1">
                    {methods.getValues('phone')}
                  </span>{' '}
                  را وارد کنید
                </p>
              </div>
              <InputOTP
                maxLength={4}
                value={code}
                onChange={value => setCode(value)}
                dir="ltr"
                id="input-otp-ltr"
              >
                <InputOTPGroup className="w-full gap-2 flex-row-reverse">
                  <InputOTPSlot
                    index={0}
                    className="w-full h-11 border rounded-md"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-full h-11 border rounded-md"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-full h-11 border rounded-md"
                  />
                  <InputOTPSlot
                    index={3}
                    className="w-full h-11 border rounded-md"
                  />
                </InputOTPGroup>
              </InputOTP>
              <Button
                type="submit"
                loading={loginMutation.isPending}
                disabled={code.length !== 4}
                size="lg"
                className="w-full"
              >
                {isNewUser ? 'ادامه' : 'ورود'}
              </Button>
            </form>
          ) : (
            <FormProvider
              methods={methodsInfo}
              onSubmit={onSubmitSignUp}
              className="space-y-6 animate-fade-in"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 pb-1 pl-1.5">
                  <UserPlus size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  تکمیل اطلاعات
                </h2>
                <p className="text-gray-500 text-xs mt-2">
                  لطفا اطلاعات خود را تکمیل کنید.
                </p>
              </div>

              <RHFInput type="text" name="fullName" label="نام و نام خانوادگی" />

              <PersianDatePicker
                name="birthDate"
                label="تاریخ تولد"
                placeholder="انتخاب تاریخ تولد"
              />

              <Button
                type="submit"
                loading={signUpMutation.isPending}
                size="lg"
                className="w-full"
              >
                ثبت نام و ورود
              </Button>
            </FormProvider>
          )}
        </div>
      </div>
    </div>
  );
}
