import { useState } from "react";
import styles from "./fileInput.module.scss";

const CustomFileInput = ({ docType, label, setImageBase64 }) => {
  const [error, setError] = useState(null);

  const [fileInfo, setFileInfo] = useState(null);

  const convertToBase64 = (file, docType) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64((prevState) => ({
        ...prevState,
        [docType]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Only PDF, JPG, and PNG are allowed.");
        return;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > maxSize) {
        setError("File size must not exceed 2MB.");
        return;
      }
      //   setCreateObjectURL(URL.createObjectURL(file));
      setFileInfo(file);

      convertToBase64(file, docType);
      setError(null);
    }
  };

  return (
    <div className={styles.customFileWrap}>
      <h4 className={styles.customLabel}>{label}</h4>
      <label
        htmlFor={`fileUpload-${docType}`}
        className={styles.customFileInput}
      >
        {fileInfo ? fileInfo.name : "Upload a file (PDF, JPG, PNG, max 2MB)"}
      </label>
      <input
        type="file"
        id={`fileUpload-${docType}`}
        accept=".pdf,.jpg,.jpeg,.png"
        name={docType}
        onChange={uploadToClient}
        className={styles.hidden}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CustomFileInput;
