import gregorian from 'react-date-object/calendars/gregorian';
import persian from 'react-date-object/calendars/persian';
import { DateObject } from 'react-multi-date-picker';

/**
 * تبدیل تاریخ میلادی (ISO: YYYY-MM-DD) به شمسی (YYYY/MM/DD)
 */
export function isoToJalali(isoDate: string | null | undefined): string {
  if (!isoDate) return '';

  try {
    const date = new DateObject({
      date: isoDate,
      calendar: gregorian,
    });

    const jalali = date.convert(persian);

    return `${jalali.year}/${String(jalali.month).padStart(2, '0')}/${String(
      jalali.day,
    ).padStart(2, '0')}`;
  } catch {
    return '';
  }
}

/**
 * تبدیل تاریخ شمسی (YYYY/MM/DD) به میلادی (YYYY-MM-DD)
 */
export function jalaliToIso(
  jalaliDate: string | null | undefined,
): string | null {
  if (!jalaliDate) return null;

  try {
    const [year, month, day] = jalaliDate.split('/').map(Number);

    if (!year || !month || !day) return null;

    const date = new DateObject({
      year,
      month,
      day,
      calendar: persian,
    });

    const gregorianDate = date.convert(gregorian);

    return `${gregorianDate.year}-${String(gregorianDate.month).padStart(
      2,
      '0',
    )}-${String(gregorianDate.day).padStart(2, '0')}`;
  } catch {
    return null;
  }
}
