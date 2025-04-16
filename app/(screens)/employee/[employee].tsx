import globalStyles from "@/app/styles/global";
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Employee } from "@/app/database/employeeService";
import { FontAwesome } from "@expo/vector-icons";
import { updateEmployeeById, deleteEmployeeById } from "@/app/database/employeeService";
import colors from "@/app/styles/colors";


function OptionIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} {...props} />;
}

export default function User() {
    const router = useRouter();
    const { employee } = useGlobalSearchParams();
    const employeeObj: Employee = JSON.parse(employee as string);

    async function deleteEmployee() {
      try {
        await deleteEmployeeById(employeeObj.id);
        console.log("Employee deleted");
        // Optionally navigate back or refresh
      } catch (error) {
        console.error("Failed to delete employee:", error);
      }
      router.replace('/(tabs)/employees');
    }

    return (
        <View style={globalStyles.modalWindow}>
        <View style={globalStyles.contentContainer}>
          <View style={globalStyles.infoContainer}>


            <View style={globalStyles.buttonViewHR}>
              <TouchableOpacity
              activeOpacity={0.8} 
              style={globalStyles.optionsButton}>
                <OptionIcon name="pencil" color={colors.secondary} />
              </TouchableOpacity>
              <TouchableOpacity
              onPress={deleteEmployee}
              activeOpacity={0.8} 
              style={globalStyles.optionsButton}>
                <OptionIcon name="trash" color={colors.secondary} />
              </TouchableOpacity>
            </View>
            <View>
              

              <Text style={globalStyles.textLight}>{employeeObj.id}</Text>
              <Text style={globalStyles.textLight}>{employeeObj.name}</Text>
              <Text style={globalStyles.textLight}>{employeeObj.lastname}</Text>
              <Text style={globalStyles.textLight}>{employeeObj.email}</Text>
            </View>
          

            
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