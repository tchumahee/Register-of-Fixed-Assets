import globalStyles from "@/app/styles/global";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { CensusItemWithDetails } from "@/app/database/censusService";
import CensusItemView from "@/app/components/census/census-item-view";

export default function CensusItemDetails() {
  const params = useLocalSearchParams();
  const [censusItem, setCensusItem] = useState<CensusItemWithDetails | null>(
    null
  );

  useEffect(() => {
    if (params.censusItem) {
      const parsed = JSON.parse(
        params.censusItem as string
      ) as CensusItemWithDetails;
      setCensusItem(parsed);
    }
  }, [params.censusItem]);

  return (
    <View style={globalStyles.modalWindow}>
      <View style={globalStyles.contentContainer}>
        <View style={globalStyles.infoContainer}>
          {censusItem ? (
            <CensusItemView censusItemWithDetails={censusItem} />
          ) : (
            <View>
              <Text>Loading...</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
