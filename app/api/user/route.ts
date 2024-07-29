import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email || ''
            },
            select : {
                id: true,
                email: true,
                name: true,
                image: true
            }
        })

        if (!user) {
            return NextResponse.json({ success:false, message: "User not found" }, { status: 404 });
        }

        const path = req.nextUrl.searchParams.get('path') || '/dashboard'
        revalidatePath(path)

        return NextResponse.json({ success:true, user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success:false, message: "Internal Server Error" }, { status: 500 });
    }
}