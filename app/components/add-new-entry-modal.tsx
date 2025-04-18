
import React, { useState } from 'react';
import {View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../styles/global';
import { addEmployee } from '../database/employeeService';
import AddNewEmployee from './employee/add-new-employee';


type ModalComponentProps = {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newEntryAdded: () => void;
};

export default function AddNewEntryModal({modalIsVisible, setModalIsVisible, newEntryAdded} : ModalComponentProps) {

  function modalCanceled() {
    setModalIsVisible(false);
  }

  function addNewEntry() {
    newEntryAdded();
    setModalIsVisible(false);
  }

  return (
    <Modal animationType='slide' visible={modalIsVisible} style={globalStyles.modalWindow}>
      <View style={globalStyles.modalWindow}>
        <View style={globalStyles.contentContainer}>
          <Text style={globalStyles.headerLight}>Add new employee</Text>
          <View style={globalStyles.infoContainer}>

            <AddNewEmployee modalCanceled={modalCanceled} addNewEntry={addNewEntry}></AddNewEmployee>

          </View>
          
        </View>
      </View>
    </Modal>
  );
}
