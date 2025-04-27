// database/censusService.ts
import { getDatabase } from './database';

export interface CensusList {
  id: number;
  date: string;
}

export interface CensusItem {
  id: number;
  asset_id: number;
  census_list_id: number;
  previous_location: number;
  new_location: number;
  previous_person: number; 
  new_person: number;    
}

export interface CensusItemWithDetails extends CensusItem {
  asset_name: string;
  asset_image: string | null;
  previous_location_name: string;
  new_location_name: string;
  previous_person_name: string | null;
  new_person_name: string | null;
}

// CRUD for Census List

export const addCensusList = async (date: string): Promise<number> => {
  const db = await getDatabase();
  const result = await db.runAsync(
    `INSERT INTO census_list (date) VALUES (?);`,
    [date]
  );
  return result.lastInsertRowId;
};

export const getAllCensusLists = async (): Promise<CensusList[]> => {
  const db = await getDatabase();
  return await db.getAllAsync<CensusList>(`SELECT * FROM census_list`);
};

export const deleteCensusList = async (id: number): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM census_item WHERE census_list_id = ?`, [id]);
  await db.runAsync(`DELETE FROM census_list WHERE id = ?`, [id]);
};

export const getCensusListById = async (id: number): Promise<CensusList | null> => {
  const db = await getDatabase();
  return await db.getFirstAsync<CensusList>(
    `SELECT * FROM census_list WHERE id = ?`,
    [id]
  );
};

// CRUD for Census Items

export const addCensusItem = async (item: CensusItem): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO census_item (
      asset_id, census_list_id, previous_location, new_location,
      previous_person, new_person
    ) VALUES (?, ?, ?, ?, ?, ?);`,
    [
      item.asset_id,
      item.census_list_id,
      item.previous_location,
      item.new_location,
      item.previous_person,
      item.new_person,
    ]
  );
};

export const getCensusItemsByList = async (
  listId: number
): Promise<CensusItemWithDetails[]> => {
  const db = await getDatabase();

  return await db.getAllAsync<CensusItemWithDetails>(`
    SELECT 
      ci.*,
      a.name AS asset_name,
      a.image AS asset_image,
      pl.name AS previous_location_name,
      nl.name AS new_location_name,
      ep.name || ' ' || ep.lastname AS previous_person_name,
      en.name || ' ' || en.lastname AS new_person_name
    FROM census_item ci
    JOIN asset a ON ci.asset_id = a.id
    LEFT JOIN location pl ON ci.previous_location = pl.id
    LEFT JOIN location nl ON ci.new_location = nl.id
    LEFT JOIN employee ep ON ci.previous_person = ep.id
    LEFT JOIN employee en ON ci.new_person = en.id
    WHERE ci.census_list_id = ?
  `, [listId]);
};

export const deleteCensusItem = async (
  assetId: number,
  listId: number
): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync(
    `DELETE FROM census_item WHERE asset_id = ? AND census_list_id = ?`,
    [assetId, listId]
  );
};
