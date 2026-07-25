import { Formik } from "formik";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const Employee = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "Enter at least 2 letters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Enter at least 2 letters"),
  birthday: Yup.string()
    .required("Birthday is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
  overOneYear: Yup.boolean(),
  role: Yup.string()
    .required("Role is required")
    .min(2, "Enter at least 2 letters"),
});

export default function EmployeeInformation() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Enter Employee Information</Text>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            birthday: "",
            overOneYear: false,
            role: "",
          }}
          validationSchema={Employee}
          validateOnMount
          onSubmit={(values, { resetForm }) => {
            Alert.alert(
              "Employee information for",
              `${values.firstName} ${values.lastName} has been submitted`,
            );
            resetForm();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isValid,
          }) => (
            <View>
              <Text>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter first name here"
                value={values.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
              />
              {touched.firstName && errors.firstName && (
                <Text style={styles.error}>{errors.firstName}</Text>
              )}
              <Text>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter last name here"
                value={values.lastName}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles.error}>{errors.lastName}</Text>
              )}
              <Text>Birthday</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={values.birthday}
                onChangeText={handleChange("birthday")}
                onBlur={handleBlur("birthday")}
              />
              {touched.birthday && errors.birthday && (
                <Text style={styles.error}>{errors.birthday}</Text>
              )}
              <View style={styles.switchRow}>
                <Text>Worked here for more than 1 year?</Text>
                <Switch
                  value={values.overOneYear}
                  onValueChange={(value) => setFieldValue("overOneYear", value)}
                />
              </View>
              <Text>Role</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter role here"
                value={values.role}
                onChangeText={handleChange("role")}
                onBlur={handleBlur("role")}
              />
              {touched.role && errors.role && (
                <Text style={styles.error}>{errors.role}</Text>
              )}
              <Button
                title="Submit"
                onPress={() => handleSubmit()}
                disabled={!isValid}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});
