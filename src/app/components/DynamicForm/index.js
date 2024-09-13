import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import styles from "./input.module.scss";

const DynamicForm = ({ fieldConfigs, validationSchema, respValues = {} }) => {
  console.log(fieldConfigs);

  // useEffect(() => {
  //   const fetchInitialValues = async () => {
  //     try {
  //       const response = await fetch("/api/initial-values");
  //       const data = await response.json();
  //       setInitialValues(data);
  //     } catch (error) {
  //       console.error("Failed to fetch initial values:", error);
  //     }
  //   };

  //   // fetchInitialValues();
  // }, []);

  const handleSubmit = async (values) => {
    // try {
    //   const response = await fetch(
    //     "https://rbac-canary-new.vue.ai/docs#/workflows/async_run_workflow_api_v1_workflow_async_run_post",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(body),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Failed to upload");
    //   }
    // } catch (error) {
    //   console.error("Upload failed:", error);
    // }
    console.log("Form values:", values);
  };

  return (
    <Formik
      initialValues={respValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          {fieldConfigs.map((field) => (
            <div key={field.name} className={styles.customFileWrap}>
              <label htmlFor={field.name} className={styles.customLabel}>
                {field.label}
              </label>
              <Field
                type={field.type}
                name={field.name}
                id={field.name}
                className={styles.customInput}
              />

              <ErrorMessage
                name={field.name}
                component="div"
                style={{ color: "red" }}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="submitButton"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
