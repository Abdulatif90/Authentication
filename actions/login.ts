"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { 
    sendVerificationEmail,
    sendTwoFactorTokenEmail,
} from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { 
    generateVerificationToken,
    generateTwoFactorToken,
} from "@/lib/tokens";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid input", details: validateFields.error.format()};
    }
    const { email, password } = validateFields.data;
    const submittedCode = validateFields.data.code;

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Invalid email or password"};
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email,
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return {success: "Confirmation email sent!"};   
  }  
    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (submittedCode){
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
        

        if(!twoFactorToken){
            return { error: "Invalid two-factor code" };
        }

        if (twoFactorToken.token !== submittedCode) {
            return { error: "Invalid two-factor code" };
        }
        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
            return { error: "Two-factor token has expired" };
        }
        await db.twoFactorToken.delete({
            where: { id: twoFactorToken.id }
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (existingConfirmation) {
            await db.twoFactorConfirmation.delete({
                where: { id: existingConfirmation.id }
            });
        }

        await db.twoFactorConfirmation.create({
            data: {
                userId: existingUser.id,
                token: twoFactorToken.token,
                expires: twoFactorToken.expires,
            }
        });
    } else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorTokenEmail(
            twoFactorToken.email, 
            twoFactorToken.token,
        );
        return { twoFactor: true };
    }
}
        
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
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

