'use client';
import { useState } from "react";
import ScreenContainer from "../components/ScreenContainer";
import CustomFileInput from "../components/CustomFileInput";

const docTypes = [{ label: "Upload KYC document", id: "kyc" },
    { label: "Upload Health document", id: "healthDoc" },
    { label: "Upload Pay Slip document", id: "paySlip" },
];

const UploadFile = () => {
    const [error, setError] = useState(null);

    const [imageBase64, setImageBase64] = useState({
        healthDoc: null,
        kyc: null,
        paySlip: null,
    });

    const uploadToServer = async (event) => {
        const hasValue = Object.values(imageBase64).some((value) => value !== null);

        if (!hasValue) {
            setError("Please upload the file");
        }

        const body = {};

        docTypes.forEach((item) => {
            if (imageBase64[item.id]) {
            body[item.id] = imageBase64[item.id];
            }
        });

        try {
            const response = await fetch(
            process.env.API_URL + "/api/v1/workflow/async/run?workflow_id=",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "x-api-key": "bcc23c03-ff39-42e0-90a6-eabf8a23e9e7",
                },
                body: JSON.stringify(body),
            }
            );

            if (!response.ok) {
            setError("Failed to upload the file. Try again");
            } else {
            console.log(response);
            }
        } catch (error) {
            setError("Upload failed:", error);
        }
        setResponseData(true);
    };

    return <ScreenContainer>
    {docTypes.map((item) => (
      <CustomFileInput
        key={item.id}
        docType={item.id}
        label={item.label}
        setImageBase64={setImageBase64}
      />
    ))}
    <button
      type="submit"
      onClick={uploadToServer}
      className={"submitButton"}
    >
      Proceed
    </button>
    {error && <p className="errorMessage">{error}</p>}
  </ScreenContainer>
};

export default UploadFile