'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserForm from "../components/UserForm";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const submitButtonElement = document.getElementById("submit");
    if(loading) {
      submitButtonElement.innerHTML = "Please wait...";
      submitButtonElement.disabled = true;
    } else {
      submitButtonElement.innerHTML = "Create User";
      submitButtonElement.disabled = false;
    }
  }, [loading])

  // Function to generate a random UUID
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const onSubmitForm = async (formData) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://rbac-canary-new.vue.ai/api/v2/datasets/acf0a85e-71b2-11ef-b26a-aeb22775e287/upsert", 
        {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'c30c71fb-f509-4c6f-9c2c-b0aee5a9a167',
          },
          body: JSON.stringify({
            data: [
              {
                user_id: generateUUID(),
                username: formData.username,
                password: formData.password,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (response.ok && data) {
        router.push('/upload-file');
      } else {
        console.error('Error in API response:', data);
      }
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setLoading(false);
    }
  };

  return <UserForm isCreateMode={true} onSubmitForm={onSubmitForm}/>;
};

export default RegisterPage;