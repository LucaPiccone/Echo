import { getUser } from "@/src/app/lib/dal";
import { deleteSession } from "@/src/app/lib/session";
import { LogoutInteractor } from "@/src/use_cases/logout/logoutInteractor";
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
        await LogoutInteractor();
        return NextResponse.json({ message: 'success' }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.status });
    }
}