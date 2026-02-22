import { NextResponse } from "next/server";  // ✅ 1. Import qo'shildi!
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET() {  // ✅ 2. Katta harf!
    try {
        const role = await currentRole();

        if (role === UserRole.ADMIN) {
            return NextResponse.json({ 
                success: true, 
                message: "Admin access granted" 
            }, { status: 200 });
        }

        return NextResponse.json({ 
            error: "Forbidden - Admin only" 
        }, { status: 403 });
        
    } catch {
        return NextResponse.json({ 
            error: "Internal server error" 
        }, { status: 500 });
    }
}