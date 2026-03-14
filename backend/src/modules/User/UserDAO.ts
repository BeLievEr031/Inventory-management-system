import { eq, or } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { users } from "../../db/schemas/userSchema.ts";
import type { IRegisterRequest } from "./UserInterface.ts";

class UserDAO {
    async createUser(userData: IRegisterRequest) {
        const [newUser] = await db.insert(users).values({
            login_id: userData.login_id,
            email: userData.email,
            password: userData.password as string,
        }).returning();
        return newUser;
    }

    async getUserByEmailOrLoginId(identifier: string) {
        const result = await db.select().from(users).where(
            or(
                eq(users.email, identifier),
                eq(users.login_id, identifier)
            )
        ).limit(1);
        return result[0] || null;
    }

    async updatePassword(id: number, newPasswordHashed: string) {
        const [updatedUser] = await db.update(users)
            .set({ password: newPasswordHashed, updated_at: new Date() })
            .where(eq(users.id, id))
            .returning();
        return updatedUser;
    }
}

export default UserDAO;
