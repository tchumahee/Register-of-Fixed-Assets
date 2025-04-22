import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import { Asset } from "../../database/assetService";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";

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

      {/* IMAGE PREVIEW */}
      {asset.image ? (
        <Image
          source={{ uri: asset.image }}
          style={styles.assetImage}
          resizeMode="contain"
        />
      ) : null}

      {/* ASSET DETAILS */}
      <View>
        <Text style={globalStyles.textLight}>{asset.id}</Text>
        <Text style={globalStyles.textLight}>{asset.name}</Text>
        <Text style={globalStyles.textLight}>{asset.asset_type}</Text>
        <Text style={globalStyles.textLight}>{asset.description}</Text>
        <Text style={globalStyles.textLight}>{asset.barcode}</Text>
        <Text style={globalStyles.textLight}>{asset.price}</Text>
        <Text style={globalStyles.textLight}>{asset.creation_date}</Text>
        <Text style={globalStyles.textLight}>{asset.current_location}</Text>
        <Text style={globalStyles.textLight}>{asset.current_person}</Text>
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
