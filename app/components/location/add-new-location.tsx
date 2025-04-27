import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import globalStyles from "../../styles/global";
import {
  addLocation,
  getAllLocations,
  Location,
  updateLocationById,
} from "../../database/locationService";
import MapView, {
  Callout,
  Marker,
  PoiClickEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import colors from "@/app/styles/colors";
import { useFocusEffect, useRouter } from "expo-router";

const INITIAL_REGION = {
  latitude: 43.9159,
  longitude: 17.6791,
  latitudeDelta: 3.0,
  longitudeDelta: 5.0,
};

// represents the form for editing / adding new locations. Directly calls the locationService
export default function AddNewLocation() {
  const router = useRouter();

  const [locations, setLocations] = useState<Location[]>([]);
  const [markers, setMarkers] = useState<
    Array<{
      id: number;
      latitude: number;
      longitude: number;
      name: string;
      latitudeDelta: number;
      longitudeDelta: number;
    }>
  >([]);

  const [selectedLat, setSelectedLat] = useState<number | null>(null);
  const [selectedLng, setSelectedLng] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const poiClicked = (e: PoiClickEvent) => {
    const { coordinate, name } = e.nativeEvent;
    const { latitude, longitude } = coordinate;

    setSelectedLat(latitude);
    setSelectedLng(longitude);
    setSelectedName(name);
  };

  const fetchLocations = async () => {
    const data = await getAllLocations();
    setLocations(data);

    const fullMarkers = data.map((loc) => ({
      ...loc,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }));
    setMarkers(fullMarkers);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchLocations();
    }, [])
  );

  async function addNewLocation() {
    if (selectedName != null && selectedLat != null && selectedLng != null) {
      await addLocation(selectedName!, selectedLat!, selectedLng!);
      router.push({ pathname: `/(tabs)/locations` });
    } else {
      Alert.alert(
        "Location not selected",
        "Please select a location on the map."
      );
      return;
    }
  }

  return (
    <View style={globalStyles.viewContainer}>
      <View style={globalStyles.viewContainer}>
        <MapView
          onPoiClick={poiClicked}
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
        >
          {markers.map((marker) => (
            <Marker
              pinColor={colors.primary}
              key={marker.id}
              coordinate={marker}
            />
          ))}

          {selectedLat !== null && selectedLng !== null && (
            <Marker
              coordinate={{ latitude: selectedLat, longitude: selectedLng }}
              pinColor={colors.secondary}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{selectedName}</Text>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
      </View>
      <View>
        <TouchableOpacity
          onPress={addNewLocation}
          style={globalStyles.buttonPrimary}
          activeOpacity={0.8}
        >
          <Text style={globalStyles.textDark}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    padding: 10,
  },
  calloutText: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
