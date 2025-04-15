
import React, { useState } from 'react';
import {View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../styles/global';
import { addEmployee } from '../database/employeeService';


type ModalComponentProps = {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newEntryAdded: () => void;
};

export default function AddNewEntryModal({modalIsVisible, setModalIsVisible, newEntryAdded} : ModalComponentProps) {

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');



  function resetFields() {
    setName('');
    setLastname('');
    setEmail('');
  }

  function modalCanceled() {
    resetFields();
    setModalIsVisible(false);
  }

  function addNewEntry() {
    addEmployee(name, lastname, email);
    newEntryAdded();
    resetFields();
    setModalIsVisible(false);
  }

  return (
    <Modal animationType='slide' visible={modalIsVisible} style={globalStyles.modalWindow}>
      <View style={globalStyles.modalWindow}>
        <View style={globalStyles.contentContainer}>
          <Text style={globalStyles.headerLight}>Add new employee</Text>
          <View style={globalStyles.infoContainer}>




            
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
                onPress={addNewEntry}
                style={globalStyles.buttonPrimary}
                activeOpacity={0.8}>
                  <Text style={globalStyles.textDark}>Add</Text>
              </TouchableOpacity> 

              <TouchableOpacity
              onPress={modalCanceled}
              style={globalStyles.buttonSecondary}
              activeOpacity={0.8}>
                <Text style={globalStyles.textLight}>Cancel</Text>
              </TouchableOpacity>
            </View>
            



          </View>
          
        </View>
      </View>
    </Modal>
  );
}
