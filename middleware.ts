import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/dang-tin',
  '/quan-ly-tin',
  '/tai-khoan',
  '/yeu-thich',
  '/cai-dat',
  '/goi-dich-vu',
  '/luu-tru',
];

// Admin routes (require admin role)
const adminRoutes = [
  '/admin/dashboard',
  '/admin/properties',
  '/admin/users',
  '/admin/orders',
  '/admin/settings',
];

// Auth routes (should not be accessible when logged in)
const authRoutes = ['/dang-nhap', '/dang-ky', '/quen-mat-khau'];

// Helper to decode JWT payload (without verification - just for reading claims)
function decodeJwtPayload(token: string): any {
  try {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64').toString('utf-8');
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the token from cookies
  const token = request.cookies.get('accessToken')?.value;
  
  // Check if user is authenticated
  const isAuthenticated = !!token;
  
  // Decode token to get user role (if authenticated)
  let userRole: string | null = null;
  if (token) {
    const payload = decodeJwtPayload(token);
    userRole = payload?.role || null;
    
    // Check if token is expired
    if (payload?.exp && payload.exp * 1000 < Date.now()) {
      // Token expired - clear and redirect to login
      const response = NextResponse.redirect(new URL('/dang-nhap', request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }
  }
  
  // Check route types
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAuthRoute = authRoutes.some(route => pathname === route);
  
  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/dang-nhap', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Admin routes protection
  if (isAdminRoute) {
    if (!isAuthenticated) {
      // Not logged in - redirect to admin login
      const adminLoginUrl = new URL('/admin/login', request.url);
      adminLoginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(adminLoginUrl);
    }
    
    if (userRole !== 'admin') {
      // Logged in but not admin - redirect to home with error
      return NextResponse.redirect(new URL('/?error=unauthorized', request.url));
    }
  }
  
  // Redirect to home if accessing auth routes while authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};
