import globalStyles from "@/app/styles/global";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Employee } from "@/app/database/employeeService";

export default function User() {
    const { employee } = useGlobalSearchParams();
    const employeeObj: Employee = JSON.parse(employee as string);
    console.log(employeeObj);

    return (
        <View style={globalStyles.modalWindow}>
        <View style={globalStyles.contentContainer}>
          <View style={globalStyles.infoContainer}>

            <Text style={globalStyles.textLight}>{employeeObj.id}</Text>
            <Text style={globalStyles.textLight}>{employeeObj.name}</Text>
            <Text style={globalStyles.textLight}>{employeeObj.lastname}</Text>
            <Text style={globalStyles.textLight}>{employeeObj.email}</Text>

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