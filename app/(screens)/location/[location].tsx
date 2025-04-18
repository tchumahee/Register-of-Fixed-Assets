import globalStyles from "@/app/styles/global";
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Location, getLocationById } from "@/app/database/locationService";
import { FontAwesome } from "@expo/vector-icons";
import { updateLocationById, deleteLocationById } from "@/app/database/locationService";
import colors from "@/app/styles/colors";
import { useState } from "react";
import AddNewLocation from "@/app/components/location/add-new-location";
import LocationView from "@/app/components/location/location-view";




export default function User() {

    const router = useRouter();
    const { location } = useGlobalSearchParams();
    //const locationObj: Location = ;
    const [locationObj, setLocationObj] = useState(JSON.parse(location as string));

    const [updateFormIsVisible, setUpdateFormIsVisible] = useState(false); 

    async function updateLocation() {
      //setLocationObj(getLocationById(locationObj.id));
      setUpdateFormIsVisible(false);
    }

    function editLocationClicked() {
      setUpdateFormIsVisible(true);
    }

    function updateCanceled() {
      setUpdateFormIsVisible(false);
    }

    async function deleteLocationClicked() {
      try {
        await deleteLocationById(locationObj.id);
        console.log("Location deleted");
        // Optionally navigate back or refresh
      } catch (error) {
        console.error("Failed to delete location:", error);
      }
      router.replace('/(tabs)/locations');
    }


    return (
        <View style={globalStyles.modalWindow}>
        <View style={globalStyles.contentContainer}>
          <View style={globalStyles.infoContainer}>

            { updateFormIsVisible ? (
              <AddNewLocation modalCanceled={updateCanceled} addNewEntry={updateLocation} updateExisting={true} location={locationObj}
              setLocation={setLocationObj}>

              </AddNewLocation> 
            ) : (
              <LocationView 
              location={locationObj}
              editLocationClicked={editLocationClicked}
              deleteLocationClicked={deleteLocationClicked}></LocationView> //ovdje delete i editLocationClicked
            )
            }
            
          </View>
          
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});