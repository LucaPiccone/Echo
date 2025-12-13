import { neon } from '@neondatabase/serverless';


export async function GET(formData: FormData) {
    'use server';
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    const email = formData.get('email');
    const pass = formData.get('email');
    // Insert the comment from the form into the Postgres database
    const data = await sql`SELECT name FROM users WHERE name = ${email} AND password = ${pass}`;
    return new Response(JSON.stringify(data));
}