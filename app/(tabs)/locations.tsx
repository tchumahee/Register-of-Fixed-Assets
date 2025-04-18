import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


const INITIAL_REGION = {
  latitude: 43.9159,
  longitude: 17.6791,
  latitudeDelta: 3.0,
  longitudeDelta: 5.0,
}

const locations = [
  {
    latitude: 43.8563,
    longitude: 18.4131,
    name: "Sarajevo"
  },
  {
    latitude: 44.7722,
    longitude: 17.1910,
    name: "Banja Luka"
  }
]

const markers = locations.map(loc => ({
  ...loc,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
}));
  


export default function LocationsScreen() {
  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFill} provider={PROVIDER_GOOGLE}
      initialRegion={INITIAL_REGION}
      >
        {
          markers.map((marker, index) => (
            <Marker key={index} coordinate={marker}/>
          ))
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
