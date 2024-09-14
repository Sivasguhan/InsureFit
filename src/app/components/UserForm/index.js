"use client";
import ScreenContainer from '../ScreenContainer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './userform.module.scss';

const UserForm = ({ isCreateMode, onSubmitForm, error }) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is Required'),
    password: Yup.string().required('Password is Required'),
  });

  const handleSubmit = (values) => {
    onSubmitForm(values);
  };

  return (
    <ScreenContainer>
      <div className={styles.formWrapper}>
        <h1 className={styles.formTitle}>{isCreateMode ? 'CREATE USER' : 'LOGIN'}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {formik => (
            <Form>
              <div>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className={styles.inputField}
                />
                <ErrorMessage name="username" component="div" className={styles.error} />
              </div>
              <div>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className={styles.inputField}
                />
                <ErrorMessage name="password" component="div" className={styles.error} />
              </div>
              <button id="submit"type="submit" className={styles.submitButton}>
                {isCreateMode ? 'Create User' : 'Login'}
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </ScreenContainer>
  );
};

export default UserForm;
