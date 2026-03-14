import { pgTable, serial, varchar, timestamp, integer, date, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./userSchema.ts";
import { productInform } from "./productSchema.ts";
import { warehouses } from "./warehouseSchema.ts";
import { locations } from "./locationSchema.ts";

export const transferStatusEnum = pgEnum("transfer_status", ["Draft", "Done"]);

export const transfers = pgTable("transfers", {
    id: serial("id").primaryKey(),
    reference: varchar("reference").unique().notNull(), // e.g. WH/INT/0001
    source_warehouse_code: varchar("source_warehouse_code").references(() => warehouses.code).notNull(),
    source_location_code: varchar("source_location_code").references(() => locations.code).notNull(),
    destination_warehouse_code: varchar("destination_warehouse_code").references(() => warehouses.code).notNull(),
    destination_location_code: varchar("destination_location_code").references(() => locations.code).notNull(),
    schedule_date: date("schedule_date").notNull(),
    status: transferStatusEnum("status").default("Draft").notNull(),
    responsible_user: integer("responsible_user").references(() => users.id).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const transferProduct = pgTable("transfer_product", {
    id: serial("id").primaryKey(),
    transfer_id: integer("transfer_id").references(() => transfers.id, { onDelete: 'cascade' }).notNull(),
    product_id: integer("product_id").references(() => productInform.id).notNull(),
    quantity: integer("quantity").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});
