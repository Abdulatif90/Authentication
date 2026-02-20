"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,   
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { LoginSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import React, { useState, useTransition } from "react";



export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already associated with another account"
    : "";
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const emailId = React.useId();
    const passwordId = React.useId();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            code: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
            .then((data) => {
                console.log("Login response:", data);
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                } 
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                }
                if (data?.twoFactor){
                    setShowTwoFactor(true);
                }
            })
            .catch(() => 
                setError("Failed to login. Please try again."));
        });
    };

    return (
        <CardWrapper 
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        {showTwoFactor && (
                            <>
                            <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor={emailId}>
                                        Two Factor Code
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id={emailId}
                                            disabled={isPending}
                                            placeholder="123456"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        </>
                        )}
                        {!showTwoFactor && (
                        <>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor={emailId}>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id={emailId}
                                            disabled={isPending}
                                            placeholder="john.doe@example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor={passwordId}>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id={passwordId}
                                            disabled={isPending}
                                            placeholder="Enter your password"
                                            type="password"
                                        />
                                    </FormControl>
                                    <Button 
                                    variant="link" 
                                    size="sm" 
                                    asChild
                                    className="mr-auto mt-2 font-normal text-primary"
                                    >
                                        <Link href="/auth/reset">
                                            Forgot Password?
                                        </Link>
                                    </Button>  
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                      </>
                     )}                              
                    </div>
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button 
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
