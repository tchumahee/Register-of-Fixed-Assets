import { StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import { FlatList } from 'react-native';
import colors from '@/app/styles/colors';
import globalStyles from '@/app/styles/global';
import { useCallback, useEffect, useState } from 'react';
import AddNewEntryModal from '@/app/components/add-new-entry-modal';
import { getAllEmployees, Employee } from '@/app/database/employeeService';
import { useFocusEffect, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';


function FloatingButtonIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={15} style={{ marginBottom: -3 }} {...props} />;
}

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
    router.push({ pathname: `/(screens)/employee/[employee]`, params: { employee: JSON.stringify(employee) } });
  };

  // useEffect(() => {
  //   fetchEmployees();
  // }, []);


  useFocusEffect(
    useCallback(() => {
      fetchEmployees(); // Refresh every time the tab is focused
    }, [])
  );

  return (
    <View style={globalStyles.viewContainer}>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({item}) => 
        <TouchableOpacity
        onPress={() => handlePress(item)}
        activeOpacity={0.8}
        style={globalStyles.listItem}
        >
          <Text style={globalStyles.textLight}>{item.name + " " + item.lastname}</Text></TouchableOpacity>}    
      >
      
      </FlatList>


      <TouchableOpacity
      activeOpacity={0.8} 
      onPress={addNewEntryModal}
      style={globalStyles.floatingButtonRight}>
        <FloatingButtonIcon name="plus" color={'black'} />
      </TouchableOpacity>
      
      <AddNewEntryModal 
      modalIsVisible={modalIsVisible} 
      setModalIsVisible={setModalIsVisible}
      newEntryAdded={newEmployeeAdded}
      ></AddNewEntryModal>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // text: {
  //   fontSize: 20
  // },
  
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
});
