import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { warehouses } from "./warehouseSchema.ts";

export const locations = pgTable("locations", {
    id: serial("id").primaryKey(),
    warehouse_code: varchar("warehouse_code").references(() => warehouses.code).notNull(),
    name: varchar("name").notNull(),
    code: varchar("code").unique().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});
