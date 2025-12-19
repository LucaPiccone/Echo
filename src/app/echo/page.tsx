import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";
import AppNav from '@/src/app/ui/appNav';

export const dynamic = 'force-dynamic'; // ensures server code runs every request
export const fetchCache = 'force-no-store';

export default async function Echo() {
    // Verify the session
    const session = await verifySession();
    if (!session) {
        redirect('/');
    } 

    return (
        <div>
            <AppNav/>
        </div>
    )
}