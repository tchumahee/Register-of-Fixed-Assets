import globalStyles from "@/app/styles/global";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import {
  deleteEmployeeById,
  getEmployeeById,
} from "@/app/database/employeeService";
import colors from "@/app/styles/colors";
import { useState, useEffect, useCallback } from "react";
import EmployeeView from "@/app/components/employee/employee-view";
import { Employee } from "@/app/database/employeeService";
import { useFocusEffect } from "@react-navigation/native";

export default function EmployeeDetails() {
  const router = useRouter();
  const { employee } = useGlobalSearchParams();
  const [employeeObj, setEmployeeObj] = useState<Employee | null>(null);

  const loadEmployee = useCallback(async () => {
    if (!employee) return;
    try {
      const parsed = JSON.parse(employee as string);
      const freshEmployee = await getEmployeeById(parsed.id);
      setEmployeeObj(freshEmployee);
    } catch (err) {
      console.warn("Could not parse or fetch employee:", err);
    }
  }, [employee]);

  useFocusEffect(
    useCallback(() => {
      loadEmployee();
    }, [loadEmployee])
  );

  const editEmployeeClicked = () => {
    if (!employeeObj) return;

    router.push({
      pathname: "/(screens)/employee/add-new-employee",
      params: {
        mode: "edit",
        employeeData: JSON.stringify(employeeObj),
      },
    });
  };

  const deleteEmployeeClicked = async () => {
    if (!employeeObj) return;

    try {
      await deleteEmployeeById(employeeObj.id);
      console.log("Employee deleted");
      router.replace("/(tabs)/employees");
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  if (!employeeObj) return null;

  return (
    <View style={globalStyles.modalWindow}>
      <View style={globalStyles.contentContainer}>
        <View style={globalStyles.infoContainer}>
          <EmployeeView
            employee={employeeObj}
            editEmployeeClicked={editEmployeeClicked}
            deleteEmployeeClicked={deleteEmployeeClicked}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
