import { deleteSession } from "@/src/app/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    const cookieStore = await cookies();

    // Get the user_id cookie
    const userId = await cookieStore.get('user_id')?.value;

    if (!userId) {
        throw new Error('No user_id found in cookies');
    }

    await deleteSession(userId);

    return NextResponse.json(
        { message: 'success' }, 
        { status: 201 }
    );
}