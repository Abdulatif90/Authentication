"use server";

import { db } from "@/lib/db";


export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: { email }, // Bu yerda email orqali userni topamiz, aslida email:email bo'lishi kerak edi, bu syntax sugar
        });
        return user;
    }   catch {
        return null; // aslida return da errorni qaytarish kerak edi, lekin bu yerda null qaytarilgan, bu xatolik edi
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id }, // Bu yerda id orqali userni topamiz, aslida id:id bo'lishi kerak edi, lekin bu syntax sugar
        });
        return user;
    }   catch {
        return null; // aslida return da errorni qaytarish kerak edi, lekin bu yerda null qaytarilgan, bu xatolik edi
    }
};

