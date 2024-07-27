import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

interface Params {
    context : {
        id: string
    }
}

export async function PATCH(req: NextRequest, params: Params) {
    try {
        const id  = params.context.id

        const { status } = await req.json()

        const task = await prisma.todo.findUnique({
            where: {
                id
            }
        })

        if (!task) {
            return NextResponse.json({ success:false, message: "Task not found" }, { status: 404 });
        }

        await prisma.todo.update({
            where: {
                id
            },
            data: {
                status
            }
        })

        const path = req.nextUrl.searchParams.get('path') || "/"
        revalidatePath(path)

        return NextResponse.json({ success:true, message: "Task updated successfully" }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ success:false, message: "Internal Server Error" }, { status: 500 });
    }
}