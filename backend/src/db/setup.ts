import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createTables = async () => {
    const client = await pool.connect();
    try {
        console.log("🚀 Starting database initialization...");

        // Order is important due to foreign key constraints
        const queries = [
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                login_id VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL
            );`,
            `CREATE TABLE IF NOT EXISTS warehouses (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                code VARCHAR(255) UNIQUE NOT NULL,
                user_id INTEGER REFERENCES users(id) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL
            );`,
            `CREATE TABLE IF NOT EXISTS locations (
                id SERIAL PRIMARY KEY,
                warehouse_code VARCHAR(255) REFERENCES warehouses(code) NOT NULL,
                name VARCHAR(255) NOT NULL,
                code VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL
            );`,
            `CREATE TABLE IF NOT EXISTS product_inform (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                sku VARCHAR(255) UNIQUE NOT NULL,
                category VARCHAR(255) NOT NULL,
                warehouse_code VARCHAR(255) REFERENCES warehouses(code) NOT NULL,
                location_code VARCHAR(255) REFERENCES locations(code) NOT NULL,
                user_id INTEGER REFERENCES users(id) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL
            );`,
            `CREATE TABLE IF NOT EXISTS product_quantity (
                id SERIAL PRIMARY KEY,
                quantity INTEGER DEFAULT 0 NOT NULL,
                product_id INTEGER REFERENCES product_inform(id) ON DELETE CASCADE NOT NULL,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL
            );`
        ];

        for (const query of queries) {
            await client.query(query);
            console.log(`✅ Table initialized: ${query.split(' ')[5]}`);
        }

        console.log("✨ database initialization completed successfully.");
    } catch (error) {
        console.error("❌ Error initializing database:", error);
    } finally {
        client.release();
        await pool.end();
    }
};

createTables();
