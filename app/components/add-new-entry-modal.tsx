
import React, { useState } from 'react';
import {View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../styles/global';
import { addEmployee } from '../database/employeeService';
import AddNewEmployee from './employee/add-new-employee';
import AddNewLocation from './location/add-new-location';


type ModalComponentProps = {
  modalType: string;
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newEntryAdded: () => void;
};

export default function AddNewEntryModal({modalType, modalIsVisible, setModalIsVisible, newEntryAdded} : ModalComponentProps) {

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
          <Text style={globalStyles.headerLight}>Add new {modalType}</Text>
          <View style={globalStyles.infoContainer}>

            { modalType === 'employee' && <AddNewEmployee modalCanceled={modalCanceled} addNewEntry={addNewEntry}></AddNewEmployee>}

          </View>
          
        </View>
      </View>
    </Modal>
  );
}
