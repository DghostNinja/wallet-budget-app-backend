import { neon } from "@neondatabase/serverless";
import "dotenv/config";

export const sql = neon(process.env.DATABASE_URL); //creating SQL connection

export async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    // 10 is the total number of digits, 2 is the number of digits after the           decimal point
    // DECIMAL(10,2) means that the amount can be up to 99999999.99
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // 1 MEANS FAILURE 0 MEANS SUCCESS
  }
}
