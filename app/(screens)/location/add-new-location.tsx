import AddNewLocation from "@/app/components/location/add-new-location";
import globalStyles from "@/app/styles/global";
import { View } from "react-native";



export default function AddNewLocationScreen() {


    return (
        <View style={globalStyles.modalWindow}>
            <AddNewLocation></AddNewLocation>
        </View>
    )
}