'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';

import HomeScreenContainer from "../components/HomeScreenContainer";

export default function Home() {
    const router = useRouter();
    const userId = useSelector((state) => state.user.userId);

    const [policy_details, set_policy_details] = useState({
        "policy_id": "",
        "policy_name": "",
        "terms": "",
        "duration": "",
        "premium": "",
        "coverage": "",
        "description": "",
        "offers": "",
        "vue_timestamp": ""
    });

    const [rewards, set_rewards] = useState([{
        "reward_id": "R001",
        "policy_id": "BH001",
        "reward_name": "Step Challenge",
        "reward_description": "25% off on select brands of athletic footwear",
        "fitness_type": "total_steps",
        "fitness_threshold": 70000,
        "fitness_duration": 7,
        "vue_timestamp": "2024-09-14 12:28:46"
    }])

    const [user_fitness_data, set_user_fitness] = useState({
        "total_steps": 50000,
        "total_active_time": 17,
        "total_cal": 8200
    })

    useEffect(() => {
        new Promise(r => setTimeout(r, 2000));
        fetch(
            "https://rbac-canary-new.vue.ai/api/v2/datasets/b97fbd70-729e-11ef-b463-62737aa4e329/query",
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': 'c30c71fb-f509-4c6f-9c2c-b0aee5a9a167',
                },
                body: JSON.stringify({
                    query: {
                        filter: {
                            operator: '',
                            operands: [
                                { field: 'user_id', condition_operator: '==', value: userId }
                            ],
                        },
                    },
                    offset: 0,
                    limit: 1,
                }),
            }
        ).then(res => res.status == 200 ? res.json() : null)
            .then(data => {
                const selected_policy_id = data["data"]["results"][0]["policy_id"];
                // FETCH POLICY DETAILS
                fetch(
                    "https://rbac-canary-new.vue.ai/api/v2/datasets/26e5fe52-71c2-11ef-875d-6e798490894d/query",
                    {
                        method: 'POST',
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'x-api-key': 'c30c71fb-f509-4c6f-9c2c-b0aee5a9a167',
                        },
                        body: JSON.stringify({
                            query: {
                                filter: {
                                    operator: '',
                                    operands: [
                                        { field: "policy_id", condition_operator: "==", value: selected_policy_id }
                                    ],
                                },
                            },
                            offset: 0,
                            limit: 1,
                        }),
                    }
                ).then(res => res.json()).then(data => {
                    set_policy_details(data["data"]["results"][0]);
                })

                // FETCH REWARDS DETAILS
                fetch(
                    "https://rbac-canary-new.vue.ai/api/v2/datasets/f2fee644-7293-11ef-8f3c-62737aa4e329/query",
                    {
                        method: 'POST',
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'x-api-key': 'c30c71fb-f509-4c6f-9c2c-b0aee5a9a167',
                        },
                        body: JSON.stringify({
                            query: {
                                filter: {
                                    operator: '',
                                    operands: [
                                        { field: "policy_id", condition_operator: "==", value: selected_policy_id }
                                    ],
                                },
                            },
                            offset: 0,
                            limit: 10,
                        }),
                    }
                ).then(res => res.json()).then(data => {
                    set_rewards(data["data"]["results"]);
                    // GET USER FITNESS DATA
                    fetch(
                        "https://rbac-canary-new.vue.ai/api/v2/datasets/00da0492-7389-11ef-be15-eaf6eaa00cec/query",
                        {
                            method: 'POST',
                            headers: {
                                'accept': 'application/json',
                                'Content-Type': 'application/json',
                                'x-api-key': 'c30c71fb-f509-4c6f-9c2c-b0aee5a9a167',
                            },
                            body: JSON.stringify({
                                query: {
                                    filter: {
                                        operator: '',
                                        operands: [
                                            { field: "user_id", condition_operator: "==", value: userId }
                                        ],
                                    },
                                },
                                offset: 0,
                                limit: 10,
                            }),
                        }
                    ).then(res => res.json()).then(data => {
                        const user_fitness_data = {
                            "total_steps": data.total_steps ?? 0,
                            "total_active_time": data.total_active_time ?? 0,
                            "total_cal": data.total_cal ?? 0
                        }
                        set_user_fitness(user_fitness_data)
                    })
                })
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (
        <HomeScreenContainer>
            <div className='ml-5 mr-5 h-full flex flex-col justify-around'>
                <section className="p-5 rounded-md shadow-lg bg-gradient-to-tr from-[#B9E8DF] to-[#0A856D] font-sans">
                    <h2 className='text-3xl font-black text-gray-900'>{policy_details.policy_name}</h2>
                    <p className=''>{policy_details.description}</p>
                    <div className='flex flex-row justify-between mt-20 text-xs font-bold text-black uppercase'>
                        <p>{policy_details.coverage}</p>
                        <p>{policy_details.premium}</p>
                    </div>
                </section>
                <div className="mt-5 w-full">
                    {
                        rewards.map((reward, index) => (
                            <div className='mb-5'>
                                <div class="flex justify-between mb-1">
                                    <span class="text-base font-medium text-black">{reward.reward_name}</span>
                                    <span class="text-sm font-medium text-black">{Math.round((user_fitness_data[reward.fitness_type]/reward.fitness_threshold)*100, 2)}%</span>
                                </div>
                                <div class="w-full rounded-md h-4 border border-gray-400">
                                    <div class="bg-teal-600 h-full rounded-md" style={{ "width": `${Math.round((user_fitness_data[reward.fitness_type]/reward.fitness_threshold)*100, 2)}%` }}></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </HomeScreenContainer>
    );
}
