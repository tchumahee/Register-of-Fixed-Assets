import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CensusItem } from "@/app/database/censusService";
import globalStyles from "@/app/styles/global";
import { FontAwesome } from "@expo/vector-icons";
import { Asset, getAllAssets } from "@/app/database/assetService";
import colors from "@/app/styles/colors";
import { getAllLocations, Location } from "@/app/database/locationService";
import { Employee, getAllEmployees } from "@/app/database/employeeService";

export default function AddNewCensusList() {
  const { updatedCensusItems } = useLocalSearchParams<{
    updatedCensusItems?: string;
  }>();

  const [date, setDate] = useState("");
  const router = useRouter();

  const [censusItems, setCensusItems] = useState<CensusItem[]>([]);

  const [assets, setAssets] = useState<Asset[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetData = await getAllAssets();
        const locationData = await getAllLocations();
        const employeeData = await getAllEmployees();

        setAssets(assetData);
        setLocations(locationData);
        setEmployees(employeeData);
      } catch (error) {
        console.error("Failed to fetch auxiliary data:", error);
        Alert.alert("Error", "Failed to load necessary data.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (updatedCensusItems) {
      try {
        const parsedItems = JSON.parse(updatedCensusItems);
        setCensusItems(parsedItems);
      } catch (error) {
        console.error("Failed to parse updatedCensusItems:", error);
        Alert.alert("Error", "Failed to update census list items.");
      }
    }
  }, [updatedCensusItems]);

  const navigateToAddItem = () => {
    router.push({
      pathname: "/(screens)/census/census-item/add-new-census-item",
      params: {
        currentItems: JSON.stringify(censusItems),
      },
    });
  };

  const handleAddCensusList = () => {
    console.log("Final Census List Date:", date);
    console.log("Final Census Items:", censusItems);
    Alert.alert(
      "Submit List",
      `Submitting list for date ${date} with ${censusItems.length} items. (Implementation pending)`
    );
    // Here you would likely call addCensusList(date, censusItems) or similar
    // and then navigate away, perhaps back to the main census screen.
    // Example:
    // try {
    //   await addCensusList({ date: date, items: censusItems }); // Adjust based on your actual service function
    //   router.back(); // or router.push('/(tabs)/census');
    // } catch (error) {
    //   Alert.alert("Error", "Failed to save the census list.");
    // }
  };

  const handleEditItem = (itemToEdit: CensusItem) => {
    router.push({
      pathname: "/(screens)/census/census-item/add-new-census-item", // Or a dedicated edit screen
      params: {
        itemToEdit: JSON.stringify(itemToEdit),
        currentItems: JSON.stringify(
          censusItems.filter((item) => item.id !== itemToEdit.id)
        ),
      },
    });
  };

  return (
    <View style={globalStyles.modalWindow}>
      <View style={globalStyles.contentContainer}>
        <View style={globalStyles.infoContainer}>
          <View>
            <TouchableOpacity
              style={globalStyles.buttonPrimary}
              activeOpacity={0.8}
              onPress={handleAddCensusList}
            >
              <Text style={globalStyles.textDark}>Add list</Text>
            </TouchableOpacity>
            <View style={globalStyles.separator}></View>
            <Text style={globalStyles.textLabel}>Items Added:</Text>
          </View>

          <View style={{ flex: 1 }}>
            {censusItems.length === 0 ? (
              <Text
                style={[
                  globalStyles.textLight,
                  { textAlign: "center", marginTop: 20 },
                ]}
              >
                No items added yet. Tap "Add Asset" below.
              </Text>
            ) : (
              <FlatList
                data={censusItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  const assetDetails = assets.find(
                    (a) => a.id === item.asset_id
                  );
                  const prevLocation = locations.find(
                    (l) => l.id === item.previous_location
                  );
                  const newLocation = locations.find(
                    (l) => l.id === item.new_location
                  );
                  const prevPerson = employees.find(
                    (e) => e.id === item.previous_person
                  );
                  const newPerson = employees.find(
                    (e) => e.id === item.new_person
                  );

                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.assetItemContainer}
                    >
                      {assetDetails?.image ? (
                        <Image
                          source={{ uri: assetDetails.image }}
                          style={styles.assetImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.assetImagePlaceholder} />
                      )}
                      <View style={styles.assetTextContainer}>
                        <Text style={globalStyles.textLight}>
                          {assetDetails?.name}
                        </Text>
                        <Text style={globalStyles.textLightS}>
                          {prevLocation?.name} → {newLocation?.name}
                        </Text>
                        <Text style={globalStyles.textLightS}>
                          {prevPerson?.name} {prevPerson?.lastname} →{" "}
                          {newPerson?.name} {newPerson?.lastname}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={navigateToAddItem}
          style={globalStyles.buttonAddListItem}
        >
          <Text style={globalStyles.textLight}>Add item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  assetItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 7,
    backgroundColor: colors.cardBackground,
    marginVertical: 4,
    marginHorizontal: 3,
  },
  assetImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  assetImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#ccc",
  },
  assetTextContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
  },
  editIcon: {
    marginLeft: "auto",
    paddingLeft: 10,
  },
});
