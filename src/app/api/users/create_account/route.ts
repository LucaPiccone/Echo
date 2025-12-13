import { neon } from '@neondatabase/serverless';
import { match } from 'assert';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { json } from 'stream/consumers';

export async function POST(req: Request) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const body = await req.json();
    const email = String(body.email);
    const name = String(body.name);
    const password = String(body.password);
    const confirmPassword = String(body.confirmPassword);

    // check if fields are empty
    if (!email || !password || !name || !confirmPassword) {
        console.log('empty fields')
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if password == confirmPassword 
    console.log(confirmPassword)
    console.log(password)
    if (!(password == confirmPassword)) {
        console.log('passwords dont match')
        return Response.json({ error: 'Password do not match' }, { status: 400 });
    }

    // Check if email is already registerd
    const existing = await sql`SELECT email FROM users WHERE email = ${email};`;
    if (existing.length > 0) {
        console.log('already exists')
        return Response.json({ error: 'An account with this email already exists' }, { status: 400 });
    }

    // Encrpyt Password
        const hashedPassword = await bcrypt.hash(password, 10);

    await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;
    return new Response(JSON.stringify([{'name': 'luca'}]), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}
