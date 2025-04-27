import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import globalStyles from "../../styles/global";
import {
  CensusItem,
  CensusItemWithDetails,
  CensusList,
} from "../../database/censusService";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { getLocationById, Location } from "@/app/database/locationService";
import { Employee, getEmployeeById } from "@/app/database/employeeService";
import { useEffect, useState } from "react";

function OptionIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} {...props} />;
}

type CensusViewProps = {
  censusList: CensusList;
  censusItems: CensusItemWithDetails[];
};

export default function CensusView({
  censusList,
  censusItems,
}: CensusViewProps) {
  return (
    <View>
      <View>
        <Text style={globalStyles.textLabel}>Date Created:</Text>
        <Text style={globalStyles.textLight}>{censusList.date}</Text>
        <View style={globalStyles.separator}></View>
      </View>
      <FlatList
        data={censusItems}
        keyExtractor={(item) => `${item.asset_id}-${item.census_list_id}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.assetItemContainer}
          >
            {item?.asset_image ? (
              <Image
                source={{ uri: item.asset_image }}
                style={styles.assetImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.assetImagePlaceholder} />
            )}
            <View style={styles.assetTextContainer}>
              <Text style={globalStyles.textLight}>{item?.asset_name}</Text>
              <Text style={globalStyles.textLightS}>
                {item?.previous_location_name} → {item?.new_location_name}
              </Text>
              <Text style={globalStyles.textLightS}>
                {item?.previous_person_name} → {item?.new_person_name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
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
  assetItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 7,
    backgroundColor: colors.cardBackground,
    marginVertical: 4,
    marginHorizontal: 3,
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
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
  },
  editIcon: {
    marginLeft: "auto",
    paddingLeft: 10,
  },
});
