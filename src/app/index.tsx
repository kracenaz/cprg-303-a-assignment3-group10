import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Choose one of the following options:</Text>
        <Link style={styles.buttons} href="/emp-info">
          Enter Employee Information
        </Link>
        <Link style={styles.buttons} href="/sign-in">
          Sign In
        </Link>
        <Link style={styles.buttons} href="/sign-up">
          Sign Up
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    padding: 25,
  },
});
