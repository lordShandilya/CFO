import * as sql from "expo-sqlite";

type ExpenseAttributes = {
    id?: number;
    description: string;
    amount: number;
    category: string;
    date: string;
}

const db = await sql.openDatabaseAsync('expenses.db')

await db.execAsync(`
    CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, amount REAL, category TEXT, date TEXT);    
`)

export const addExpense = async (expense: ExpenseAttributes) => {
    const { description, amount, category, date } = expense;
    await db.execAsync(`
        INSERT INTO expenses (description, amount, category, date) VALUES ('${description}', ${amount}, '${category}', '${date}');
    `);
}