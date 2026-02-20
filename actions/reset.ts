"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values);
    console.log("validateFields", validateFields);

    if (!validateFields.success) {
        return {
            error: "Invalid email"
        };
    }

    const { email } = validateFields.data;

    const existingUser = await getUserByEmail(email);
        
        if (!existingUser) {
            return {
                error: "No account associated with this email"
            };
        }   

        const passwordResetToken = await generatePasswordResetToken(email);
        await sendPasswordResetEmail(
            email, 
            passwordResetToken.token
        );

        return {
            success: "Password reset instructions sent to your email"
        };
    }

