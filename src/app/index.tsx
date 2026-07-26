import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import { auth } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    try {
      setLoading(true);

      await signOut(auth);

      router.replace("/sign-in");
    } catch (error: any) {
      Alert.alert("Sign Out Failed", error.message || "Unable to sign out.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Text style={styles.label}>Signed in as</Text>

      <Text style={styles.email}>{user?.email ?? "No email available"}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Employee Information"
          onPress={() => router.push("/emp-info")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View Submissions"
          onPress={() => router.push("/emp-list")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Signing Out..." : "Sign Out"}
          onPress={handleSignOut}
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    marginBottom: 15,
  },
});