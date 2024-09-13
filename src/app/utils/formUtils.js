import * as Yup from "yup";

const personalFormValidationSchema = Yup.object({
  fname: Yup.string().required("First Name is required"),
  lname: Yup.string().required("Last Name is required"),
  dob: Yup.date().required("DOB is required"),
});

const personalFormFieldConfigs = [
  { name: "fname", type: "text", label: "First Name" },
  { name: "lname", type: "text", label: "Last Name" },
  { name: "dob", type: "date", label: "DOB" },
];

export { personalFormValidationSchema, personalFormFieldConfigs };
