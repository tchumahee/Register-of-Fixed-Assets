import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  StyleSheet, ScrollView, Alert, Modal
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useLocalSearchParams, useRouter } from 'expo-router';
import globalStyles from '../../styles/global';
import { addAsset, updateAssetById, Asset } from '../../database/assetService';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Employee, getAllEmployees } from '@/app/database/employeeService';
import { getAllLocations, Location } from '@/app/database/locationService';


// ... (imports stay the same)

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

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(asset?.current_person || null);
  const [selectedLocationId, setSelectedLocationId] = useState(asset?.current_location || null);

  const [imageUri, setImageUri] = useState(asset.image);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraMode, setCameraMode] = useState<'scan' | 'photo' | null>(null);
  const [cameraRef, setCameraRef] = useState<any>(null);

  const [cameraPermission, requestPermission] = useCameraPermissions();

  const openImagePickerOptions = () => {
    Alert.alert('Select Image Source', 'Choose how you want to add an image:', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Gallery', onPress: pickImage },
      { text: 'Take Photo', onPress: () => openCamera('photo') },
    ]);
  };

  useEffect(() => {
    const backAction = () => {
      if (showCamera) {
        setShowCamera(false);
        return true; // prevents exiting the screen
      }
      return false;
    };
  
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
    return () => backHandler.remove();
  }, [showCamera]);

  useEffect(() => {
    const fetchData = async () => {
      const employeeData = await getAllEmployees();
      const locationData = await getAllLocations();
      setEmployees(employeeData);
      setLocations(locationData);
    };
    fetchData();
  }, []);
  

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

  const openCamera = async (mode: 'scan' | 'photo') => {
    if (!cameraPermission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert('Permission Required', 'Camera access is needed.');
        return;
      }
    }
    setCameraMode(mode);
    setShowCamera(true);
  };

  const takePhotoAndSave = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ base64: true, quality: 0.7 });
      const manipulated = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 300 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );
      setImageUri(`data:image/jpeg;base64,${manipulated.base64}`);
      setShowCamera(false);
    }
  };

  const barcodeScanned = ({ data }: { data: string }) => {
    if (cameraMode !== 'scan') return;
    setShowCamera(false);
    setAsset((prev) => ({ ...prev, barcode: parseInt(data) || 0 }));
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
      {/* Camera Modal */}
      <Modal visible={showCamera} animationType="slide"
      onRequestClose={() => setShowCamera(false)}>
        <View style={globalStyles.modalWindow}>
        {cameraPermission?.granted && (
          <CameraView
            ref={(ref) => setCameraRef(ref)}
            style={{ flex: 1 }}
            barcodeScannerSettings={
              cameraMode === 'scan'
                ? {
                    barcodeTypes: ['upc_a', 'ean8', 'ean13', 'code39', 'code128', 'code93', 'codabar', 'itf14'],
                  }
                : undefined
            }
            onBarcodeScanned={cameraMode === 'scan' ? barcodeScanned : undefined}
          />
        )}

        {cameraMode === 'photo' && (
          <TouchableOpacity
            onPress={takePhotoAndSave}
            style={globalStyles.buttonCameraShutter}
          >
          </TouchableOpacity>
        )}
        </View>
        
      </Modal>

      {/* Main Form */}
      <View style={globalStyles.contentContainer}>
        <ScrollView style={globalStyles.infoContainer}>
          <Text style={globalStyles.textLabel}>Name:</Text>
          <TextInput
            value={asset.name}
            onChangeText={(text) => setAsset({ ...asset, name: text })}
            style={globalStyles.textInput}
          />

          <Text style={globalStyles.textLabel}>Description:</Text>
          <TextInput
            value={asset.description}
            onChangeText={(text) => setAsset({ ...asset, description: text })}
            style={globalStyles.textInput}
          />

          <Text style={globalStyles.textLabel}>Barcode:</Text>
          <TextInput
            keyboardType="numeric"
            value={asset.barcode?.toString() || ''}
            onChangeText={(text) => setAsset({ ...asset, barcode: parseInt(text) || 0 })}
            style={globalStyles.textInput}
          />

          <TouchableOpacity onPress={() => openCamera('scan')} style={globalStyles.buttonSecondary}>
            <Text style={globalStyles.textLight}>Scan Barcode</Text>
          </TouchableOpacity>

          <Text style={globalStyles.textLabel}>Price:</Text>
          <TextInput
            inputMode="decimal"
            onChangeText={(text) => setAsset({ ...asset, price: parseFloat(text) || 0 })}
            style={globalStyles.textInput}
          />

          <Text style={globalStyles.textLabel}>Current Person:</Text>
          <Picker
            style={globalStyles.dropdown}
            selectedValue={selectedEmployeeId}
            onValueChange={(itemValue) => {setAsset({ ...asset, current_person: itemValue! })}}
          >
            <Picker.Item label="Select Employee" value={null} />
            {employees.map((emp) => (
              <Picker.Item key={emp.id} label={`${emp.name + " " + emp.lastname}`} value={emp.id} />
            ))}
          </Picker>

          <Text style={globalStyles.textLabel}>Current Location:</Text>
          <Picker
            style={globalStyles.dropdown}
            selectedValue={selectedLocationId}
            onValueChange={(itemValue) => {setAsset({ ...asset, current_location: itemValue! })}}
          >
            <Picker.Item label="Select Location" value={null} />
            {locations.map((loc) => (
              <Picker.Item key={loc.id} label={loc.name} value={loc.id} />
            ))}
          </Picker>

          <Text style={globalStyles.textLabel}>Asset Type:</Text>
          <TextInput
            value={asset.asset_type}
            onChangeText={(text) => setAsset({ ...asset, asset_type: text })}
            style={globalStyles.textInput}
          />

          <Text style={globalStyles.textLabel}>Image:</Text>
          <TouchableOpacity onPress={openImagePickerOptions}>
            <View style={styles.imageBox}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.imageBox} />
              ) : (
                <Text style={{ color: '#999' }}>Tap to select image</Text>
              )}
            </View>
          </TouchableOpacity>

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
        </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  imageBox: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
  },
});
