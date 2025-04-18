import { Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../styles/global";
import { deleteLocationById, Location } from "../../database/locationService";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";



function OptionIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} {...props} />;
}

type LocationViewProps = {
    location: Location;
    editLocationClicked: () => void;
    deleteLocationClicked: () => void;
};

export default function LocationView({location, editLocationClicked, deleteLocationClicked} : LocationViewProps) {

    return (
        <View>
        
        </View>
    );
    
}