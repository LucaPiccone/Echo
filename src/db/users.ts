import { sql } from './client';

export const Users = {
  async create(first_name: string, last_name: string, email: string, password_hash: string) {
    const [user] = await sql`
      INSERT INTO users (first_name, last_name, email, password_hash)
      VALUES (${first_name}, ${last_name}, ${email}, ${password_hash})
      RETURNING *
    `;
    return user;
  },

  async findByEmail(email: string) {
    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
    return user;
  },

  async findById(id: string) {
    const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;
    return user;
  },

  async updateVerified(id: string, verified: boolean) {
    const [user] = await sql`
      UPDATE users
      SET verified = ${verified}, updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;
    return user;
  }
};
