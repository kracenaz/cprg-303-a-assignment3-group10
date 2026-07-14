import { useEffect, useState } from "react";
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
// Lightweight local Formik-like component to avoid dependency on 'formik'
function Formik({ initialValues, validationSchema, onSubmit, children }: any) {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    // validate on values change
    if (validationSchema && validationSchema.validateSync) {
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        setErrors({});
      } catch (err: any) {
        const e: any = {};
        if (err.inner && Array.isArray(err.inner)) {
          err.inner.forEach((vi: any) => {
            if (vi.path) e[vi.path] = vi.message;
          });
        } else if (err.path) {
          e[err.path] = err.message;
        }
        setErrors(e);
      }
    }
  }, [values]);

  const handleChange = (field: string) => (text: any) => {
    setValues((v: any) => ({ ...v, [field]: text }));
    setDirty(true);
  };

  const handleBlur = (field: string) => (_event?: any) => {
    setTouched((t: any) => ({ ...t, [field]: true }));
  };

  const setFieldValue = (field: string, val: any) => {
    setValues((v: any) => ({ ...v, [field]: val }));
    setDirty(true);
  };

  const setFieldTouched = (field: string, val: boolean) => {
    setTouched((t: any) => ({ ...t, [field]: val }));
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = () => {
    if (validationSchema && validationSchema.validate) {
      validationSchema
        .validate(values, { abortEarly: false })
        .then(() => {
          onSubmit(values, { resetForm: () => setValues(initialValues) });
        })
        .catch((err: any) => {
          const e: any = {};
          if (err.inner && Array.isArray(err.inner)) {
            err.inner.forEach((vi: any) => {
              if (vi.path) e[vi.path] = vi.message;
            });
          }
          setErrors(e);
        });
    } else {
      onSubmit(values, { resetForm: () => setValues(initialValues) });
    }
  };

  return (
    // @ts-ignore
    children({
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      setFieldTouched,
      values,
      errors,
      touched,
      isValid,
      dirty,
    })
  );
}

const departments = [
  "Engineering",
  "Sales",
  "Marketing",
  "Human Resources",
  "Finance",
  "Operations",
];

const employeeSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .matches(/^[A-Za-z\s'-]+$/, "Name can only contain letters")
    .required("Full name is required"),
  employeeId: Yup.string()
    .matches(/^EMP-\d{4}$/, "Format must be EMP-1234")
    .required("Employee ID is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9\s\-().]{7,15}$/, "Please enter a valid phone number")
    .required("Phone number is required"),
  department: Yup.string().required("Please select a department"),
  salary: Yup.number()
    .typeError("Salary must be a number")
    .positive("Salary must be greater than 0")
    .required("Salary is required"),
});

export default function EmployeeInformation() {
  const [focusedField, setFocusedField] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Employee Information</Text>
          <Text style={styles.subtitle}>Add a new employee record</Text>

          <Formik
            initialValues={{
              fullName: "",
              employeeId: "",
              email: "",
              phone: "",
              department: "",
              salary: "",
            }}
            validationSchema={employeeSchema}
            onSubmit={(
              values: any,
              { resetForm }: { resetForm: () => void },
            ) => {
              Alert.alert(
                "Employee Added",
                `${values.fullName} was added to ${values.department}.`,
              );
              resetForm();
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }: {
              handleChange: (field: string) => (text: any) => void;
              handleBlur: (field: string) => () => void;
              handleSubmit: () => void;
              setFieldValue: (field: string, val: any) => void;
              setFieldTouched: (field: string, val: boolean) => void;
              values: any;
              errors: any;
              touched: any;
              isValid: boolean;
              dirty: boolean;
            }) => (
              <View>
                <Text style={styles.label}>Full Name</Text>

                <TextInput
                  style={[
                    styles.input,
                    focusedField === "fullName" && styles.inputFocused,
                    touched.fullName && errors.fullName && styles.inputError,
                  ]}
                  placeholder="Jane Doe"
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => {
                    setFocusedField("");
                    handleBlur("fullName")();
                  }}
                />

                {touched.fullName && errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}

                <Text style={styles.label}>Employee ID</Text>

                <TextInput
                  style={[
                    styles.input,
                    focusedField === "employeeId" && styles.inputFocused,
                    touched.employeeId &&
                      errors.employeeId &&
                      styles.inputError,
                  ]}
                  placeholder="EMP-1234"
                  autoCapitalize="characters"
                  value={values.employeeId}
                  onChangeText={handleChange("employeeId")}
                  onFocus={() => setFocusedField("employeeId")}
                  onBlur={() => {
                    setFocusedField("");
                    handleBlur("employeeId")();
                  }}
                />

                {touched.employeeId && errors.employeeId && (
                  <Text style={styles.errorText}>{errors.employeeId}</Text>
                )}

                <Text style={styles.label}>Email</Text>

                <TextInput
                  style={[
                    styles.input,
                    focusedField === "email" && styles.inputFocused,
                    touched.email && errors.email && styles.inputError,
                  ]}
                  placeholder="jane.doe@company.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => {
                    setFocusedField("");
                    handleBlur("email")();
                  }}
                />

                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <Text style={styles.label}>Phone Number</Text>

                <TextInput
                  style={[
                    styles.input,
                    focusedField === "phone" && styles.inputFocused,
                    touched.phone && errors.phone && styles.inputError,
                  ]}
                  placeholder="+1 403 555 0134"
                  keyboardType="phone-pad"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => {
                    setFocusedField("");
                    handleBlur("phone")();
                  }}
                />

                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}

                <Text style={styles.label}>Department</Text>

                <View style={styles.chipRow}>
                  {departments.map((dept) => (
                    <Pressable
                      key={dept}
                      style={[
                        styles.chip,
                        values.department === dept && styles.chipSelected,
                      ]}
                      onPress={() => {
                        setFieldValue("department", dept);
                        setFieldTouched("department", true);
                      }}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          values.department === dept && styles.chipTextSelected,
                        ]}
                      >
                        {dept}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                {touched.department && errors.department && (
                  <Text style={styles.errorText}>{errors.department}</Text>
                )}

                <Text style={styles.label}>Annual Salary (CAD)</Text>

                <TextInput
                  style={[
                    styles.input,
                    focusedField === "salary" && styles.inputFocused,
                    touched.salary && errors.salary && styles.inputError,
                  ]}
                  placeholder="65000"
                  keyboardType="numeric"
                  value={values.salary}
                  onChangeText={handleChange("salary")}
                  onFocus={() => setFocusedField("salary")}
                  onBlur={() => {
                    setFocusedField("");
                    handleBlur("salary")();
                  }}
                />

                {touched.salary && errors.salary && (
                  <Text style={styles.errorText}>{errors.salary}</Text>
                )}

                <Pressable
                  style={[
                    styles.button,
                    (!isValid || !dirty) && styles.buttonDisabled,
                  ]}
                  onPress={() => handleSubmit()}
                  disabled={!isValid || !dirty}
                >
                  <Text style={styles.buttonText}>Submit</Text>
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
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  chipSelected: {
    backgroundColor: "#222",
    borderColor: "#222",
  },
  chipText: {
    fontSize: 14,
    color: "#333",
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "600",
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
