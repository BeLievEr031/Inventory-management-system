import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log("🔫🔫 db url", process.env.DATABASE_URL)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Database connected successfully");
        client.release();
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};