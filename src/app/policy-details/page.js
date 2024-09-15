'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import ScreenContainer from '@/app/components/ScreenContainer';
import styles from './policyId.module.scss';

function formatKey(key) {
  let formattedKey = key.replace(/_/g, ' ');

  formattedKey = formattedKey.replace(/([a-z])([A-Z])/g, '$1 $2');
  formattedKey = formattedKey.replace(/\b\w/g, (char) => char.toUpperCase());

  return formattedKey;
}

export default function PolicyDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyId = searchParams.get('id');
  const [isPayButtonClicked, setIsPayButtonClicked] = useState(false);
  const allPolicies = useSelector((state) => state.user.policyDetails);
  const policyDetails = allPolicies.find((policy) => policy.policy_id === policyId);

  const handleButtonClick = () => {
    if(!isPayButtonClicked) setIsPayButtonClicked(true);
    else router.push('/home');
  }

  return (
    <ScreenContainer>
        <div className={styles.container}>
            <div className={styles.planCard}>
                <section>
                    <h2 className={styles.meta}>{policyDetails?.policy_name}</h2>
                    <p className={styles.desc}>{policyDetails?.description}</p>
                </section>
            </div>
            {!isPayButtonClicked ? (
              <div className={styles.details}>
                {Object.entries(policyDetails || {}).map(([label, value], index) => {
                  if (label === "policy_id" || label === "vue_timestamp") {
                    return null;
                  }
                  return (
                    <div key={index} className={styles.detailItem}>
                      <p className={styles.label}>{formatKey(label)}</p>
                      <p className={styles.value}>{value}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className={styles.checkmark__circle} cx="26" cy="26" r="25" fill="none" />
                <path className={styles.checkmark_check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            )}
            <button onClick={handleButtonClick} className={styles.payButton}>
              {isPayButtonClicked ? 'Go to Home' : 'Pay'}
            </button>
        </div>
    </ScreenContainer>
  );
}