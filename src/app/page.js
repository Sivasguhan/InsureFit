"use client";
import Image from "next/image";

import { useState, useEffect } from "react";

import styles from "./page.module.scss";
import CustomFileInput from "./components/CustomFileInput";
import SplashScreen from "./components/SplashScreen";
import DynamicForm from "./components/DynamicForm";

import {
  personalFormFieldConfigs,
  personalFormValidationSchema,
} from "./utils/formUtils";
import Link from "next/link";

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState("");

  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return loading ? (
    <SplashScreen />
  ) : (
    <div
      className={`${styles.page} ${responseData ? styles.dataPosted : ""} ${
        !userStatus ? styles.freshScreen : styles[userStatus]
      }`}
    >
      <div className={styles.main}>
        {/* {!userStatus ? ( */}
          <>
            <div className={styles.logo}>
              <Image
                src="/img/logo.png"
                width={90}
                height={98}
                alt="Picture of the author"
              />
            </div>
            <Link 
              href="/login"
              className={styles.userSelect}
            >
              <Image
                src="/img/avatar.png"
                width={40}
                height={40}
                alt="Picture of the author"
              />
              New User
            </Link>
            <Link
              href="/register"
              className={styles.userSelect}
            >
              <Image
                src="/img/avatar.png"
                width={40}
                height={40}
                alt="Picture of the author"
              />
              Existing User
            </Link>
          </>
        {/* ) : !responseData ? (
          <>
            {docTypes.map((item) => (
              <CustomFileInput
                key={item.id}
                docType={item.id}
                label={item.label}
                setImageBase64={setImageBase64}
              />
            ))}
            <button
              type="submit"
              onClick={uploadToServer}
              className={"submitButton"}
            >
              Proceed
            </button>
            {error && <p className="errorMessage">{error}</p>}
          </>
        ) : userStatus == "new" ? (
          <>
            <DynamicForm
              validationSchema={personalFormValidationSchema}
              fieldConfigs={personalFormFieldConfigs}
            />
          </>
        ) : (
          <></>
        )} */}
      </div>
    </div>
  );
}
