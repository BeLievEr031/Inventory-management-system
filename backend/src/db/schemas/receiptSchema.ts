import { pgTable, serial, varchar, timestamp, integer, date, text, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./userSchema.ts";
import { productInform } from "./productSchema.ts";
import { warehouses } from "./warehouseSchema.ts";
import { locations } from "./locationSchema.ts";

export const receiptStatusEnum = pgEnum("receipt_status", ["Draft", "Ready", "Done"]);
export const receiptTypeEnum = pgEnum("receipt_type", ["Receipt"]);

export const receipts = pgTable("receipts", {
    id: serial("id").primaryKey(),
    supplier_name: varchar("supplier_name").notNull(),
    schedule_date: date("schedule_date").notNull(),
    total_quantity: integer("total_quantity").default(0).notNull(),
    status: receiptStatusEnum("status").default("Draft").notNull(),
    responsible_user: integer("responsible_user").references(() => users.id).notNull(),
    type: receiptTypeEnum("type").default("Receipt").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const receiptProduct = pgTable("receipt_product", {
    id: serial("id").primaryKey(),
    product_id: integer("product_id").references(() => productInform.id).notNull(),
    quantity: integer("quantity").notNull(),
    receipt_id: integer("receipt_id").references(() => receipts.id, { onDelete: 'cascade' }).notNull(),
    warehouse_code: varchar("warehouse_code").references(() => warehouses.code).notNull(),
    location_code: varchar("location_code").references(() => locations.code).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});
