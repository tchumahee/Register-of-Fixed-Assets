import { getDatabase } from './database';

export interface Asset {
  id: number;
  name: string;
  description: string;
  barcode: number;
  price: number;
  creation_date: string;
  current_person: number;
  current_location: number;
  image: string;
  asset_type: string;
}

export const addAsset = async (
  asset: Omit<Asset, 'id'>
): Promise<void> => {
  const db = await getDatabase();

  await db.runAsync(
    `INSERT INTO asset (name, description, barcode, price, creation_date, current_person, current_location, image, asset_type) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      asset.name,
      asset.description,
      asset.barcode,
      asset.price,
      asset.creation_date,
      asset.current_person,
      asset.current_location,
      asset.image,
      asset.asset_type
    ]
  );

  console.log('✅ Asset added!');
};

export const getAllAssets = async (): Promise<Asset[]> => {
  const db = await getDatabase();

  const assets = await db.getAllAsync<Asset>(
    `SELECT * FROM asset`
  );

  return assets;
};

export const getAssetById = async (id: number): Promise<Asset | null> => {
  try {
    const db = await getDatabase();

    const result = await db.getFirstAsync<Asset>(
      `SELECT * FROM asset WHERE id = ?`,
      [id]
    );

    console.log('✅ Asset fetched!');
    return result || null;
  } catch (error) {
    console.error("Failed to fetch asset by ID:", error);
    return null;
  }
};

export const updateAssetById = async (asset: Asset): Promise<Asset | null> => {
  try {
    const db = await getDatabase();

    await db.runAsync(
      `UPDATE asset SET name = ?, description = ?, barcode = ?, price = ?, creation_date = ?, current_person = ?, current_location = ?, image = ?, asset_type = ?
       WHERE id = ?`,
      [
        asset.name,
        asset.description,
        asset.barcode,
        asset.price,
        asset.creation_date,
        asset.current_person,
        asset.current_location,
        asset.image,
        asset.asset_type,
        asset.id
      ]
    );

    const updatedAsset = await getAssetById(asset.id);

    console.log('✅ Asset updated!');
    return updatedAsset;
  } catch (error) {
    console.error("Failed to update asset:", error);
    return null;
  }
};

export const deleteAssetById = async (id: number): Promise<void> => {
  const db = await getDatabase();

  await db.runAsync(
    `DELETE FROM asset WHERE id = ?`,
    [id]
  );

  console.log('✅ Asset deleted!');
};

export const getAssetsByLocation = async (locationId: number): Promise<Asset[]> => {
    const db = await getDatabase();

    const assets = await db.getAllAsync<Asset>(
        `SELECT * FROM asset WHERE current_location = ?`,
        [locationId]
    );

    console.log(`✅ Assets fetched for location ID ${locationId}`);
    return assets;
    };

  export async function getAssetByBarcode(barcode: string): Promise<Asset | null> {
    const db = await getDatabase();
    const result = await db.getFirstAsync('SELECT * FROM asset WHERE barcode = ?', [barcode]);
    return result ? result as Asset : null;
  }
  
  
