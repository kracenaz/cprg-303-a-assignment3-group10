import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignIn() {
  const [focusedField, setFocusedField] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Welcome back!</Text>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={signInSchema}
            onSubmit={(values, { resetForm }) => {
              Alert.alert(
                "Sign In Successful",
                `Welcome back, ${values.email}!`
              );
              resetForm();
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }) => (
              <View>
                <Text style={styles.label}>Email</Text>

                <TextInput
                  style={[
                    styles.input,
                    focusedField === "email" && styles.inputFocused,
                    touched.email && errors.email && styles.inputError,
                  ]}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={(event) => {
                    setFocusedField("");
                    handleBlur("email")(event);
                  }}
                />

                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <Text style={styles.label}>Password</Text>

                <TextInput
                  style={[
                    styles.input,
                    focusedField === "password" && styles.inputFocused,
                    touched.password &&
                      errors.password &&
                      styles.inputError,
                  ]}
                  placeholder="Enter your password"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onFocus={() => setFocusedField("password")}
                  onBlur={(event) => {
                    setFocusedField("");
                    handleBlur("password")(event);
                  }}
                />

                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <Pressable
                  style={[
                    styles.button,
                    (!isValid || !dirty) && styles.buttonDisabled,
                  ]}
                  onPress={() => handleSubmit()}
                  disabled={!isValid || !dirty}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputFocused: {
    borderColor: "#333",
    borderWidth: 2,
  },
  inputError: {
    borderColor: "#d32f2f",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 13,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 28,
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});