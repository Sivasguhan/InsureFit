'use client'
import ScreenContainer from "../components/ScreenContainer";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import styles from './policy.module.scss'
import { useEffect } from "react";
import { setPolicyDetails } from "@/store/userSlice";

const PolicyListing = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const userId = useSelector((state) => state.user.userId);
    const policyDetails = useSelector((state) => state.user.policyDetails);
    const recommendedPolicy = useSelector((state) => state.user.recommendedPolicy);

    const runWorkflow = async () => {
        const response = await fetch('https://rbac-canary-new.vue.ai/api/v1/workflow/async/run?workflow_id=bd943d36-71ff-11ef-bf38-9ee7bd89bd7e&use_stephanie=false&use_dataset_api=false&disable_cache=true', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'x-api-key': 'c30c71fb-f509-4c6f-9c2c-b0aee5a9a167',
                'Content-Type': 'application/json',
                'x-client-id': 'ee45c008-588a-4639-85e3-c1495f5c4400',
                'x-client-name': 'ee45c008-588a-4639-85e3-c1495f5c4400',
            },
            body: JSON.stringify({
                user_id: userId,
            })
        })
        if (response.ok) {
            const data = await response.json();
            getPolicyIds(data.data.job_id);
        } else {
            console.error('Error fetching user data:', response.statusText);
        }
    };

    const getPolicyIds = async (jobId) => {
        const response = await fetch(`https://rbac-canary-new.vue.ai/api/v1/jobs/${jobId}/node/gpt_inference100/payload`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'x-api-key': 'c30c71fb-f509-4c6f-9c2c-b0aee5a9a167',
                'x-client-id': 'ee45c008-588a-4639-85e3-c1495f5c4400',
                'x-client-name': 'ee45c008-588a-4639-85e3-c1495f5c4400',
            },
        })

        if (response.ok) {
            const data = await response.json();
            getPolicyList(data.data || []);
        } else {
            console.error('Error fetching user data:', response.statusText);
        }
    }

    const getPolicyList = async (policyIds) => {
        const response = await fetch('https://rbac-canary-new.vue.ai/api/v2/datasets/26e5fe52-71c2-11ef-875d-6e798490894d/query', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'x-api-key': 'c30c71fb-f509-4c6f-9c2c-b0aee5a9a167',
                'Content-Type': 'application/json',
                'x-client-id': 'ee45c008-588a-4639-85e3-c1495f5c4400',
                'x-client-name': 'ee45c008-588a-4639-85e3-c1495f5c4400',
            },
            body: JSON.stringify({
                query: {
                    filter: {
                        operator: "",
                        operands: [
                            { field: "policy_id", condition_operator: "in", value: policyIds }
                        ]
                    }
                },
                offset: 0,
                limit: 5
            })
        });
    
        if (response.ok) {
            const data = await response.json();
            dispatch(setPolicyDetails(data.data.results));
        } else {
            console.error('Error fetching dataset:', response.statusText);
        }
    }    

    useEffect(() => {
        runWorkflow();
    }, []);

    return (
        <ScreenContainer>
            <div className={styles.container}>
                <div className={styles.recommendationCard}>
                    <section>
                        <h2 className={styles.meta}>Insurance Plan Recommended for you</h2>
                        <p className={styles.desc}>Enjoy more coverage on the premium health insurance</p>
                    </section>
                    <section className={styles.planDetail}>
                        <h3>{recommendedPolicy?.policy_name}</h3>
                        <p className={styles.price}>{recommendedPolicy?.premium}</p>
                    </section>
                </div>
                <div className={styles.plansListContainer}>
                    <span className={styles.title}>Insurance Plans</span>
                    <section className={styles.plansList}>
                        {policyDetails.map((policy, index) => (
                            <div key={index} className={styles.plan} onClick={() => {
                                router.push(`/policy-details?id=${policy.policy_id}`);
                            }}>
                                <p className={styles.planName}>{policy?.policy_name}</p>
                                <p className={styles.planAmount}>{policy?.premium}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </ScreenContainer>
    )
}

export default PolicyListing;