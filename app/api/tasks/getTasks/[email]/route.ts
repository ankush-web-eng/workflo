import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

interface Params {
    params : {
        email:string
    }
}

export async function GET(req: NextRequest, context: Params) {
    const email = context.params.email
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                id: true
            }
        })

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
        }

        const tasks = await prisma.todo.findMany({
            where: {
                userId: user.id
            }, orderBy: {
                createdAt: "desc"
            }, select: {
                id: true,
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                status: true,
                priority: true,
                deadline: true
            }
        })

        const path = req.nextUrl.searchParams.get("path") || "/"
        revalidatePath(path)

        if (!tasks) {
            return NextResponse.json({ success: false, message: "No tasks found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, tasks }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
    }
}