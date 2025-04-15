import globalStyles from "@/app/styles/global";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function User() {
    const { employee } = useGlobalSearchParams();
    console.log(employee);

    return (
        <View>
            <Text style={globalStyles.textLight}>aaaaaaaaa{employee}</Text>
        </View>
    )
}