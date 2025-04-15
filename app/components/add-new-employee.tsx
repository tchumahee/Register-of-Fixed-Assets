
import React, { useState } from 'react';
import {View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../styles/global';
import { addEmployee } from '../database/employeeService';


type AddNewEmployeeProps = {
  modalCanceled: () => void;
  addNewEntry: () => void;
};

export default function AddNewEmployee({modalCanceled, addNewEntry} : AddNewEmployeeProps) {

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  function addNewEmployee() {
    addEmployee(name, lastname, email);
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
                  <Text style={globalStyles.textDark}>Add</Text>
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
