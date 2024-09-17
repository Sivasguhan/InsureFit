'use client'
import ScreenContainer from "../components/ScreenContainer";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import styles from './policy.module.scss'
import { useEffect, useState } from "react";
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
        for (let index = 0; index < 10; index++) {
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
                if (data.data == undefined || data.data == null) {
                    await new Promise(r => setTimeout(r, 2000));
                    continue
                }
                getPolicyList(data.data.data || []);
                break
            } else {
                console.error('Error fetching user data:', response.statusText);
            }
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
            console.log(data);
            var ordered_policy = Array(data.data.results.length).fill(null);
            data.data.results.forEach(element => {
                const _policy_id = element.policy_id;
                ordered_policy[policyIds.indexOf(_policy_id)] = element;
            });
            dispatch(setPolicyDetails(ordered_policy));
        } else {
            console.error('Error fetching dataset:', response.statusText);
        }
    }

    useEffect(() => {
        runWorkflow();
    }, []);

    return (
        <ScreenContainer>
            <div className="font-sans w-5/6">
                <div className="relative flex flex-col justify-between p-5 rounded-md shadow-lg bg-gradient-to-tr from-[#B9E8DF] via-[#28c1a4] to-[#0A856D] font-sans h-[400px] shadow-2xl">
                    <section>
                        <div className="font-black text-3xl">
                            <h2>Insurance Plan</h2>
                            <p>Recommended for you</p>
                        </div>
                        <p className="text-sm pt-2">Enjoy more coverage on the premium health insurance</p>
                    </section>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-24 absolute h-full top-22 right-10 -rotate-45">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <h3 className="font-black text-xl uppercase text-wrap w-1/2">{recommendedPolicy?.policy_name}</h3>
                    <section className="text-lg text-gray-800">
                        <p className={styles.price}>{recommendedPolicy?.premium}</p>
                        <hr className="w-1/2 my-2"></hr>
                        <p className={styles.price}>{recommendedPolicy?.coverage}</p>
                    </section>
                </div>
                <div className={styles.plansListContainer}>
                    <span className="font-bold text-lg">Insurance Plans</span>
                    <section className="flex flex-col mt-6">
                        {policyDetails.map((policy, index) => (
                            <div key={index} className="flex justify-between border-[#14ba9a] border bg-white p-4 rounded-lg w-full mb-5 cursor-pointer hover:bg-gray-400 hover:fold-bold hover:shadow-lg" onClick={() => {
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