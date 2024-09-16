'use client';
import { useEffect, useState } from 'react';
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
  const userId = useSelector((state) => state.user.userId);
  const policyDetails = allPolicies.find((policy) => policy.policy_id === policyId);
  const [rewardData, setRewardData] = useState([]);

  const getRewards = async () => {
    const response = await fetch(
      "https://rbac-canary-new.vue.ai/api/v2/datasets/f2fee644-7293-11ef-8f3c-62737aa4e329/query",
      {
          method: 'POST',
          headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
              'x-api-key': 'c30c71fb-f509-4c6f-9c2c-b0aee5a9a167',
              'x-client-id': 'ee45c008-588a-4639-85e3-c1495f5c4400',
              'x-client-name': 'ee45c008-588a-4639-85e3-c1495f5c4400',
          },
          body: JSON.stringify({
              query: {
                  filter: {
                      operator: '',
                      operands: [
                          { field: "policy_id", condition_operator: "==", value: policyId }
                      ],
                  },
              },
              offset: 0,
              limit: 10,
          }),
      }
    )

    if (response.ok) {
      const data = await response.json();
      setRewardData(data.data.results);
    }
  }

  const upsertData = async (datasetId ,data) => {
    const response = await fetch(`https://rbac-canary-new.vue.ai/api/v2/datasets/${datasetId}/upsert`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'x-api-key': 'c30c71fb-f509-4c6f-9c2c-b0aee5a9a167',
        'Content-Type': 'application/json',
        'x-client-id': 'ee45c008-588a-4639-85e3-c1495f5c4400',
        'x-client-name': 'ee45c008-588a-4639-85e3-c1495f5c4400',
      },
      body: JSON.stringify({
        data: [
          {
            user_id: userId,
            ...data,
          },
        ],
      }),
    });
  
    if (response.ok) {
      return true;
    }
    return false;
  }

  const handleButtonClick = () => {
    if (!isPayButtonClicked) setIsPayButtonClicked(true);
    else {
      upsertData("b97fbd70-729e-11ef-b463-62737aa4e329", {user_id: userId, policy_id: policyId})
      router.push('/home')
    };
  }

  useEffect(() => {
    getRewards();
  },[])

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
                {rewardData.map(reward => (
                  <div key={reward.reward_id} className={styles.rewardCard}>
                  <h3 className={styles['reward-name']}>{reward.reward_name}</h3>
                  <p className={styles['reward-description']}>{reward.reward_description}</p>
                  <div className={styles['fitness-info']}>
                    <p><strong>Fitness Type:</strong> {reward.fitness_type?.replace(/_/g, ' ')}</p>
                    <p><strong>Threshold:</strong> {reward.fitness_threshold}</p>
                    <p><strong>Duration:</strong> {reward.fitness_duration} days</p>
                  </div>
                </div>
                ))}
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