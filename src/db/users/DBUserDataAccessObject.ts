import { sql } from '../client';
import { User } from '@/src/entities/users/users';

export const DBUserDataAccessObject = {
    async create(user: User): Promise<Record<string, any>> {
        const [dbUser] = await sql`INSERT INTO users (first_name, last_name, email, password_hash)
        VALUES (${user.getFirstName()}, ${user.getLastName()}, ${user.getEmail()}, 
        ${user.getPassword()}) RETURNING *`;
        return dbUser;
    },

    async findByEmail(email: string):  Promise<Record<string, any>> {
        const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
        return user;
    },

    async findById(id: string) {
      const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;
      return user;
    },

  // async updateVerified(id: string, verified: boolean) {
  //   const [user] = await sql`
  //     UPDATE users
  //     SET verified = ${verified}, updated_at = now()
  //     WHERE id = ${id}
  //     RETURNING *
  //   `;
  //   return user;
  // }
};
