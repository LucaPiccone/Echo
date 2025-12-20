import { NextResponse } from 'next/server';
import { CreateAccountInteractor } from '@/src/use_cases/create_account/createAccountInteractor';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const response = NextResponse.json({ message: 'success' }, { status: 201 });

        await CreateAccountInteractor(body, response);
        return response;    
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.status });
    }
}
