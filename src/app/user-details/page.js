'use client';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DynamicForm from "../components/DynamicForm";
import { personalFormFieldConfigs, personalFormValidationSchema } from "../utils/formUtils";
import { setUserData } from '@/store/userSlice';

const UserDetails = () => {
    const dispatch = useDispatch();
    const intervalIdRef = useRef(null);
    const userId = useSelector((state) => state.user.userId);
    const userData = useSelector((state) => state.user.userData);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async (datasetId) => {
        try {
            const response = await fetch(`https://rbac-canary-new.vue.ai/api/v2/datasets/${datasetId}/query`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'x-api-key': 'c30c71fb-f509-4c6f-9c2c-b0aee5a9a167',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: {
                        filter: {
                            operator: "",
                            operands: [
                                { "field": "user_id", "condition_operator": "==", "value": userId }
                            ]
                        }
                    },
                    offset: 0,
                    limit: 250
                })
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setUserData(data.data.results[0]));
            } else {
                console.error('Error fetching user data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await fetch('https://rbac-canary-new.vue.ai/api/v1/jobs/0_eastus_g-900ceefa_14092024_1726298988_ce050e3a', {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'x-api-key': 'c30c71fb-f509-4c6f-9c2c-b0aee5a9a167',
                        'x-client-id': userId,
                    }
                });

                if (response.ok) {
                    clearInterval(intervalIdRef.current);
                    setLoading(false);
                    fetchUserData('f3e51ee2-71db-11ef-adf7-aeb22775e287');
                    fetchUserData('b2757110-71df-11ef-8661-9eeba5939e7d');
                }
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

        intervalIdRef.current = setInterval(checkStatus, 3000);

        return () => clearInterval(intervalIdRef.current);
    }, []);

    return (
        <>
            <DynamicForm 
                validationSchema={personalFormValidationSchema}
                fieldConfigs={personalFormFieldConfigs}
                respValues={userData}
                loading={loading}
            />
        </>
    );
};

export default UserDetails;
