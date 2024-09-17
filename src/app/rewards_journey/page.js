'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';

import HomeScreenContainer from "../components/HomeScreenContainer";

export default function Home() {
    const router = useRouter();
    const userId = useSelector((state) => state.user.userId);

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
        "total_steps": 0,
        "total_active_time": 0,
        "total_cal": 0
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
                var selected_policy_id = data["data"]["results"][0]["policy_id"];

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
                ).then(res => res.json()).then(rewards_data => {
                    // GET USER FITNESS DATA
                    fetch(
                        "https://rbac-canary-new.vue.ai/api/v2/datasets/47df78fc-74a3-11ef-ad00-62c18f17656b/query",
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
                        const results = data.data.results;
                        var user_fitness_data = {
                            "total_steps": 0,
                            "total_active_time": 0,
                            "total_cal": 0
                        }
                        for (let index = 0; index < results.length; index++) {
                            const element = results[index];
                            user_fitness_data["total_steps"] += element["total_steps"] ?? 0;
                            user_fitness_data["total_active_time"] += element["total_active_time"] ?? 0;
                            user_fitness_data["total_cal"] += element["total_cal"] ?? 0;
                        }
                        console.log(user_fitness_data);
                        set_user_fitness(user_fitness_data);
                        set_rewards(rewards_data["data"]["results"]);
                    })
                })
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (
        <HomeScreenContainer>
            <div className='h-full w-5/6 flex flex-col justify-around'>
                <div className="mt-5 w-full overflow-scroll">
                    {
                        rewards.map((reward, index) => (
                            <div className='relative mb-5 border border-[#0A856D] rounded-md flex justify-between h-56'>
                                <div className='absolute bg-[#0A856D] h-full left-0 rounded-md z-0 opacity-50' style={{ "width": `${Math.round((user_fitness_data[reward.fitness_type]/reward.fitness_threshold)*100, 2)}%` }}></div>
                                <div className='flex flex-col w-full justify-between p-4 z-10'>
                                    <div className="flex justify-between mb-1 font-black">
                                        <span className="text-2xl uppercase text-black">{reward.reward_name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className='flex flex-col text-center text-sm'>
                                            <p className='font-bold'>Target</p>
                                            <p>{reward.fitness_threshold}</p>
                                        </div>
                                        <div className='flex flex-col text-center text-sm'>
                                            <p className='font-bold'>Current</p>
                                            <p>{Math.round(user_fitness_data[reward.fitness_type], 2)}</p>
                                        </div>
                                        <div className='flex flex-col text-center text-sm'>
                                            <p className='font-bold'>Remaining</p>
                                            <p>{reward.fitness_threshold - Math.round(user_fitness_data[reward.fitness_type], 2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='my-auto z-10 ml-5'>
                                <span className="font-black text-2xl text-black h-full aligh-middle block text-center p-4">{Math.round((user_fitness_data[reward.fitness_type]/reward.fitness_threshold)*100, 2)}%</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button className="mt-1 w-full bg-[#14ba9a] p-4 rounded-full font-sans font-bold text-white uppercase" onClick={() => router.push("/home")}>
                    Go to Home
                </button>
            </div>
        </HomeScreenContainer>
    );
}
