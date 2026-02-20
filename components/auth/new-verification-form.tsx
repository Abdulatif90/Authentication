"use client";

import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

const NewVerificationForm = () => {
        const [ error, setError ] = useState<string | undefined>();
        const [ success, setSuccess ] = useState<string | undefined>();
        const searchParams = useSearchParams();
        const token = searchParams.get("token");
       
        const onSubmit = useCallback(() => {
            if (!token) {
                setError("Token is required");
                return;
            }
            newVerification(token)
            .then((data) => {
                if (data?.error) {
                    setError(data.error);
                }
                if (data?.success) {
                    setSuccess(data.success);
                }
            })
            .catch(() => {
                setError("An error occurred during verification.");
            })
        }, [token]);

        useEffect(() => {
            onSubmit();    // bu xatolikni keyin togrilaymiz. useEffect ichida state berilmaslik kerak
        }, [onSubmit]);

    return (
        <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to Login"
        backButtonHref="/auth/login">   
            <div className="flex items-center justify-center w-full">
                {!error && !success && (
                <BeatLoader/>
                )}
                <FormSuccess message={success}/>
                <FormError message={error}/>
            </div>
        </CardWrapper>
    );
}

export default NewVerificationForm;
