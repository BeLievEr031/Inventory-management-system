import { pgTable, serial, varchar, timestamp, integer, date, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./userSchema.ts";
import { productInform } from "./productSchema.ts";
import { warehouses } from "./warehouseSchema.ts";
import { locations } from "./locationSchema.ts";

export const deliveryStatusEnum = pgEnum("delivery_status", ["Draft", "Waiting", "Ready", "Done"]);

export const deliveries = pgTable("deliveries", {
    id: serial("id").primaryKey(),
    reference: varchar("reference").unique().notNull(), // e.g. WH/OUT/0001
    delivery_address: varchar("delivery_address").notNull(), // "To" in wireframe
    contact_name: varchar("contact_name"), // "Contact" in wireframe
    schedule_date: date("schedule_date").notNull(),
    total_quantity: integer("total_quantity").default(0).notNull(),
    status: deliveryStatusEnum("status").default("Draft").notNull(),
    operation_type: varchar("operation_type").default("Outgoing").notNull(),
    responsible_user: integer("responsible_user").references(() => users.id).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const deliveryProduct = pgTable("delivery_product", {
    id: serial("id").primaryKey(),
    delivery_id: integer("delivery_id").references(() => deliveries.id, { onDelete: 'cascade' }).notNull(),
    product_id: integer("product_id").references(() => productInform.id).notNull(),
    quantity: integer("quantity").notNull(),
    warehouse_code: varchar("warehouse_code").references(() => warehouses.code).notNull(), // "From" in wireframe
    location_code: varchar("location_code").references(() => locations.code).notNull(),  // "From" in wireframe
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});
