"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import SplashScreen from "./components/SplashScreen";
import Link from "next/link";

export default function Home() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <SplashScreen />
  ) : (
    <div
      className={`${styles.page} ${styles.freshScreen}`}
    >
      <div className={styles.main}>
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
              href="/register"
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
              href="/login"
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
      </div>
    </div>
  );
}
