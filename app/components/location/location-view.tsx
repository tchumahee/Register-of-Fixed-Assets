import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../styles/global";
import { deleteLocationById, Location } from "../../database/locationService";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";
import { useEffect, useState } from "react";
import { Asset, getAssetsByLocation } from "@/app/database/assetService";

function OptionIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} {...props} />;
}

type LocationViewProps = {
  location: Location;
  deleteLocationClicked: () => void;
};

export default function LocationView({
  location,
  deleteLocationClicked,
}: LocationViewProps) {
  const [assets, setAssets] = useState<Asset[]>([]);

  const fetchAssets = async () => {
    const data = await getAssetsByLocation(location.id);
    setAssets(data);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={globalStyles.buttonViewHR}>
        <TouchableOpacity
          onPress={deleteLocationClicked}
          activeOpacity={0.8}
          style={globalStyles.optionsButton}
        >
          <OptionIcon name="trash" color={colors.secondary} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={globalStyles.textLight}>{location.id}</Text>
        <Text style={globalStyles.textLight}>{location.name}</Text>
        <View style={globalStyles.separator}></View>
        <FlatList
          style={{ display: "flex" }}
          data={assets}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.assetItemContainer}
            >
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.assetImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.assetImagePlaceholder} />
              )}
              <View style={styles.assetTextContainer}>
                <Text style={globalStyles.textLight}>{item.name}</Text>
                <Text style={globalStyles.textLight}>{item.asset_type}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  assetItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 7,
    backgroundColor: "rgba(0,0,0,0)",
    margin: 3,
  },
  assetImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  assetImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#ccc",
  },
  assetTextContainer: {
    backgroundColor: "rgba(0,0,0,0)",
  },
});
