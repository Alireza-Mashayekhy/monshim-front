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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import FormProvider from '@/components/form/form-provider';
import RHFInput from '@/components/form/rhf-input';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useLogin, useSendOtp } from '@/services/features/auth/hooks';
import { sendOtpDto } from '@/services/features/auth/types';

export default function Login() {
  const [step, setStep] = useState<number>(1);
  const [code, setCode] = useState('');

  const sendOtpMutation = useSendOtp();
  const loginMutation = useLogin();

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
    name: z.string(),
  });

  const methodsInfo = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schemaInfo),
  });

  const onSubmit = async (data: sendOtpDto) => {
    try {
      sendOtpMutation.mutateAsync(data);
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      loginMutation.mutateAsync({ code, phone: methods.getValues().phone });
      setStep(3);
    } catch (error) {
      console.log(error);
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
                <Link href="/barbaer-signup" className="w-fit h-fit">
                  <Button type="button" variant="link">
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
                  </Button>
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
                maxLength={5}
                value={code}
                onChange={value => setCode(value)}
                dir="rtl"
              >
                <InputOTPGroup className="w-full gap-2 ">
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
                  <InputOTPSlot
                    index={4}
                    className="w-full h-11 border rounded-md"
                  />
                </InputOTPGroup>
              </InputOTP>
              <Button
                type="submit"
                loading={loginMutation.isPending}
                disabled={code.length !== 5}
                size="lg"
                className="w-full"
              >
                ارسال کد
              </Button>
            </form>
          ) : (
            <FormProvider
              methods={methodsInfo}
              onSubmit={() => {}}
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
                  لطفا نام و نام خانوادگی خود را وارد کنید.
                </p>
              </div>

              <RHFInput type="text" name="name" label="نام و نام خانوادگی" />

              <Button
                type="submit"
                loading={sendOtpMutation.isPending}
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
