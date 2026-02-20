import * as z from "zod";

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
});


export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    })
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters long"
    }),
    confirmPassword: z.string().min(6, {
        message: "Confirm Password must be at least 6 characters long"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});


