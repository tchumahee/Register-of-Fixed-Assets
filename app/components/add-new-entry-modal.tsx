
import React from 'react';
import {View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../styles/global';
import { addEmployee } from '../database/employeeService';


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
    addEmployee("Name", "Surname", "Email");
    newEntryAdded();
    setModalIsVisible(false);
  }

  return (
    <Modal animationType='slide' visible={modalIsVisible} style={globalStyles.modalWindow}>
      <View style={globalStyles.modalWindow}>
        <View style={globalStyles.contentContainer}>
          <Text style={globalStyles.headerLight}>Add new employee</Text>
          <View style={globalStyles.infoContainer}>




            <Text style={globalStyles.textLight}>aaa</Text>
            <View>
              <TextInput style={globalStyles.textInput}></TextInput>
              <TextInput style={globalStyles.textInput}></TextInput>
              <TextInput style={globalStyles.textInput}></TextInput>
            </View>
            <View style={globalStyles.buttonLine}>
              <TouchableOpacity
              onPress={modalCanceled}
              style={globalStyles.buttonSecondary}
              activeOpacity={0.8}>
                <Text style={globalStyles.textLight}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={addNewEntry}
              style={globalStyles.buttonPrimary}
              activeOpacity={0.8}>
                <Text style={globalStyles.textDark}>Add</Text>
              </TouchableOpacity> 
            </View>
            



          </View>
          
        </View>
      </View>
    </Modal>
  );
}
