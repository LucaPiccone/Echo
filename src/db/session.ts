import { sql } from './client';

export const Sessions = {
  async create(user_id: string, expires_at: Date) {
    const [session] = await sql`
      INSERT INTO session (expires_at, user_id)
      VALUES (${expires_at}, ${user_id})
      RETURNING *
    `;
    return session;
  },

  // Find all sessions for a user
//   async findByUserId(user_id: string) {
//     const session = await sql`
//       SELECT * FROM session WHERE user_id = ${user_id}
//     `;
//     return session;
//   },

  // Delete all sessions for a user (logout everywhere)
//   async deleteByUserId(user_id: string) {
//     const session = await sql`
//       DELETE FROM session WHERE user_id = ${user_id}
//       RETURNING *
//     `;
//     return session;
//   },
};
