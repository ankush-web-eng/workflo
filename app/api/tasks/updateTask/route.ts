import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { id, title, email, status, priority, deadline, description } = reqBody;
        console.log(email, title, status, priority, deadline, description)

        const isTask = await prisma.todo.update({
            where: {
                id: id,
            },
            data: {
                title,
                status,
                priority,
                deadline,
                description,
            },
        });

        if (!isTask) {
            return NextResponse.json({ success: false, message: "Failed to update task" }, { status: 400 });
        }

        const path = req.nextUrl.searchParams.get('path') || '/dashboard'
        revalidatePath(path)

        return NextResponse.json({ success: true, message: "Task Updated successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal Server error" }, { status: 500 });
    }
}