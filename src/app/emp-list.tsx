import {
    collection,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../config/firebase";

type Submission = {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  overOneYear: boolean;
  role: string;
  createdAt: Timestamp | null;
};

export default function EmployeeList() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const start = async () => {
      try {
        // TEMP DEV ONLY: sign in with test account for local testing.
        // Remove once M2 ships real sign-in screen.
        // if (!auth.currentUser) {
        //   await signInWithEmailAndPassword(
        //     auth,
        //     "ahmed@test.com",
        //     "test123456",
        //   );
        // }

        const uid = auth.currentUser?.uid;
        if (!uid) {
          setError("Not signed in");
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, "emp"),
          where("user", "==", uid),
          orderBy("createdAt", "desc"),
        );

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const rows: Submission[] = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                firstName: data.firstName ?? "",
                lastName: data.lastName ?? "",
                birthday: data.birthday ?? "",
                overOneYear: data.overOneYear ?? false,
                role: data.role ?? "",
                createdAt: data.createdAt ?? null,
              };
            });
            setItems(rows);
            setLoading(false);
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          },
        );
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    start();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Loading submissions...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.error}>Something went wrong</Text>
        <Text style={styles.muted}>{error}</Text>
        <Button
          title="Retry"
          onPress={() => {
            setError(null);
            setLoading(true);
          }}
        />
      </SafeAreaView>
    );
  }

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.title}>No submissions yet</Text>
        <Text style={styles.muted}>
          Submit an employee on the Employee Form to see it here.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Submissions</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.firstName} {item.lastName}
            </Text>
            <Text>Role: {item.role}</Text>
            <Text>Birthday: {item.birthday}</Text>
            <Text>Over 1 year: {item.overOneYear ? "Yes" : "No"}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  muted: {
    color: "gray",
    marginTop: 8,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
});
