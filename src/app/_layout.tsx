import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

import {
  AuthProvider,
  useAuth,
} from "../context/AuthContext";

function RootNavigator() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) {
      return;
    }

    const currentRoute = segments[0];

    const isOnAuthScreen =
      currentRoute === "sign-in" ||
      currentRoute === "sign-up";

    if (!user && !isOnAuthScreen) {
      router.replace("/sign-in");
      return;
    }

    if (user && isOnAuthScreen) {
      router.replace("/");
    }
  }, [user, loading, segments, router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign Up",
        }}
      />

      <Stack.Screen
        name="emp-info"
        options={{
          title: "Employee Information",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});