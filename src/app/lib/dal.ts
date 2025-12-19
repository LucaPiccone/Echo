import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from '@/src/app/lib/session';
import { redirect } from 'next/navigation';
import { Users } from '@/src/db/users';
import { Sessions } from '@/src/db/session';
 
// DATA ACCESS LAYER
export const verifySession = async () => {
    const cookieStore = await cookies();
    const sessionToken = await cookieStore.get('session')?.value;
    if (!sessionToken) {
      redirect('/');
    }

    const session = await decrypt(sessionToken);
    if (!session?.session_id) {
      redirect('/');
    }

    const dbSession = await Sessions.findBySessionId(session.session_id);
    if (!dbSession) {
      redirect('/');
    }

    const isExpired = new Date(dbSession.expires_at) < new Date();
    const userId = dbSession.user_id;
    if (isExpired) {
      await Sessions.deleteByUserId(userId.toString());
      cookieStore.delete('session');
      cookieStore.delete('user_id');
      redirect('/');
    }

    return { isAuth: true, sessionId: sessionToken, userId: userId};
};

export const getUser = async () => {
    const session = await verifySession();
    console.log(session)

    if (!session) return null;
  
    try {
      return Users.findById(session.userId)
    } catch (error) {
      console.log('Failed to fetch user')
      return null
    }
}