import { TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import { FlatList } from "react-native";
import globalStyles from "@/app/styles/global";
import { useCallback, useEffect, useState } from "react";
import { getAllEmployees, Employee } from "@/app/database/employeeService";
import { useFocusEffect, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

function FloatingButtonIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={15} style={{ marginBottom: -3 }} {...props} />;
}

export default function EmployeesScreen() {
  const router = useRouter();

  function addNewEntryModal() {
    router.push("/(screens)/employee/add-new-employee?mode=add");
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
    router.push({
      pathname: `/(screens)/employee/[employee]`,
      params: { employee: JSON.stringify(employee) },
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchEmployees();
    }, [])
  );

  return (
    <View style={globalStyles.viewContainer}>
      {employees.length === 0 ? (
        <Text
          style={[
            globalStyles.textLight,
            { textAlign: "center", marginTop: 20 },
          ]}
        >
          No items found.
        </Text>
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePress(item)}
              activeOpacity={0.8}
              style={globalStyles.listItem}
            >
              <Text style={globalStyles.textLight}>
                {item.name + " " + item.lastname}
              </Text>
            </TouchableOpacity>
          )}
        ></FlatList>
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={addNewEntryModal}
        style={globalStyles.floatingButtonRight}
      >
        <FloatingButtonIcon name="plus" color={"black"} />
      </TouchableOpacity>
    </View>
  );
}
