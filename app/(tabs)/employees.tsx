import { StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import { FlatList } from 'react-native';
import colors from '../styles/colors';
import globalStyles from '../styles/global';


export default function EmployeesScreen() {
  return (
    <View style={globalStyles.viewContainer}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'Mary'},
          {key: 'Kevin'},
          {key: 'Jimmy'},
          {key: 'Julie'},
          {key: 'Jillian'},
          {key: 'Chris'},
          {key: 'Sean'},
          {key: 'Shaun'},
          {key: 'Timothy'},
          {key: 'Timothee'},
          {key: 'Ivan'},
          {key: 'Stephen'},
          {key: 'Mark'},
          {key: 'Devon'},
          {key: 'Vivienne'},

        ]}
        renderItem={({item}) => 
        <TouchableOpacity
        activeOpacity={0.8}
        style={styles.listItem}
        >
          <Text style={styles.text}>{item.key}</Text></TouchableOpacity>}    
      >
      
      </FlatList>
      <TouchableOpacity
      activeOpacity={0.8} 
      style={globalStyles.floatingButton}><Text>+</Text></TouchableOpacity>
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
  text: {
    fontSize: 20
  },
  listItem: {
    margin: 3,
    padding: 10,
    height: 50,
    flex: 1,
    borderBottomWidth: 1,
    backgroundColor: colors.containerBackground,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
});
