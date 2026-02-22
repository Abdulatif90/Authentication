"use client";

import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LoginForm } from "@/components/auth/login-form";


interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean;
};

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild = false,
 }: LoginButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        router.push("/auth/login");
    };
    if ( mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className="p-o w-auto bg-transparent border-none">
                    <VisuallyHidden> 
                        <DialogTitle className="sr-only">
                            Login to your account
                        </DialogTitle>
                    </VisuallyHidden>
                    <LoginForm/>
                </DialogContent>
            </Dialog>

        );
    }

     return (
        <span onClick = {onClick} className="cursor-pointer">
            {children}
        </span>

    );
}

