import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import styles from "./input.module.scss";
import ScreenContainer from "../ScreenContainer";

const DynamicForm = ({ fieldConfigs, validationSchema, respValues, loading, onSubmit }) => {

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <ScreenContainer>
      {loading && <p style={{color: 'purple'}}>Fetching details...</p>}
      <div className={styles.formContainer}>
      <Formik
        initialValues={respValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
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
              className="submitButton"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </ScreenContainer>
  );
};

export default DynamicForm;
