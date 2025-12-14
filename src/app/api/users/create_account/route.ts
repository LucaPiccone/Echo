import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(response: Request) {
    try {
        const body = await response.json();
        const email = String(body.email);
        const name = String(body.name);
        const password = String(body.password);
        const confirmPassword = String(body.confirmPassword);

        // check if fields are empty
        if (!email || !password || !name || !confirmPassword) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if password == confirmPassword 
        if (!(password == confirmPassword)) {
            return Response.json({ error: 'Password do not match' }, { status: 400 });
        }

        // Check if email is already registerd
        const existing = await sql`SELECT email FROM users WHERE email = ${email};`;
        if (existing.length > 0) {
            return Response.json({ error: 'An account with this email already exists' }, { status: 400 });
        }

        // Encrpyt Password
        const hashedPassword = await bcrypt.hash(password, 10);

        await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;
        
        return Response.json(
                    {message: 'success'},
                    {status: 201}
        );

    } catch(err: any) {
        return Response.json(
            { error: 'Server Error' },
            { status: 409 }
        );
    }
}
