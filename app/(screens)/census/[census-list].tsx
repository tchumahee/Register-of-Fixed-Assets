// app/components/census/census-list.tsx
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {
  CensusItemWithDetails,
  CensusList,
  getCensusItemsByList,
} from "@/app/database/censusService";
import globalStyles from "@/app/styles/global";
import { useLocalSearchParams } from "expo-router";
import CensusView from "@/app/components/census/census-view";

export default function CensusListView() {
  const params = useLocalSearchParams();
  const censusList = params["census-list"];

  let parsedCensusList: CensusList;

  if (censusList) {
    parsedCensusList = JSON.parse(censusList as string);
  }

  const [censusItems, setCensusItems] = useState<CensusItemWithDetails[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getCensusItemsByList(parsedCensusList.id);
      setCensusItems(data);
    };
    load();
  }, []);

  return (
    <View style={globalStyles.modalWindow}>
      <View style={globalStyles.contentContainer}>
        <View style={globalStyles.infoContainer}>
          <CensusView censusList={parsedCensusList} censusItems={censusItems} />
        </View>
      </View>
    </View>
  );
}
