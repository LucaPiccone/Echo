import 'server-only';
 import { cache } from 'react';
import { cookies } from 'next/headers';
import { decrypt } from '@/src/app/lib/session';
import { redirect } from 'next/navigation';
import { Users } from '@/src/db/users';
 
// DATA ACCESS LAYER
// DATA ACCESS LAYER
export const verifySession = async () => {
  const cookieStore = await cookies();
  const sessionToken = await cookieStore.get('session')?.value;

  console.log('session cookie:', sessionToken);

  const session = await decrypt(sessionToken);
  console.log('decrypted session:', session);

  if (!session?.session_id) {
    redirect('/');
  }

  return { isAuth: true, userId: session.sessionId };
};

export const getUser = async () => {
  const session = await verifySession();
  if (!session) return null;
 
  try {
    return Users.findById(session.userId)
  } catch (error) {
    console.log('Failed to fetch user')
    return null
  }
}