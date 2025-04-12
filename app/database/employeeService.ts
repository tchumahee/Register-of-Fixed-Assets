// services/employeeService.ts
import { getDatabase } from './database';


export interface Employee {
    id: number;
    name: string;
    lastname: string;
    email: string;
  }

export const addEmployee = async (
  name: string,
  lastname: string,
  email: string
): Promise<void> => {
  const db = await getDatabase();

  await db.runAsync(
    `INSERT INTO employee (name, lastname, email) VALUES (?, ?, ?);`,
    [name, lastname, email]
  );

  console.log('✅ Employee added!');
};

export const getAllEmployees = async (): Promise<Employee[]> => {
    const db = await getDatabase();
  
    const employees = await db.getAllAsync<Employee>(
      `SELECT id, name, lastname, email FROM employee`
    );
  
    return employees;
  };
