import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import MapView, { Marker, PoiClickEvent, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { getAllLocations, Location } from '../database/locationService';
import globalStyles from '../styles/global';
import AddNewLocation from '../components/location/add-new-location';
import colors from '../styles/colors';


const INITIAL_REGION = {
  latitude: 43.9159,
  longitude: 17.6791,
  latitudeDelta: 3.0,
  longitudeDelta: 5.0,
}
  
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
    router.push({ pathname: `/(screens)/location/add-new-location`});
  }

  const [locations, setLocations] = useState<Location[]>([]);
  const [markers, setMarkers] = useState<Array<{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    latitudeDelta: number;
    longitudeDelta: number;
  }>>([]);

  const fetchLocations = async () => {
    const data = await getAllLocations();
    setLocations(data);
  
    const fullMarkers = data.map(loc => ({
      ...loc,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }));
    setMarkers(fullMarkers);
  };
  

  function toggleMapView() {
    setMapView(!mapView);
  }

  const handlePress = (location: Location) => {
    // route to /(screens)/location/[location]
    router.push({ pathname: `/(screens)/location/[location]`, params: { location: JSON.stringify(location) } });
  };

  const onMarkerSelected = (marker: any) => {
    console.log("Marker " + marker.name + " selected.");
  }
  

  useEffect(() => {
    fetchLocations();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchLocations(); 
    }, [])
  );


  return (
    <View style={globalStyles.viewContainer}>
      


      {
        mapView ? (
          <MapView 
          style={StyleSheet.absoluteFill} 
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          >
            {
              markers.map(marker => (
                <Marker
                pinColor={colors.primary}
                onPress={() => onMarkerSelected(marker)}
                key={marker.id} coordinate={marker}/>
              ))
            }
          </MapView>
        ) : 
        (
          <FlatList
          data={locations}
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
        <ViewButtonIcon name={mapView ? "list" : "map-marker"} color={'black'} />
      </TouchableOpacity>
      
      { modalIsVisible === true && <AddNewLocation></AddNewLocation>}
    </View>
  );
}
