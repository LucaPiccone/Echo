import { NextResponse } from 'next/server';
import { CreateAccountInteractor } from '@/src/use_cases/create_account/createAccountInteractor';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await CreateAccountInteractor(body);
        return NextResponse.json({ message: 'success' }, { status: 201 });    
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.status });
    }
}
