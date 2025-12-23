// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/src/app/lib/session'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Public routes
  const isAuthPage =
    pathname === '/' || pathname === '/create-account'

  const sessionCookie = req.cookies.get('session')?.value
  let isAuthenticated = false

  if (sessionCookie) {
    try {
      const session = await decrypt(sessionCookie)
      isAuthenticated = !!session?.session_id
    } catch {
      isAuthenticated = false
    }
  }

  // 🚫 Logged-in users shouldn't see auth pages
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/echo', req.url))
  }

  // 🔐 Logged-out users shouldn't see app pages
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/create-account',
    '/((?!api|_next|favicon.ico).*)',
  ],
}
