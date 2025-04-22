import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FlatList } from 'react-native';
import colors from '@/app/styles/colors';
import globalStyles from '@/app/styles/global';
import { useCallback, useEffect, useState } from 'react';
import { getAllAssets, Asset } from '@/app/database/assetService';
import { useFocusEffect, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

function FloatingButtonIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={15} style={{ marginBottom: -3 }} {...props} />;
}

export default function IndexScreen() {
  const router = useRouter();

  function addNewEntryModal() {
    router.push('/(screens)/asset/add-new-asset?mode=add');
  }

  const [assets, setAssets] = useState<Asset[]>([]);

  const fetchAssets = async () => {
    const data = await getAllAssets();
    setAssets(data);
  };

  const handlePress = (asset: Asset) => {
    router.push({
      pathname: `/(screens)/asset/[asset]`,
      params: { asset: JSON.stringify(asset) }
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchAssets();
    }, [])
  );

  return (
    <View style={globalStyles.viewContainer}>
      <FlatList
        data={assets}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
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

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={addNewEntryModal}
        style={globalStyles.floatingButtonRight}
      >
        <FloatingButtonIcon name="plus" color={'black'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  assetItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 7,
    backgroundColor: colors.cardBackground,
    margin: 3
  },
  assetImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10
  },
  assetImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#ccc'
  },
  assetTextContainer: {
    backgroundColor: 'rgba(0,0,0,0)'
  }
});
