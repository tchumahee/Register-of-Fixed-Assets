import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('app.db');

export const getDatabase = async () => {
  return await db;
};

export const initDatabase = async () => {
  try {
    const database = await db;

    await database.execAsync(`
      -- Table: location
      CREATE TABLE IF NOT EXISTS location (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        latitude REAL,
        longitude REAL
      );
      
      -- Table: employee
      CREATE TABLE IF NOT EXISTS employee (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        lastname TEXT,
        email TEXT
      );
      
      -- Table: asset
      CREATE TABLE IF NOT EXISTS asset (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        barcode INTEGER,
        price REAL,
        creation_date TEXT,
        current_person INTEGER,
        current_location INTEGER,
        image TEXT,
        asset_type TEXT,
        FOREIGN KEY (current_location) REFERENCES location(id),
        FOREIGN KEY (current_person) REFERENCES employee(id)
      );
      
      -- Table: census_list
      CREATE TABLE IF NOT EXISTS census_list (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT
      );
      

      -- Table: census_item
      CREATE TABLE IF NOT EXISTS census_item (
        id INTEGER,
        asset_id INTEGER,
        census_list_id INTEGER,
        previous_location INTEGER,
        new_location INTEGER,
        previous_person TEXT,
        new_person TEXT,
        FOREIGN KEY (asset_id) REFERENCES asset(id),
        FOREIGN KEY (census_list_id) REFERENCES census_list(id),
        FOREIGN KEY (previous_location) REFERENCES location(id),
        FOREIGN KEY (new_location) REFERENCES location(id)
      );
    `);

    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};
