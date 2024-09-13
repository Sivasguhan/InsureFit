import Image from "next/image";

import { useEffect, useState } from "react";
import styles from "./SplashScreen.module.scss";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.splashContainer}>
      <div className={styles.logo}>
        <Image
          src="/img/logo.png"
          width={177}
          height={192}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
