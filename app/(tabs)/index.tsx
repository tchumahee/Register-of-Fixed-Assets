import { StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import { Text, View } from "@/components/Themed";
import { FlatList } from "react-native";
import colors from "@/app/styles/colors";
import globalStyles from "@/app/styles/global";
import { useCallback, useState } from "react";
import { getAllAssets, Asset } from "@/app/database/assetService";
import { getAllEmployees, Employee } from "@/app/database/employeeService";
import { getAllLocations, Location } from "@/app/database/locationService";
import { useFocusEffect, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

function FloatingButtonIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={15} style={{ marginBottom: -3 }} {...props} />;
}

function FilterButtonIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function IndexScreen() {
  const router = useRouter();

  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const fetchAssets = async () => {
    const data = await getAllAssets();
    setAssets(data);
    setFilteredAssets(data);
  };

  const fetchEmployeesAndLocations = async () => {
    const empData = await getAllEmployees();
    const locData = await getAllLocations();
    setEmployees(empData);
    setLocations(locData);
  };

  const handlePress = (asset: Asset) => {
    router.push({
      pathname: `/(screens)/asset/[asset]`,
      params: { asset: JSON.stringify(asset) },
    });
  };

  const applyFilters = () => {
    let filtered = [...assets];

    if (selectedEmployee) {
      filtered = filtered.filter(
        (asset) => asset.current_person === Number(selectedEmployee)
      );
    }
    if (selectedLocation) {
      filtered = filtered.filter(
        (asset) => asset.current_location === Number(selectedLocation)
      );
    }

    setFilteredAssets(filtered);
    setFilterModalVisible(false);
  };

  const clearFilters = () => {
    setSelectedEmployee(null);
    setSelectedLocation(null);
    setFilteredAssets(assets);
    setFilterModalVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAssets();
      fetchEmployeesAndLocations();
    }, [])
  );

  function addNewEntryModal() {
    router.push("/(screens)/asset/add-new-asset?mode=add");
  }

  return (
    <View style={globalStyles.viewContainer}>
      <FlatList
        data={filteredAssets}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            activeOpacity={0.8}
            style={styles.assetItemContainer}
          >
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                style={styles.assetImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.assetImagePlaceholder} />
            )}
            <View style={styles.assetTextContainer}>
              <Text style={globalStyles.textLight}>{item.name}</Text>
              <Text style={globalStyles.textLight}>{item.asset_type}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={globalStyles.modalWindow}>
          <View style={globalStyles.infoContainer}>
            <Text style={globalStyles.textLight}>Filter by Employee:</Text>
            <Picker
              selectedValue={selectedEmployee}
              onValueChange={(itemValue) => setSelectedEmployee(itemValue)}
              style={globalStyles.dropdown}
            >
              <Picker.Item
                label="None"
                value={null}
                style={globalStyles.dropdownItem}
              />
              {employees.map((emp) => (
                <Picker.Item
                  key={emp.id}
                  label={emp.name}
                  value={emp.id}
                  style={globalStyles.dropdownItem}
                />
              ))}
            </Picker>

            <Text style={globalStyles.textLight}>Filter by Location:</Text>
            <Picker
              selectedValue={selectedLocation}
              onValueChange={(itemValue) => setSelectedLocation(itemValue)}
              style={globalStyles.dropdown}
            >
              <Picker.Item
                label="None"
                value={null}
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

            <View style={globalStyles.buttonViewH}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={globalStyles.buttonPrimary}
                onPress={applyFilters}
              >
                <Text style={globalStyles.textLight}>Apply Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={globalStyles.buttonSecondary}
                onPress={clearFilters}
              >
                <Text style={globalStyles.textLight}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={addNewEntryModal}
        style={globalStyles.floatingButtonRight}
      >
        <FloatingButtonIcon name="plus" color={"black"} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setFilterModalVisible(true)}
        style={globalStyles.floatingButtonLeft}
      >
        <FilterButtonIcon name="filter" color={"black"} />
      </TouchableOpacity>
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
    margin: 3,
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
    backgroundColor: "rgba(0,0,0,0)",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
