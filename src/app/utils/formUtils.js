import * as Yup from "yup";

const personalFormValidationSchema = Yup.object({
  fname: Yup.string().required("First Name is required"),
  lname: Yup.string().required("Last Name is required"),
  sex: Yup.string().required("Sex is required"),
  dob: Yup.date().required("DOB is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

const personalFormFieldConfigs = [
  { name: "fname", type: "text", label: "First Name" },
  { name: "lname", type: "text", label: "Last Name" },
  { name: "sex", type: "text", label: "Sex" },
  { name: "dob", type: "date", label: "DOB" },
  { name: "email", type: "email", label: "Email ID" },
];

export { personalFormValidationSchema, personalFormFieldConfigs };
