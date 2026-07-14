import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose one of the following options:</Text>
        <Text> </Text>
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
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  buttons: {
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: "white",
    backgroundColor: "darkblue",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonSection: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
});
