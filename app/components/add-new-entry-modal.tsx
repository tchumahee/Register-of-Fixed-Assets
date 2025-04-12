
import React from 'react';
import {View, Modal, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/global';


type ModalComponentProps = {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddNewEntryModal({modalIsVisible, setModalIsVisible} : ModalComponentProps) {

  function modalCanceled() {
    setModalIsVisible(false);
  }

  return (
    <Modal animationType='slide' visible={modalIsVisible} style={globalStyles.modalWindow}>
      <View style={globalStyles.modalWindow}>
        <View style={globalStyles.contentContainer}>
          <Text style={globalStyles.headerLight}>Add new employee</Text>
          <View style={globalStyles.infoContainer}>
            <Text style={globalStyles.textLight}>aaa</Text>
            <View style={globalStyles.buttonLine}>
              <TouchableOpacity
              onPress={modalCanceled}
              style={globalStyles.buttonSecondary}
              activeOpacity={0.8}>
                <Text style={globalStyles.textLight}>Cancel</Text>
              </TouchableOpacity>


              <TouchableOpacity
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
