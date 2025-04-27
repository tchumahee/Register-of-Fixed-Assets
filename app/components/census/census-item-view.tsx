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
        <Text style={globalStyles.textLight}>
          {censusItemWithDetails.asset_id}
        </Text>
        <Text style={globalStyles.textLight}>
          {censusItemWithDetails.asset_name}
        </Text>
      </View>
      <Text style={globalStyles.textLight}>
        {censusItemWithDetails?.previous_location_name} →{" "}
        {censusItemWithDetails?.new_location_name}
      </Text>
      <Text style={globalStyles.textLight}>
        {censusItemWithDetails?.previous_person_name} →{" "}
        {censusItemWithDetails?.new_person_name}
      </Text>
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
