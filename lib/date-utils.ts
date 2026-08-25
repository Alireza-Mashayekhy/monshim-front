// lib/date-utils.ts
// توابع کمکی برای تبدیل فرمت تاریخ شمسی ↔ میلادی

import persian from 'react-date-object/calendars/persian';

import { DateObject } from 'react-multi-date-picker';

/**
 * تبدیل تاریخ میلادی (ISO: YYYY-MM-DD) به شمسی (YYYY/MM/DD)
 * برای نمایش در فیلدهای ورودی
 */
export function isoToJalali(isoDate: string | null | undefined): string {
  if (!isoDate) return '';
  try {
    const date = new DateObject({ date: isoDate, calendar: persian });
    const year = date.year;
    const month = String(date.month).padStart(2, '0');
    const day = String(date.day).padStart(2, '0');
    return `${year}/${month}/${day}`;
  } catch {
    return '';
  }
}

/**
 * تبدیل تاریخ شمسی (YYYY/MM/DD) به میلادی (YYYY-MM-DD)
 * برای ارسال به سرور
 */
export function jalaliToIso(jalaliDate: string | null | undefined): string | null {
  if (!jalaliDate) return null;
  try {
    const [year, month, day] = jalaliDate.split('/').map(Number);
    const date = new DateObject({
      year,
      month,
      day,
      calendar: persian,
    });
    const gregorian = date.convert();
    const gYear = gregorian.year;
    const gMonth = String(gregorian.month).padStart(2, '0');
    const gDay = String(gregorian.day).padStart(2, '0');
    return `${gYear}-${gMonth}-${gDay}`;
  } catch {
    return null;
  }
}
