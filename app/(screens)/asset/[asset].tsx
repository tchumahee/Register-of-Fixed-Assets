import globalStyles from "@/app/styles/global";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { deleteAssetById, getAssetById } from "@/app/database/assetService";
import colors from "@/app/styles/colors";
import { useState, useEffect, useCallback } from "react";
import AssetView from "@/app/components/asset/asset-view";
import { Asset } from "@/app/database/assetService";
import { useFocusEffect } from "@react-navigation/native";

export default function AssetDetails() {
  const router = useRouter();
  const { asset } = useGlobalSearchParams();
  const [assetObj, setAssetObj] = useState<Asset | null>(null);

  const loadAsset = useCallback(async () => {
    if (!asset) return;
    try {
      const parsed = JSON.parse(asset as string);
      const freshAsset = await getAssetById(parsed.id);
      setAssetObj(freshAsset);
    } catch (err) {
      console.warn("Could not parse or fetch asset:", err);
    }
  }, [asset]);

  useFocusEffect(
    useCallback(() => {
      loadAsset();
    }, [loadAsset])
  );

  const editAssetClicked = () => {
    if (!assetObj) return;

    router.push({
      pathname: "/(screens)/asset/add-new-asset",
      params: {
        mode: "edit",
        assetData: JSON.stringify(assetObj),
      },
    });
  };

  const deleteAssetClicked = async () => {
    if (!assetObj) return;

    try {
      await deleteAssetById(assetObj.id);
      console.log("Asset deleted");
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Failed to delete asset:", error);
    }
  };

  if (!assetObj) return null;

  return (
    <View style={globalStyles.modalWindow}>
      <View style={globalStyles.contentContainer}>
        <View style={globalStyles.infoContainer}>
          <AssetView
            asset={assetObj}
            editAssetClicked={editAssetClicked}
            deleteAssetClicked={deleteAssetClicked}
          />
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
