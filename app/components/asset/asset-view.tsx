import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import { Asset } from "../../database/assetService";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { getLocationById, Location } from "@/app/database/locationService";
import { Employee, getEmployeeById } from "@/app/database/employeeService";
import { useEffect, useState } from "react";

function OptionIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} {...props} />;
}

type AssetViewProps = {
  asset: Asset;
  editAssetClicked: () => void;
  deleteAssetClicked: () => void;
};

export default function AssetView({ asset, editAssetClicked, deleteAssetClicked }: AssetViewProps) {

  const [location, setLocation] = useState<Location | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      const loc = await getLocationById(asset.current_location);
      const emp = await getEmployeeById(asset.current_person);
      setLocation(loc);
      setEmployee(emp);
    };
  
    loadDetails();
  }, []);

  return (
    <View>
      <View style={globalStyles.buttonViewHR}>
        <TouchableOpacity
          onPress={editAssetClicked}
          activeOpacity={0.8}
          style={globalStyles.optionsButton}
        >
          <OptionIcon name="pencil" color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={deleteAssetClicked}
          activeOpacity={0.8}
          style={globalStyles.optionsButton}
        >
          <OptionIcon name="trash" color={colors.secondary} />
        </TouchableOpacity>
      </View>

      {asset.image ? (
        <Image
          source={{ uri: asset.image }}
          style={styles.assetImage}
          resizeMode="contain"
        />
      ) : null}

      <View>
        <Text style={globalStyles.textLight}>{asset.id}</Text>
        <Text style={globalStyles.textLight}>{asset.name}</Text>
        <Text style={globalStyles.textLight}>{asset.asset_type}</Text>
        <Text style={globalStyles.textLight}>{asset.description}</Text>
        <Text style={globalStyles.textLight}>{asset.barcode}</Text>
        <Text style={globalStyles.textLight}>{asset.price}</Text>
        <Text style={globalStyles.textLight}>{asset.creation_date}</Text>
        <Text style={globalStyles.textLight}>{location ? location.name : 'Loading...'}</Text>
        <Text style={globalStyles.textLight}>{employee ? employee.name + " " + employee.lastname : 'Loading...'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  assetImage: {
    width: '100%',
    height: 200,
    marginVertical: 12,
    borderRadius: 10,
  },
});
