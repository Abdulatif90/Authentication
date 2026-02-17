"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);
    
    if (!validateFields.success) {
        return {error: "Invalid input"};
    }
    
    const { name, email, password } = validateFields.data;
    const hashedpassword = await bcrypt.hash(password, 10);
  
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {error: "this email is already registered"};
    }
    await db.user.create({
        data: {
            name,
            email,
            password: hashedpassword,
        },
    });

    // TODO: Send verification token email
    return {success: "User registered successfully!"};
};

