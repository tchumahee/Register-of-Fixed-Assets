// app/components/census/census-list.tsx
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {
  CensusItemWithDetails,
  getCensusItemsByList,
} from "@/app/database/censusService";
import globalStyles from "@/app/styles/global";

export default function CensusListView({ listId }: { listId: number }) {
  const [items, setItems] = useState<CensusItemWithDetails[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getCensusItemsByList(listId);
      setItems(data);
    };
    load();
  }, []);

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => `${item.asset_id}-${item.census_list_id}`}
      renderItem={({ item }) => (
        <View style={styles.item}>
          {item.asset_image ? (
            <Image source={{ uri: item.asset_image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder} />
          )}
          <View>
            <Text style={globalStyles.textLight}>Asset: {item.asset_name}</Text>
            <Text style={globalStyles.textLight}>
              From: {item.previous_location_name} ({item.previous_person})
            </Text>
            <Text style={globalStyles.textLight}>
              To: {item.new_location_name} ({item.new_person})
            </Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#ccc",
  },
});
