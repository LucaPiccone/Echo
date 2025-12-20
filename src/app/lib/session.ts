import { cookies } from 'next/headers'
import { Sessions } from '@/src/db/session'
import { NextResponse } from 'next/server';

// ENCRYPT THE SESSION 
const SECRET_KEY = process.env.SESSION_SECRET!;

// app/lib/session.ts

import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
 
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
 
export async function encrypt(payload: { session_id: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}
 
export async function decrypt(token?: string) {
    if (!token) return null;
    try {
      const { payload } = await jwtVerify(token, encodedKey, {
        algorithms: ['HS256'],
      });

      return payload as { session_id: string };
    } catch {
      return null;
    }
}

// CREATE THE SESSION
export async function createSession(userId: number, res: NextResponse) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //7 days
  
    // 1. Create a session in the database
    const data = await Sessions.create(userId.toString(), expiresAt);
    const session_id = data.id;

    // 2. Encrypt the session ID
    const session = await encrypt({ session_id: session_id });

    // 3. Store the session in cookies for optimistic auth checks
    // const cookieStore = await cookies();
    // cookieStore.set('session', session, {
    //   httpOnly: true,
    //   secure: true,
    //   // secure: process.env.NODE_ENV === 'production', // only secure in production change it to true
    //   expires: expiresAt,
    //   sameSite: 'lax',
    //   path: '/',
    // });
    // 3. Attach the cookie to the response
    res.cookies.set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    });
}

export async function deleteSession(userId: string, res: NextResponse) {
    await Sessions.deleteByUserId(userId.toString())
    // const cookieStore = await cookies();
    // cookieStore.delete('session');
    res.cookies.delete('session');
}