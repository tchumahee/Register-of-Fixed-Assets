import { StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import { FlatList } from 'react-native';
import colors from '@/app/styles/colors';
import globalStyles from '@/app/styles/global';
import { useEffect, useState } from 'react';
import AddNewEntryModal from '@/app/components/add-new-entry-modal';
import { getAllEmployees, Employee } from '@/app/database/employeeService';
import { useRouter } from 'expo-router';


export default function EmployeesScreen() {
  const router = useRouter();
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function addNewEntryModal() {
    setModalIsVisible(true);
  }

  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    const data = await getAllEmployees();
    setEmployees(data);
  };

  function newEmployeeAdded() {
    fetchEmployees();
  }

  const handlePress = (employee: Employee) => {
    router.setParams({'id' : employee.id!.toString()});
    router.push({ pathname: `/(screens)/employee/[employee]`, params: { employee: JSON.stringify(employee) } });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <View style={globalStyles.viewContainer}>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({item}) => 
        <TouchableOpacity
        onPress={() => handlePress(item)}
        activeOpacity={0.8}
        style={styles.listItem}
        >
          <Text style={styles.text}>{item.name + " " + item.lastname}</Text></TouchableOpacity>}    
      >
      
      </FlatList>


      <TouchableOpacity
      activeOpacity={0.8} 
      onPress={addNewEntryModal}
      style={globalStyles.floatingButton}><Text>+</Text></TouchableOpacity>
      <AddNewEntryModal 
      modalIsVisible={modalIsVisible} 
      setModalIsVisible={setModalIsVisible}
      newEntryAdded={newEmployeeAdded}
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
