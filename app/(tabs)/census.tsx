import { FlatList, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useCallback, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import globalStyles from "@/app/styles/global";

import { getAllCensusLists, CensusList } from "../database/censusService";

function FloatingButtonIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={15} style={{ marginBottom: -3 }} {...props} />;
}

export default function CensusListsScreen() {
  const [censusLists, setCensusLists] = useState<CensusList[]>([]);
  const router = useRouter();

  const fetchLists = async () => {
    const data = await getAllCensusLists();
    setCensusLists(data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchLists();
    }, [])
  );

  const handlePress = (list: CensusList) => {
    router.push({
      pathname: "/(screens)/census/[census-list]",
      params: { "census-list": JSON.stringify(list) },
    });
  };

  const addNew = () => {
    router.push("/(screens)/census/add-new-census-list");
  };

  return (
    <View style={globalStyles.viewContainer}>
      {censusLists.length === 0 ? (
        <Text
          style={[
            globalStyles.textLight,
            { textAlign: "center", marginTop: 20 },
          ]}
        >
          No items found.
        </Text>
      ) : (
        <FlatList
          data={censusLists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePress(item)}
              activeOpacity={0.8}
              style={globalStyles.listItem}
            >
              <Text style={globalStyles.textLight}>{item.date}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={addNew}
        style={globalStyles.floatingButtonRight}
      >
        <FloatingButtonIcon name="plus" color={"black"} />
      </TouchableOpacity>
    </View>
  );
}
