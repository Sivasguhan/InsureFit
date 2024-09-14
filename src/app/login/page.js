'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import UserForm from "../components/UserForm";
import { setUserId } from '@/store/userSlice';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const submitButtonElement = document.getElementById("submit");
    if(loading) {
      submitButtonElement.innerHTML = "Please wait...";
      submitButtonElement.disabled = true;
    } else {
      submitButtonElement.innerHTML = "Login";
      submitButtonElement.disabled = false;
    }
  }, [loading])

  const onSubmitForm = async (formData) => {
    setError(null)
    try {
      setLoading(true);
      const response = await fetch(
        "https://rbac-canary-new.vue.ai/api/v2/datasets/acf0a85e-71b2-11ef-b26a-aeb22775e287/query", 
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
                operator: 'and',
                operands: [
                  { field: 'username', condition_operator: '==', value: formData.username },
                  { field: 'password', condition_operator: '==', value: formData.password },
                ],
              },
            },
            offset: 0,
            limit: 250,
          }),
        }
      );

      const data = await response.json();
      if(data.data.results.length > 0) {
        router.push('/upload-file');
        dispatch(setUserId(data.data.results[0].user_id));
      }
      else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return <UserForm isCreateMode={false} onSubmitForm={onSubmitForm} error={error}/>;
};

export default LoginPage;
