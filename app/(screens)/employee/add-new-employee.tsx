import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import globalStyles from "../../styles/global";
import {
  addEmployee,
  updateEmployeeById,
  Employee,
} from "../../database/employeeService";

export default function AddEmployeeScreen() {
  const router = useRouter();
  const { mode, employeeData } = useLocalSearchParams<{
    mode?: string;
    employeeData?: string;
  }>();

  const isUpdate = mode === "edit";
  const initialEmployee: Employee = employeeData
    ? JSON.parse(employeeData)
    : {
        id: 0,
        name: "",
        lastname: "",
        email: "",
      };

  const [employee, setEmployee] = useState<Employee>(initialEmployee);

  const [name, setName] = useState(employee.name);
  const [lastname, setLastname] = useState(employee.lastname);
  const [email, setEmail] = useState(employee.email);

  useEffect(() => {
    setName(employee.name);
    setLastname(employee.lastname);
    setEmail(employee.email);
  }, [employee]);

  const handleSubmit = async () => {
    if (!name) {
      Alert.alert("Missing Info", "Please enter a First Name.");
      return;
    }

    if (!lastname) {
      Alert.alert("Missing Info", "Please enter a Last Name.");
      return;
    }

    if (!email) {
      Alert.alert("Missing Info", "Please enter an Email.");
      return;
    }

    if (isUpdate) {
      const updated = { ...employee, name, lastname, email };
      const result = await updateEmployeeById(updated);
      if (result) {
        setEmployee(result);
      }
    } else {
      await addEmployee(name, lastname, email);
    }
    router.back(); // go back to previous screen
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={globalStyles.modalWindow}>
      <View style={globalStyles.contentContainer}>
        <View style={globalStyles.infoContainer}>
          <Text style={globalStyles.textLabel}>First Name:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={globalStyles.textInput}
          />

          <Text style={globalStyles.textLabel}>Last Name:</Text>
          <TextInput
            value={lastname}
            onChangeText={setLastname}
            style={globalStyles.textInput}
          />

          <Text style={globalStyles.textLabel}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={globalStyles.textInput}
          />

          <View style={globalStyles.buttonViewV}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={globalStyles.buttonPrimary}
              activeOpacity={0.8}
            >
              <Text style={globalStyles.textDark}>
                {isUpdate ? "Save" : "Add"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCancel}
              style={globalStyles.buttonSecondary}
              activeOpacity={0.8}
            >
              <Text style={globalStyles.textLight}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
