
import React, { useState } from 'react';
import {View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../../styles/global';
import { addLocation, Location, updateLocationById } from '../../database/locationService';


type AddNewLocationProps = {
  modalCanceled: () => void;
  addNewEntry: () => void;
  updateExisting: boolean;
  location: Location;
  setLocation: React.Dispatch<any>;
};


// represents the form for editing / adding new locations. Directly calls the locationService
export default function AddNewLocation({modalCanceled, addNewEntry, 
  updateExisting = false, 
  location = { id: 0, name: '', latitude: 0, longitude: 0 },
  setLocation = () => {} } : AddNewLocationProps) {

  const [name, setName] = useState(location.name);
  const [longitude, setLongitude] = useState(location.longitude);
  const [latitude, setLatitude] = useState(location.latitude);

  async function addNewLocation() {
    if (updateExisting) {
      const updated = {
        ...location,
        name,
        longitude,
        latitude
      };
      const result = await updateLocationById(updated);
      if (result) {
        setLocation(result);
      }
    } else {
      await addLocation(name, latitude, longitude);
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
    setLatitude(0);
    setLongitude(0);
  }


  return (
        <View>
        </View>
  );
}
