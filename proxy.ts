// proxy.ts
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

// ─── فقط صفحه لاگین و ثبت‌نام عمومی هستند ───
const PUBLIC_PATHS = ['/', '/barbaer-signup'];

// ─── مسیرهای استاتیک ───
const STATIC_PATHS = ['/_next', '/favicon.ico', '/robots.txt', '/sitemap.xml'];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    path => pathname === path || pathname.startsWith(path + '/'),
  );
}

function isStaticPath(pathname: string): boolean {
  return STATIC_PATHS.some(
    path => pathname === path || pathname.startsWith(path + '/'),
  );
}

/**
 * استخراج نقش‌ها از payload توکن
 */
function extractRoles(payload: any): string[] {
  const roles = payload?.roles;
  if (Array.isArray(roles)) {
    return roles.map((r: string) => r?.toLowerCase().trim()).filter(Boolean);
  }
  if (typeof roles === 'string') {
    return roles
      .split(',')
      .map((r: string) => r?.toLowerCase().trim())
      .filter(Boolean);
  }
  return [];
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const pathname = request.nextUrl.pathname;

  // ─── مسیرهای استاتیک: بدون بررسی ───
  if (isStaticPath(pathname)) {
    return NextResponse.next();
  }

  // ─── تلاش برای verify کردن access token ───
  let roleArray: string[] = [];
  let accessTokenValid = false;
  let userPayload: Record<string, any> | null = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
      const { payload } = await jwtVerify(token, secret);
      roleArray = extractRoles(payload);
      userPayload = payload as Record<string, any>;
      accessTokenValid = true;
    } catch {
      // token منقضی یا نامعتبر
    }
  }

  // ─── هیچ توکنی معتبر نیست ───
  if (!accessTokenValid && !refreshToken) {
    if (isPublicPath(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ─── کاربر لاگین‌کرده (توکن یا رفرش داره) نباید به صفحات auth بره ───
  if (isPublicPath(pathname)) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // ─── access token نامعتبر ولی refresh token وجود دارد ───
  // برای مسیرهای محافظت‌شده باید access token معتبر باشه تا نقش‌ها بررسی بشه
  if (!accessTokenValid && refreshToken) {
    // مسیرهای محافظت‌شده نیاز به access token معتبر دارن
    if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // سایر مسیرها عبور کنن (رفرش توسط فرانت‌اند انجام میشه)
    return NextResponse.next();
  }

  // ─── محافظت مسیرهای ادمین ───
  if (pathname.startsWith('/admin')) {
    const adminRoles = ['admin', 'editor'];
    const hasAccess = roleArray.some(role => adminRoles.includes(role));
    if (!hasAccess) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  // ─── محافظت مسیرهای داشبورد (فقط آرایشگر) ───
  if (pathname.startsWith('/dashboard')) {
    const hasAccess = roleArray.includes('barber');
    if (!hasAccess) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  // ─── ارسال اطلاعات کاربر از JWT به صورت header برای پر کردن store ───
  const response = NextResponse.next();
  if (userPayload) {
    const safePayload = {
      id: userPayload.id,
      fullName: userPayload.fullName,
      roles: userPayload.roles,
      birthDate: userPayload.birthDate,
      phone: userPayload.phone,
      isActive: userPayload.isActive,
    };
    response.headers.set('X-User-Payload', JSON.stringify(safePayload));
  }

  return response;
}

// ─── پیکربندی مسیرهایی که proxy روی آنها اجرا شود ───
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
