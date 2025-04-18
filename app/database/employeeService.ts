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


export const deleteEmployeeById = async (id: number): Promise<void> => {
  const db = await getDatabase();

  await db.runAsync(
    `DELETE FROM employee WHERE id = ?`,
    [id]
  );

  console.log('✅ Employee deleted!');
};
  
export const updateEmployeeById = async (employee: Employee): Promise<Employee | null> => {
  try {
    const db = await getDatabase();

    await db.runAsync(
      `UPDATE employee SET name = ?, lastname = ?, email = ? WHERE id = ?`,
      [employee.name, employee.lastname, employee.email, employee.id]
    );

    const updatedEmployee = await getEmployeeById(employee.id);

    console.log('✅ Employee updated!');
    return updatedEmployee;
  } catch (error) {
    console.error("Failed to update employee:", error);
    return null;
  }
};

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
  try {
    const db = await getDatabase();

    const result = await db.getFirstAsync<Employee>(
      `SELECT id, name, lastname, email FROM employee WHERE id = ?`,
      [id]
    );

    console.log('✅ Employee fetched!');
    return result || null;
  } catch (error) {
    console.error("Failed to fetch employee by ID:", error);
    return null;
  }
};

