import globalStyles from "@/app/styles/global";
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Employee, getEmployeeById } from "@/app/database/employeeService";
import { FontAwesome } from "@expo/vector-icons";
import { updateEmployeeById, deleteEmployeeById } from "@/app/database/employeeService";
import colors from "@/app/styles/colors";
import { useState } from "react";
import AddNewEmployee from "@/app/components/add-new-employee";
import EmployeeView from "@/app/components/employee-view";




export default function User() {

    const router = useRouter();
    const { employee } = useGlobalSearchParams();
    //const employeeObj: Employee = ;
    const [employeeObj, setEmployeeObj] = useState(JSON.parse(employee as string));

    const [updateFormIsVisible, setUpdateFormIsVisible] = useState(false); 

    async function updateEmployee() {
      //setEmployeeObj(getEmployeeById(employeeObj.id));
      setUpdateFormIsVisible(false);
    }

    function editEmployeeClicked() {
      setUpdateFormIsVisible(true);
    }

    function updateCanceled() {
      setUpdateFormIsVisible(false);
    }

    async function deleteEmployeeClicked() {
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

            { updateFormIsVisible ? (
              <AddNewEmployee modalCanceled={updateCanceled} addNewEntry={updateEmployee} updateExisting={true} employee={employeeObj}
              setEmployee={setEmployeeObj}>

              </AddNewEmployee> 
            ) : (
              <EmployeeView 
              employee={employeeObj}
              editEmployeeClicked={editEmployeeClicked}
              deleteEmployeeClicked={deleteEmployeeClicked}></EmployeeView> //ovdje delete i editEmployeeClicked
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