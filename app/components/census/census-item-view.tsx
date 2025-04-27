import { Image, StyleSheet, Text, View } from "react-native";
import globalStyles from "../../styles/global";
import { CensusItemWithDetails } from "../../database/censusService";

type CensusViewProps = {
  censusItemWithDetails: CensusItemWithDetails;
};

export default function CensusItemView({
  censusItemWithDetails,
}: CensusViewProps) {
  return (
    <View>
      {censusItemWithDetails.asset_image ? (
        <Image
          source={{ uri: censusItemWithDetails.asset_image }}
          style={styles.assetImage}
          resizeMode="contain"
        />
      ) : null}

      <View>
        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Asset ID:</Text>
          <Text style={globalStyles.textLightInd}>
            {censusItemWithDetails.asset_id}
          </Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.textLabel}>Asset Name:</Text>
          <Text style={globalStyles.textLightInd}>
            {censusItemWithDetails.asset_name}
          </Text>
        </View>
      </View>

      <View style={globalStyles.separator}></View>

      <View style={globalStyles.infoRow}>
        <Text style={globalStyles.textLabel}>Location transfer:</Text>
        <Text style={globalStyles.textLightInd}>
          {censusItemWithDetails?.previous_location_name} →{" "}
          {censusItemWithDetails?.new_location_name}
        </Text>
      </View>
      <View style={globalStyles.infoRow}>
        <Text style={globalStyles.textLabel}>Person transfer:</Text>
        <Text style={globalStyles.textLightInd}>
          {censusItemWithDetails?.previous_person_name} →{" "}
          {censusItemWithDetails?.new_person_name}
        </Text>
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
