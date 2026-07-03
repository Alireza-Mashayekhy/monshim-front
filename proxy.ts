// proxy.ts
import { decodeJwt } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

// مسیرهای عمومی که نیازی به توکن ندارند
const PUBLIC_PATHS = ['/', '/barbaer-signup'];

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const pathname = request.nextUrl.pathname;

  // 1. اگر توکن وجود ندارد
  if (!token && !refreshToken) {
    if (
      PUBLIC_PATHS.some(
        path => pathname === path || pathname.startsWith(path + '/'),
      )
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const payload = decodeJwt(token);
    const roles = payload?.roles as string[] | string | undefined;

    // تبدیل roles به آرایه (اگر رشته باشد)
    let roleArray: string[] = [];
    if (Array.isArray(roles)) {
      roleArray = roles;
    } else if (typeof roles === 'string') {
      roleArray = [roles];
    }

    if (roleArray.length === 0 && !refreshToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // 2. اگر کاربر با توکن به صفحه اصلی رفت → به /home هدایت شود
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/home', request.url));
    }

    // 3. بررسی دسترسی به مسیرهای ادمین
    if (pathname.startsWith('/admin')) {
      const allowedRoles = ['admin', 'editor'];
      const hasAccess = roleArray.some(role => allowedRoles.includes(role));
      if (!hasAccess) {
        return NextResponse.redirect(new URL('/panel', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('❌ Invalid or expired token:', error);
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    return response;
  }
}

// پیکربندی مسیرهایی که proxy روی آنها اجرا شود
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
