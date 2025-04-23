import globalStyles from "@/app/styles/global";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { deleteLocationById } from "@/app/database/locationService";
import { useState } from "react";
import LocationView from "@/app/components/location/location-view";
import { View } from "react-native";

export default function LocationDetails() {
  const router = useRouter();
  const { location } = useGlobalSearchParams();
  //const locationObj: Location = ;
  const [locationObj, setLocationObj] = useState(
    JSON.parse(location as string)
  );

  const deleteLocationClicked = async () => {
    if (!locationObj) return;

    try {
      await deleteLocationById(locationObj.id);
      console.log("Location deleted");
      router.replace("/(tabs)/locations");
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
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
