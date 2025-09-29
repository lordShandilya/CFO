import * as SQLite from "expo-sqlite";

export type ExpenseProps = {
  id?: number;
  description: string;
  amount: number;
  category: string;
  date: string;
};

let db: SQLite.SQLiteDatabase;

export async function initDB() {
  db = await SQLite.openDatabaseAsync("expenses.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      amount REAL,
      category TEXT,
      date TEXT
    );
  `);
}

export async function addExpense(expense: ExpenseProps) {
  const { description, amount, category, date } = expense;
  try {
    await db.runAsync(
      `INSERT INTO expenses (description, amount, category, date) VALUES (?, ?, ?, ?);`,
      [description, amount, category, date]
    );
  } catch (err) {
    console.error("Error inserting expense:", err);
  }
}

export async function getExpenses() {
    try {
        const rows: ExpenseProps[] = await db.getAllAsync(
            `SELECT * FROM expenses`
        );
        
        return rows
    } catch (err) {
        console.error("Error fectching expenses", err);
        return [];
    }
}