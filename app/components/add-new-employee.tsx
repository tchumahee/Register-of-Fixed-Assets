
import React, { useState } from 'react';
import {View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../styles/global';
import { addEmployee, Employee, updateEmployeeById } from '../database/employeeService';


type AddNewEmployeeProps = {
  modalCanceled: () => void;
  addNewEntry: () => void;
  updateExisting: boolean;
  employee: Employee;
  setEmployee: React.Dispatch<any>;
};


// represents the form for editing / adding new employees. Directly calls the employeeService
export default function AddNewEmployee({modalCanceled, addNewEntry, 
  updateExisting = false, 
  employee = { id: 0, name: '', lastname: '', email: '' },
  setEmployee = () => {} } : AddNewEmployeeProps) {

  const [name, setName] = useState(employee.name);
  const [lastname, setLastname] = useState(employee.lastname);
  const [email, setEmail] = useState(employee.email);

  async function addNewEmployee() {
    if (updateExisting) {
      const updated = {
        ...employee,
        name,
        lastname,
        email,
      };
      const result = await updateEmployeeById(updated);
      if (result) {
        setEmployee(result);
      }
    } else {
      await addEmployee(name, lastname, email);
    }
  
    resetFields();
    addNewEntry();
  }

  function cancel() {
    resetFields();
    modalCanceled();
  }

  function resetFields() {
    setName('');
    setLastname('');
    setEmail('');
  }


  return (
        <View>
            <View>
              <Text style={globalStyles.textLabel}>First name:</Text>
              <TextInput 
              placeholder="First Name"
              value={name}
              onChangeText={setName}
              style={globalStyles.textInput}></TextInput>
              <Text style={globalStyles.textLabel}>Last name:</Text>
              <TextInput 
              placeholder="Last Name"
              value={lastname}
              onChangeText={setLastname}
              style={globalStyles.textInput}></TextInput>
              <Text style={globalStyles.textLabel}>Email:</Text>
              <TextInput 
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={globalStyles.textInput}></TextInput>
            </View>
            <View style={globalStyles.buttonViewV}>
              <TouchableOpacity
                onPress={addNewEmployee}
                style={globalStyles.buttonPrimary}
                activeOpacity={0.8}>
                  <Text style={globalStyles.textDark}>{updateExisting ? "Save" : "Add"}</Text>
              </TouchableOpacity> 

              <TouchableOpacity
              onPress={cancel}
              style={globalStyles.buttonSecondary}
              activeOpacity={0.8}>
                <Text style={globalStyles.textLight}>Cancel</Text>
              </TouchableOpacity>
            </View>
        </View>
  );
}
