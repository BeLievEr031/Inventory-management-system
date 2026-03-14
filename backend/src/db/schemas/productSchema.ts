import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./userSchema.ts";
import { warehouses } from "./warehouseSchema.ts";
import { locations } from "./locationSchema.ts";

export const productInform = pgTable("product_inform", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    sku: varchar("sku").notNull(),
    category: varchar("category").notNull(),
    warehouse_code: varchar("warehouse_code").references(() => warehouses.code).notNull(),
    location_code: varchar("location_code").references(() => locations.code).notNull(),
    user_id: integer("user_id").references(() => users.id).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const productQuantity = pgTable("product_quantity", {
    id: serial("id").primaryKey(),
    quantity: integer("quantity").default(0).notNull(),
    product_id: integer("product_id").references(() => productInform.id, { onDelete: 'cascade' }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});
