import * as SQLite from 'expo-sqlite';

// Open the database asynchronously
const db = SQLite.openDatabaseAsync('app.db');

export const getDatabase = async () => {
  return await db;
};

// Function to initialize the database
export const initDatabase = async () => {
  try {
    // Wait for the database to be opened
    const database = await db;

    // Create the tables using execAsync
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

      DROP TABLE IF EXISTS asset;
      
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
