import globalStyles from "@/app/styles/global";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { deleteLocationById } from "@/app/database/locationService";
import { useState } from "react";
import LocationView from "@/app/components/location/location-view";
import { Alert, View } from "react-native";

export default function LocationDetails() {
  const router = useRouter();
  const { location } = useGlobalSearchParams();
  const [locationObj, setLocationObj] = useState(
    JSON.parse(location as string)
  );

  const deleteLocationClicked = async () => {
    if (!locationObj) return;

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this location?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteLocationById(locationObj.id);
              console.log("Location deleted");
              router.replace("/(tabs)/locations");
            } catch (error) {
              console.error("Failed to delete location:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={globalStyles.modalWindow}>
      <View style={globalStyles.contentContainer}>
        <View style={globalStyles.infoContainer}>
          <LocationView
            location={locationObj}
            deleteLocationClicked={deleteLocationClicked}
          ></LocationView>
        </View>
      </View>
    </View>
  );
}
