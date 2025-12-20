import { getUser } from "@/src/app/lib/dal";
import { deleteSession } from "@/src/app/lib/session";
import { InternalServerError, SessionNotFoundError } from "@/src/errors/errors";
import { NextResponse } from "next/server";

export async function LogoutInteractor(res: NextResponse) {
    const user = await getUser();

    if (!user) throw new SessionNotFoundError('Can not find User.')
  
    try {
        await deleteSession(user.id, res);
    } catch (err) {
        throw new InternalServerError("Logout failed.");
    }
}
