"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,   
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";


export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error || "");
                setSuccess(data.success || "");
                if(data.success) {
                    form.reset();
                }

            });
        });
    };

    return (
        <CardWrapper 
            headerLabel="Create an Account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form 
                    onSubmit= {form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>                                    
                                        <FormControl>
                                            <Input {...field} 
                                            disabled={isPending}
                                            placeholder="John Doe"
                                            type="text"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                              />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>                                    
                                        <FormControl>
                                            <Input {...field} 
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
                                    <FormLabel>
                                        Password
                                    </FormLabel>                                    
                                        <FormControl>
                                            <Input {...field}
                                            disabled={isPending} 
                                            placeholder="Enter your password"
                                            type="password"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Confirm Password
                                    </FormLabel>                                    
                                        <FormControl>
                                            <Input {...field}
                                            disabled={isPending} 
                                            placeholder="Confirm your password"
                                            type="password"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button 
                    disabled={isPending}
                    type="submit"
                    className="w-full"
                    >
                        create account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
