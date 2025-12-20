import { LoginInteractor } from '@/src/use_cases/login/loginInteractor';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const response = NextResponse.json({ message: 'success' }, { status: 201 });
        await LoginInteractor(body, response);
        return response;    
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.status });
    }
}
