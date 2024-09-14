'use client';
import DynamicForm from "../components/DynamicForm";
import { personalFormFieldConfigs, personalFormValidationSchema } from "../utils/formUtils";

const userDetails = () => {

    return (
        <DynamicForm 
            validationSchema={personalFormValidationSchema}
            fieldConfigs={personalFormFieldConfigs}
        />
    )
}

export default userDetails;