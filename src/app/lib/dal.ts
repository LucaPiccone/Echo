import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from '@/src/app/lib/session';
import { redirect } from 'next/navigation';
import { Sessions } from '@/src/db/session';
import { DBUserDataAccessObject } from '@/src/db/users/DBUserDataAccessObject';
 
// DATA ACCESS LAYER
export const verifySession = async () => {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session')?.value;
    if (!sessionToken) {
      console.log('no cookie')
      redirect('/');
    }

    const session = await decrypt(sessionToken);
    if (!session?.session_id) {
      console.log('decrypt fail')
      redirect('/');
    }

    const dbSession = await Sessions.findBySessionId(session.session_id);
    if (!dbSession) {
      console.log('session does not exist in db.')
      redirect('/');
    }

    const isExpired = new Date(dbSession.expires_at) < new Date();
    const userId = dbSession.user_id;
    if (isExpired) {
      console.log('session expired')
      await Sessions.deleteByUserId(userId.toString());
      cookieStore.delete('session');
      redirect('/');
    }
    return { isAuth: true, userId: userId};
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