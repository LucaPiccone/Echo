import { getUser } from "@/src/app/lib/dal";
import { deleteSession } from "@/src/app/lib/session";
import { NextResponse } from 'next/server';


export async function POST(request: Request) {

    const user = await getUser();

    console.log(user)

    if (!user) {
        return NextResponse.json({ error: 'No user' }, { status: 500 });
    }    
    await deleteSession(user.id);

    return NextResponse.json({ message: 'success' }, { status: 201 });
}