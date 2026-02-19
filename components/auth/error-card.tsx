import { CardWrapper } from "./card-wrapper";
import { BsExclamationTriangle } from "react-icons/bs";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong."
            backButtonLabel="Go back to login"
            backButtonHref="/auth/login"
        >
            <div className="w-full flex justify-center items-center">
                <BsExclamationTriangle className="h-16 w-16 text-red-500"/>
            </div>
        </CardWrapper>
    );
}