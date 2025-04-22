import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useLocalSearchParams, useRouter } from 'expo-router';
import globalStyles from '../../styles/global';
import { addAsset, updateAssetById, Asset } from '../../database/assetService';

export default function AddAssetScreen() {
  const router = useRouter();
  const { mode, assetData } = useLocalSearchParams<{
    mode?: string;
    assetData?: string;
  }>();

  const isUpdate = mode === 'edit';
  const initialAsset: Asset = assetData ? JSON.parse(assetData) : {
    id: 0,
    name: '',
    description: '',
    barcode: 0,
    price: 0,
    creation_date: new Date().toISOString(),
    current_person: '',
    current_location: 1,
    image: '',
    asset_type: '',
  };

  const [asset, setAsset] = useState<Asset>(initialAsset);
  const [imageUri, setImageUri] = useState(asset.image);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: false,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const manipulated = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 300 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );
      setImageUri(`data:image/jpeg;base64,${manipulated.base64}`);
    }
  };

  const handleSubmit = async () => {
    const updated = { ...asset, image: imageUri };

    if (isUpdate) {
      const result = await updateAssetById(updated);
      if (result) setAsset(result);
    } else {
      await addAsset(updated);
    }

    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={globalStyles.modalWindow}>
      <View style={globalStyles.contentContainer}>
        <View style={globalStyles.infoContainer}>
          <Text style={globalStyles.textLabel}>Name:</Text>
          <TextInput
            placeholder="Asset Name"
            value={asset.name}
            onChangeText={(text) => setAsset({ ...asset, name: text })}
            style={globalStyles.textInput}
          />

          <Text style={globalStyles.textLabel}>Description:</Text>
          <TextInput
            placeholder="Description"
            value={asset.description}
            onChangeText={(text) => setAsset({ ...asset, description: text })}
            style={globalStyles.textInput}
          />

          <Text style={globalStyles.textLabel}>Barcode:</Text>
          <TextInput
            placeholder="Barcode"
            keyboardType="numeric"
            value={asset.barcode?.toString()}
            onChangeText={(text) => setAsset({ ...asset, barcode: parseInt(text) || 0 })}
            style={globalStyles.textInput}
          />

          <Text style={globalStyles.textLabel}>Price:</Text>
          <TextInput
            placeholder="Price"
            keyboardType="numeric"
            value={asset.price?.toString()}
            onChangeText={(text) => setAsset({ ...asset, price: parseFloat(text) || 0 })}
            style={globalStyles.textInput}
          />

          <Text style={globalStyles.textLabel}>Person:</Text>
          <TextInput
            placeholder="Current Person"
            value={asset.current_person}
            onChangeText={(text) => setAsset({ ...asset, current_person: text })}
            style={globalStyles.textInput}
          />

          <Text style={globalStyles.textLabel}>Asset Type:</Text>
          <TextInput
            placeholder="Asset Type"
            value={asset.asset_type}
            onChangeText={(text) => setAsset({ ...asset, asset_type: text })}
            style={globalStyles.textInput}
          />

          <TouchableOpacity onPress={pickImage} style={globalStyles.buttonPrimary}>
            <Text style={globalStyles.textDark}>Pick Image</Text>
          </TouchableOpacity>

          {imageUri !== '' && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 120, height: 120, borderRadius: 8, marginTop: 10 }}
            />
          )}

          <View style={globalStyles.buttonViewV}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={globalStyles.buttonPrimary}
              activeOpacity={0.8}
            >
              <Text style={globalStyles.textDark}>{isUpdate ? 'Save' : 'Add'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCancel}
              style={globalStyles.buttonSecondary}
              activeOpacity={0.8}
            >
              <Text style={globalStyles.textLight}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
