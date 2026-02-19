"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { genereateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid input", details: validateFields.error.format()};
    }
    const { email, password } = validateFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Invalid email or password"};
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await genereateVerificationToken(existingUser.email,
        );
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token);
        return {success: "Confirmation email sent!"};   
  }  
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
        return {success: "email sent successfully!"};
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid email or password"};
                default:
                    return {error: "Failed to login", details: error};
            }
        }
        throw error; // Re-throw unexpected errors
    }
};

