import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./userSchema.ts";

export const warehouses = pgTable("warehouses", {
    id: serial("id").primaryKey(),
    name: varchar("name").unique().notNull(),
    code: varchar("code").unique().notNull(),
    user_id: integer("user_id").references(() => users.id).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});
