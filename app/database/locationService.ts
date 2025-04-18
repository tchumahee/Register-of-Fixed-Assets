
import { getDatabase } from './database';

export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export const addLocation = async (
  name: string,
  latitude: number,
  longitude: number
): Promise<void> => {
  const db = await getDatabase();

  await db.runAsync(
    `INSERT INTO location (name, latitude, longitude) VALUES (?, ?, ?);`,
    [name, latitude, longitude]
  );

  console.log('✅ Location added!');
};

export const getAllLocations = async (): Promise<Location[]> => {
  const db = await getDatabase();

  const locations = await db.getAllAsync<Location>(
    `SELECT id, name, latitude, longitude FROM location`
  );

  return locations;
};

export const deleteLocationById = async (id: number): Promise<void> => {
  const db = await getDatabase();

  await db.runAsync(
    `DELETE FROM location WHERE id = ?`,
    [id]
  );

  console.log('✅ Location deleted!');
};

export const updateLocationById = async (location: Location): Promise<Location | null> => {
  try {
    const db = await getDatabase();

    await db.runAsync(
      `UPDATE location SET name = ?, latitude = ?, longitude = ? WHERE id = ?`,
      [location.name, location.latitude, location.longitude, location.id]
    );

    const updatedLocation = await getLocationById(location.id);

    console.log('✅ Location updated!');
    return updatedLocation;
  } catch (error) {
    console.error("Failed to update location:", error);
    return null;
  }
};

export const getLocationById = async (id: number): Promise<Location | null> => {
  try {
    const db = await getDatabase();

    const result = await db.getFirstAsync<Location>(
      `SELECT id, name, latitude, longitude FROM location WHERE id = ?`,
      [id]
    );

    console.log('✅ Location fetched!');
    return result || null;
  } catch (error) {
    console.error("Failed to fetch location by ID:", error);
    return null;
  }
};
