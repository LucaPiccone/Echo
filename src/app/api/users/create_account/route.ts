import bcrypt from 'bcryptjs';

import { Users } from '@/src/db/users';

import { createSession } from '@/src/app/lib/session';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const first_name = String(body.first_name).trim();
        const last_name = String(body.last_name).trim();
        const email = String(body.email).trim();
        const password = String(body.password).trim();
        const confirmPassword = String(body.confirmPassword).trim();

        // check if fields are empty
        if (!email || !password || !first_name || !confirmPassword || !last_name) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if password == confirmPassword 
        if (password !== confirmPassword) {
            return Response.json({ error: 'Password do not match' }, { status: 400 });
        }

        // Check if email is already registerd
        const existing = await Users.findByEmail(email);
        if (existing && existing.id) {
            return Response.json({ error: 'An account with this email already exists' }, { status: 400 });
        }

        // Encrpyt Password, create user, return success or try fails
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create(first_name, last_name, email, hashedPassword)

        const sessionToken = await createSession(user.id)

        return NextResponse.json(
            { message: 'success' }, 
            { status: 201 }
        );


    } catch(err: any) {
        return Response.json(
            { error: 'Server Error' },
            { status: 500 }
        );
    }
}
