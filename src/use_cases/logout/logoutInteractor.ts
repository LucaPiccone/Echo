import { getUser } from "@/src/app/lib/dal";
import { deleteSession } from "@/src/app/lib/session";
import { InternalServerError, SessionNotFoundError } from "@/src/errors/errors";

export async function LogoutInteractor() {
    const user = await getUser();

    if (!user) throw new SessionNotFoundError('Can not find User.')
  
    try {
        await deleteSession(user.id);
    } catch (err) {
        throw new InternalServerError("Logout failed.");
    }
}
