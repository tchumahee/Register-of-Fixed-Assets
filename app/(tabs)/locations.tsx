import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import AddNewEntryModal from '../components/add-new-entry-modal';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { getAllLocations, Location } from '../database/locationService';
import globalStyles from '../styles/global';


const INITIAL_REGION = {
  latitude: 43.9159,
  longitude: 17.6791,
  latitudeDelta: 3.0,
  longitudeDelta: 5.0,
}

const placeholderLocations = [
  {
    id: 1,
    latitude: 43.8563,
    longitude: 18.4131,
    name: "Sarajevo"
  },
  {
    id: 2,
    latitude: 44.7722,
    longitude: 17.1910,
    name: "Banja Luka"
  }
]

const markers = placeholderLocations.map(loc => ({
  ...loc,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
}));
  
function FloatingButtonIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={15} style={{ marginBottom: -3 }} {...props} />;
}

function ViewButtonIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function LocationsScreen() {

  const router = useRouter();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [mapView, setMapView] = useState(false);

  function addNewEntryModal() {
    setModalIsVisible(true);
  }

  const [locations, setLocations] = useState<Location[]>([]);

  const fetchLocations = async () => {
    const data = await getAllLocations();
    setLocations(data);
  };

  function newLocationAdded() {
    fetchLocations();
  }

  function toggleMapView() {
    setMapView(!mapView);
  }

  const handlePress = (location: Location) => {
    // route to /(screens)/location/[location]
    router.push({ pathname: `/(screens)/location/[location]`, params: { location: JSON.stringify(location) } });
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchLocations(); // Refresh every time the tab is focused
    }, [])
  );


  return (
    <View style={globalStyles.viewContainer}>
      


      {
        mapView ? (
          <MapView style={StyleSheet.absoluteFill} provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          >
            {
              markers.map((marker, index) => (
                <Marker key={index} coordinate={marker}/>
              ))
            }
          </MapView>
        ) : 
        (
          <FlatList
          data={placeholderLocations}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={
            ({item}) => 
            <TouchableOpacity
            onPress={() => handlePress(item)}
            activeOpacity={0.8}
            style={globalStyles.listItem}>
              
              <Text style={globalStyles.textLight}>{item.name}</Text></TouchableOpacity>}    
            >
        
          </FlatList>
        )
      }

      <TouchableOpacity
      activeOpacity={0.8} 
      onPress={addNewEntryModal}
      style={globalStyles.floatingButtonRight}>
        <FloatingButtonIcon name="plus" color={'black'} />
      </TouchableOpacity>

      <TouchableOpacity
      activeOpacity={0.8} 
      onPress={toggleMapView}
      style={globalStyles.floatingButtonLeft}>
        <ViewButtonIcon name={mapView ? "list" : "map-marker"} color={'white'} />
      </TouchableOpacity>
      
      <AddNewEntryModal 
      modalIsVisible={modalIsVisible} 
      setModalIsVisible={setModalIsVisible}
      newEntryAdded={newLocationAdded}
      ></AddNewEntryModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
});
