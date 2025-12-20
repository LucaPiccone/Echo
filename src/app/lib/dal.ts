import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from '@/src/app/lib/session';
import { redirect } from 'next/navigation';
import { Sessions } from '@/src/db/session';
import { DBUserDataAccessObject } from '@/src/db/users/DBUserDataAccessObject';
 
// DATA ACCESS LAYER
export const verifySession = async (res?: NextResponse) => {
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
      res.cookies.delete('session');
      redirect('/');

    }

    return { isAuth: true, sessionId: sessionToken, userId: userId};
};

export const getUser = async () => {
    const session = await verifySession();
    if (!session) return null;
  
    try {
      return DBUserDataAccessObject.findById(session.userId)
    } catch (error) {
      console.log('Failed to fetch user')
      return null
    }
}