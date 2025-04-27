import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import { Asset } from "../../database/assetService";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { getLocationById, Location } from "@/app/database/locationService";
import { Employee, getEmployeeById } from "@/app/database/employeeService";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

function OptionIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} {...props} />;
}

type AssetViewProps = {
  editable: boolean;
  asset: Asset;
  editAssetClicked: () => void;
  deleteAssetClicked: () => void;
};

export default function AssetView({
  editable = true,
  asset,
  editAssetClicked,
  deleteAssetClicked,
}: AssetViewProps) {
  const router = useRouter();

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

  function showLocationClicked() {
    if (!location) return;

    router.push({
      pathname: "/(tabs)/locations",
      params: {
        mapViewVisible: "true",
        location: JSON.stringify(location),
      },
    });
  }

  return (
    <View>
      {editable && (
        <View style={globalStyles.buttonViewHR}>
          <TouchableOpacity
            onPress={showLocationClicked}
            activeOpacity={0.8}
            style={globalStyles.optionsButton}
          >
            <OptionIcon name="map-marker" color={colors.secondary} />
          </TouchableOpacity>
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
      )}
      {asset.image ? (
        <Image
          source={{ uri: asset.image }}
          style={styles.assetImage}
          resizeMode="contain"
        />
      ) : null}

      <View>
        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Asset ID:</Text>
          <Text style={globalStyles.textLightInd}>{asset.id}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Asset Name:</Text>
          <Text style={globalStyles.textLightInd}>{asset.name}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Asset Type:</Text>
          <Text style={globalStyles.textLightInd}>{asset.asset_type}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Description:</Text>
          <Text style={globalStyles.textLightInd}>{asset.description}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Barcode:</Text>
          <Text style={globalStyles.textLightInd}>{asset.barcode}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Price:</Text>
          <Text style={globalStyles.textLightInd}>{asset.price}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Creation Date:</Text>
          <Text style={globalStyles.textLightInd}>{asset.creation_date}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Location:</Text>
          <Text style={globalStyles.textLightInd}>
            {location ? location.name : "Loading..."}
          </Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Employee:</Text>
          <Text style={globalStyles.textLightInd}>
            {employee ? employee.name + " " + employee.lastname : "Loading..."}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  assetImage: {
    width: "100%",
    height: 200,
    marginVertical: 12,
    borderRadius: 10,
  },
});
