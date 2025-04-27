import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import globalStyles from "@/app/styles/global";
import { CensusItem } from "@/app/database/censusService";
import { Employee, getAllEmployees } from "@/app/database/employeeService";
import { getAllLocations, Location } from "@/app/database/locationService";
import {
  Asset,
  getAllAssets,
  getAssetByBarcode,
  getAssetById,
} from "@/app/database/assetService";
import { Picker } from "@react-native-picker/picker";
import { CameraView, useCameraPermissions } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import colors from "@/app/styles/colors";

function OptionIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ padding: 5 }} {...props} />;
}

export default function AddCensusItemScreen() {
  const router = useRouter();
  const { currentItems, itemToEdit } = useLocalSearchParams<{
    currentItems?: string;
    itemToEdit?: string;
  }>();

  const [isEditing, setIsEditing] = useState(false);

  const [censusItem, setCensusItem] = useState<CensusItem>({
    id: 0,
    asset_id: 0,
    census_list_id: 0,
    previous_location: 0,
    new_location: 0,
    previous_person: 0,
    new_person: 0,
  });

  const [showCamera, setShowCamera] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  const [cameraPermission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (itemToEdit) {
      try {
        const parsedItem = JSON.parse(itemToEdit);
        setCensusItem(parsedItem); // Pre-fill the form
        setIsEditing(true);
      } catch (error) {
        console.error("Failed to parse itemToEdit:", error);
        Alert.alert("Error", "Could not load item data for editing.");
        router.back();
      }
    }
  }, [itemToEdit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeData = await getAllEmployees();
        const locationData = await getAllLocations();
        const assetData = await getAllAssets();
        setEmployees(employeeData);
        setLocations(locationData);
        setAssets(assetData);
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
        Alert.alert("Error", "Failed to load selection options.");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    if (!censusItem.asset_id) {
      Alert.alert("Missing Info", "Please select an Asset.");
      return;
    }
    if (!censusItem.new_location) {
      Alert.alert("Missing Info", "Please select a New Location.");
      return;
    }
    if (!censusItem.new_person) {
      Alert.alert("Missing Info", "Please select a New Person.");
      return;
    }

    let existingList: CensusItem[] = [];
    if (currentItems) {
      try {
        existingList = JSON.parse(currentItems);
      } catch (error) {
        console.error("Failed to parse currentItems in Add Screen:", error);
        return;
      }
    }

    let updatedItems: CensusItem[];

    if (isEditing) {
      updatedItems = existingList.map((item) =>
        item.id === censusItem.id ? censusItem : item
      );
      if (!updatedItems.find((item) => item.id === censusItem.id)) {
        updatedItems.push(censusItem);
      }
    } else {
      const temporaryId = -(Date.now() + Math.floor(Math.random() * 1000));
      const newItemWithId = { ...censusItem, id: temporaryId };
      updatedItems = [...existingList, newItemWithId];
    }

    router.replace({
      pathname: "/(screens)/census/add-new-census-list",
      params: {
        updatedCensusItems: JSON.stringify(updatedItems),
      },
    });
  };

  const handleCancel = () => {
    router.back();
  };

  const openCamera = async () => {
    if (!cameraPermission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert(
          "Permission Required",
          "Camera access is needed to scan barcodes."
        );
        return;
      }
    }
    if (cameraPermission?.granted) {
      setShowCamera(true);
    }
  };

  const barcodeScanned = async ({ data }: { data: string }) => {
    setShowCamera(false);
    console.log("Barcode scanned:", data);
    try {
      const assetWithBarcode = await getAssetByBarcode(data);
      if (assetWithBarcode) {
        setCensusItem({
          ...censusItem,
          asset_id: assetWithBarcode.id,
          previous_location: assetWithBarcode.current_location,
          previous_person: assetWithBarcode.current_person,
        });
        Alert.alert("Asset Found", `Selected: ${assetWithBarcode.name}`);
      } else {
        Alert.alert("Not Found", "No asset found with this barcode.");
      }
    } catch (error) {
      console.error("Error fetching asset by barcode:", error);
      Alert.alert("Error", "Failed to look up asset by barcode.");
    }
  };

  const assetSelected = async (assetId: number | string) => {
    const selectedAssetId = Number(assetId);
    if (!selectedAssetId) {
      setCensusItem({
        ...censusItem,
        asset_id: 0,
        previous_location: 0,
        previous_person: 0,
      });
      return;
    }

    try {
      const selectedAsset = await getAssetById(selectedAssetId);
      if (selectedAsset) {
        setCensusItem({
          ...censusItem,
          asset_id: selectedAsset.id,
          previous_location: selectedAsset.current_location,
          previous_person: selectedAsset.current_person,
        });
      }
    } catch (error) {
      console.error("Error fetching asset by ID:", error);
      Alert.alert("Error", "Failed to look up asset details.");
    }
  };

  const previousLocation = locations.find(
    (l) => l.id === censusItem.previous_location
  );
  const previousPerson = employees.find(
    (e) => e.id === censusItem.previous_person
  );

  return (
    <View style={globalStyles.modalWindow}>
      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <View style={globalStyles.modalWindow}>
          {cameraPermission?.granted && (
            <CameraView
              style={{ flex: 1 }}
              barcodeScannerSettings={{
                barcodeTypes: [
                  "upc_a",
                  "ean8",
                  "ean13",
                  "code39",
                  "code128",
                  "code93",
                  "codabar",
                  "itf14",
                ],
              }}
              onBarcodeScanned={barcodeScanned}
            />
          )}
        </View>
      </Modal>

      <View style={globalStyles.contentContainer}>
        <View style={globalStyles.infoContainer}>
          <Text style={globalStyles.textLabel}>Asset:</Text>
          <View style={globalStyles.buttonViewH}>
            <Picker
              style={globalStyles.dropdown}
              selectedValue={censusItem.asset_id}
              onValueChange={(itemValue) => assetSelected(itemValue)}
            >
              <Picker.Item
                label="-- Select Asset --"
                value={0}
                style={globalStyles.dropdownItem}
              />
              {assets.map((asset) => (
                <Picker.Item
                  key={asset.id}
                  label={asset.name}
                  value={asset.id}
                  style={globalStyles.dropdownItem}
                />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={openCamera}
              style={globalStyles.optionsButton}
            >
              <OptionIcon name="barcode" color={colors.secondary} />
            </TouchableOpacity>
          </View>

          {censusItem.asset_id > 0 && (
            <View style={styles.previousStateContainer}>
              <Text style={globalStyles.textLightS}>
                Previous Location: {previousLocation?.name ?? "N/A"}
              </Text>
              <Text style={globalStyles.textLightS}>
                Previous Person:{" "}
                {previousPerson?.name + " " + previousPerson?.lastname}
              </Text>
            </View>
          )}

          <Text style={globalStyles.textLabel}>New Location:</Text>
          <Picker
            style={globalStyles.dropdown}
            selectedValue={censusItem.new_location}
            onValueChange={(itemValue) =>
              setCensusItem({ ...censusItem, new_location: itemValue! })
            }
          >
            <Picker.Item
              label="-- Select New Location --"
              value={0}
              style={globalStyles.dropdownItem}
            />
            {locations.map((loc) => (
              <Picker.Item
                key={loc.id}
                label={loc.name}
                value={loc.id}
                style={globalStyles.dropdownItem}
              />
            ))}
          </Picker>

          <Text style={globalStyles.textLabel}>New Person:</Text>
          <Picker
            style={globalStyles.dropdown}
            selectedValue={censusItem.new_person}
            onValueChange={(itemValue) =>
              setCensusItem({ ...censusItem, new_person: itemValue! })
            }
          >
            <Picker.Item
              label="-- Select New Employee --"
              value={0}
              style={globalStyles.dropdownItem}
            />
            {employees.map((emp) => (
              <Picker.Item
                key={emp.id}
                label={`${emp.name} ${emp.lastname}`}
                value={emp.id}
                style={globalStyles.dropdownItem}
              />
            ))}
          </Picker>

          <View style={globalStyles.buttonViewV}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={globalStyles.buttonPrimary}
              activeOpacity={0.8}
            >
              <Text style={globalStyles.textDark}>Add</Text>
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

const styles = StyleSheet.create({
  closeCameraButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 20,
  },
  previousStateContainer: {
    backgroundColor: colors.cardBackground,
    padding: 8,
    borderRadius: 5,
    marginVertical: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.secondary,
  },
});
