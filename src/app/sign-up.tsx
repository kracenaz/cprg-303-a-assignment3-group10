import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Sign Up</Text>
      </ScrollView>
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
    padding: 25,
    fontWeight: "bold",
  },
});
