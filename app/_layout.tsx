import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { initDatabase } from "./database/database";
import * as SystemUI from "expo-system-ui";

import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  SystemUI.setBackgroundColorAsync("black");
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const initializeDb = async () => {
      console.log("database load");
      await initDatabase(); // Initialize the database and tables
    };
    initializeDb();
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="(screens)/employee/[employee]"
          options={{
            title: "Employee details",
          }}
        />
        <Stack.Screen
          name="(screens)/location/[location]"
          options={{
            title: "Assets at location",
          }}
        />
        <Stack.Screen
          name="(screens)/asset/[asset]"
          options={{
            title: "Asset details",
          }}
        />
        <Stack.Screen
          name="(screens)/census/[census-list]"
          options={{
            title: "Transfer list details",
          }}
        />

        <Stack.Screen
          name="(screens)/location/add-new-location"
          options={{
            title: "Add new location",
          }}
        />
        <Stack.Screen
          name="(screens)/census/add-new-census-list"
          options={{
            title: "Add new asset transfer list",
          }}
        />
        <Stack.Screen
          name="(screens)/employee/add-new-employee"
          options={({ route }) => {
            const params = route.params as { mode?: string };
            const mode = params?.mode;
            return {
              title: mode === "edit" ? "Edit employee" : "Add new employee",
            };
          }}
        />
        <Stack.Screen
          name="(screens)/asset/add-new-asset"
          options={({ route }) => {
            const params = route.params as { mode?: string };
            const mode = params?.mode;
            return {
              title: mode === "edit" ? "Edit asset" : "Add new asset",
            };
          }}
        />
        <Stack.Screen
          name="(screens)/census/census-item/add-new-census-item"
          options={{
            title: "Add New Item",
          }}
        />

        <Stack.Screen
          name="(screens)/census/census-item/[item]"
          options={{
            headerShown: false,
            title: "Item Details",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
