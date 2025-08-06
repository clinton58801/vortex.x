import { NextResponse } from 'next/server';

const PROTECTED_PATHS = [
  '/file-brain',
  '/deepseek',
  '/admin/dashboard',
  '/settings',
];

export function middleware(request) {
  const url = request.nextUrl.clone();
  const userStatus = request.cookies.get('user_status')?.value || 'free';

  if (PROTECTED_PATHS.includes(url.pathname)) {
    if (userStatus !== 'pro' && userStatus !== 'premium') {
      url.pathname = '/upgrade';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/file-brain',
    '/deepseek',
    '/admin/dashboard',
    '/settings',
  ],
};
