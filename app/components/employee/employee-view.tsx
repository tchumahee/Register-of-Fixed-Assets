import { Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../styles/global";
import { deleteEmployeeById, Employee } from "../../database/employeeService";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";

function OptionIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} {...props} />;
}

type EmployeeViewProps = {
  employee: Employee;
  editEmployeeClicked: () => void;
  deleteEmployeeClicked: () => void;
};

export default function EmployeeView({
  employee,
  editEmployeeClicked,
  deleteEmployeeClicked,
}: EmployeeViewProps) {
  return (
    <View>
      <View style={globalStyles.buttonViewHR}>
        <TouchableOpacity
          onPress={editEmployeeClicked}
          activeOpacity={0.8}
          style={globalStyles.optionsButton}
        >
          <OptionIcon name="pencil" color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={deleteEmployeeClicked}
          activeOpacity={0.8}
          style={globalStyles.optionsButton}
        >
          <OptionIcon name="trash" color={colors.secondary} />
        </TouchableOpacity>
      </View>
      <View>
        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Employee ID:{"  "}</Text>
          <Text style={globalStyles.textLightInd}>{employee.id}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>First Name:{"  "}</Text>
          <Text style={globalStyles.textLightInd}>{employee.name}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Last Name:{"  "}</Text>
          <Text style={globalStyles.textLightInd}>{employee.lastname}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Email:{"  "}</Text>
          <Text style={globalStyles.textLightInd}>{employee.email}</Text>
        </View>
      </View>
    </View>
  );
}
