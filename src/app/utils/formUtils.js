import * as Yup from "yup";

const personalFormValidationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  sex: Yup.string().required("Sex is required"),
  date_of_birth: Yup.date().required("DOB is required"),
  city: Yup.string().required("City is required"),
  no_of_dependents: Yup.number().min(0, "Dependents cannot be negative").required("Number of dependents is required"),
  job_title: Yup.string().required("Job title is required"),
  income: Yup.number().min(0, "Income cannot be negative").required("Income is required"),
  weight: Yup.number().min(0, "Weight must be positive").required("Weight is required"),
  height: Yup.number().min(0, "Height must be positive").required("Height is required"),
  bmi: Yup.number().min(0, "BMI must be positive").required("BMI is required"),
  hereditary_diseases: Yup.string().required("Hereditary diseases are required"),
  smoker: Yup.string().required("Smoker status is required"),
  bloodpressure: Yup.number().min(0, "Blood pressure must be positive").required("Blood pressure is required"),
  diabetes: Yup.string().required("Diabetes status is required"),
  regular_exercise: Yup.string().required("Regular exercise status is required")
});


const personalFormFieldConfigs = [
  { name: "first_name", type: "text", label: "First Name" },
  { name: "last_name", type: "text", label: "Last Name" },
  { name: "sex", type: "text", label: "Sex" },
  { name: "date_of_birth", type: "date", label: "DOB" },
  { name: "city", type: "text", label: "City" },
  { name: "no_of_dependents", type: "number", label: "Number of Dependents" },
  { name: "job_title", type: "text", label: "Job Title" },
  { name: "income", type: "number", label: "Income" },
  { name: "weight", type: "number", label: "Weight (kg)" },
  { name: "height", type: "number", label: "Height (cm)" },
  { name: "bmi", type: "number", label: "BMI" },
  { name: "hereditary_diseases", type: "text", label: "Hereditary Diseases" },
  { name: "smoker", type: "text", label: "Smoker" },
  { name: "bloodpressure", type: "number", label: "Blood Pressure" },
  { name: "diabetes", type: "text", label: "Diabetes" },
  { name: "regular_exercise", type: "text", label: "Regular Exercise" }
];

export { personalFormValidationSchema, personalFormFieldConfigs };
