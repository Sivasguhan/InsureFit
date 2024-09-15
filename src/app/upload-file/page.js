'use client';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import ScreenContainer from "../components/ScreenContainer";
import CustomFileInput from "../components/CustomFileInput";
import { setJobId } from '@/store/docUploadStore';

const docTypes = [
    { label: "Upload KYC document", id: "kyc" },
    { label: "Upload Health document", id: "healthDoc" },
    { label: "Upload Pay Slip document", id: "paySlip" },
];

const UploadFile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [error, setError] = useState(null);
    const [imageBase64, setImageBase64] = useState({
        healthDoc: null,
        kyc: null,
        paySlip: null,
    });
    const userId = useSelector((state) => state.user.userId);

    const uploadToServer = async (event) => {
        const hasValue = Object.values(imageBase64).some((value) => value !== null);

        if (!hasValue) {
            setError("Please upload the file");
            return;
        }

        const body = {
            "data": {
                aadhar_image: imageBase64.kyc,
                health_doc_image: imageBase64.healthDoc,
                payslip_image: imageBase64.paySlip
            }
        };

        try {
            const response = await fetch(
                'https://rbac-canary-new.vue.ai/api/v1/workflow/async/run?workflow_id=8d851b6a-71be-11ef-a2b5-d2852ff5f423&use_stephanie=false&use_dataset_api=false&disable_cache=true',
                {
                    method: "POST",
                    headers: {
                        "accept": "application/json",
                        "Content-Type": "application/json",
                        "x-api-key": "c30c71fb-f509-4c6f-9c2c-b0aee5a9a167",
                        "x-client-id": userId
                    },
                    body: JSON.stringify(body),
                }
            );

            if (!response.ok) {
                setError("Failed to upload the file. Try again");
            } else {
                response.json().then((data) => {
                    dispatch(setJobId(data["data"]["job_id"]))
                })
                router.push("/user-details");
            }
        } catch (error) {
            setError(`Upload failed: ${error.message}`);
        }
    };

    return (
        <ScreenContainer>
            <div className="w-5/6 font-sans h-full flex flex-col justify-around">
                <div>
                    <h2 className="font-black text-3xl">Upload your documents to proceed further</h2>
                    <p className="text-sm pt-2">We will process these documents to recommend the best policy for you.</p>
                </div>
                <div>
                    {docTypes.map((item) => (
                        <CustomFileInput
                            key={item.id}
                            docType={item.id}
                            label={item.label}
                            setImageBase64={setImageBase64}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    onClick={uploadToServer}
                    className="mt-10 w-full bg-[#14ba9a] p-4 rounded-full font-sans font-bold text-white uppercase"
                    style={{ marginTop: "20px" }}
                >
                    Proceed
                </button>
                {error && <p className="errorMessage">{error}</p>}
            </div>
        </ScreenContainer>
    );
};

export default UploadFile;
