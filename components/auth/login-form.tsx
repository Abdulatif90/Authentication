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

import { LoginSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";


export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values);
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
                    onSubmit= {form.handleSubmit((data) => {
                        console.log(data);
                    })}
                    className="space-y-6"
                >
                    <div className="space-y-4">
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
                                            placeholder="Enter your password"
                                            type="password"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                    </div>
                    <FormError message="Invalid email or password"/>
                    <FormSuccess message="Email sent successfully"/>
                    <Button 
                    type="submit"
                    className="w-full"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
