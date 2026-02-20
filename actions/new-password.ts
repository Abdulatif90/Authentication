"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null 
) => {
    if (!token) {
        return {
            error: "Invalid or missing token"
        };
    }   

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Missing or invalid fields"
        };  
    }
    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    
    if (!existingToken) {
        return {
            error: "Invalid or expired token"
        };
    }

    const hasExpired = existingToken.expires < new Date();
    if (hasExpired) {
        return {
            error: "Token has expired"
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {
            error: "Email not found"
        };
    }
   
    
    const hasPassword = await bcrypt.hash(password, 10);
    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hasPassword
        }
    });

        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        });
        return {
            success: "Password has been reset successfully"
        };
    };


