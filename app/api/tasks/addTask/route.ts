import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { title, email, status, priority, deadline, description } = reqBody;
        console.log(email, title, status, priority, deadline, description)

        const isTask = await prisma.todo.create({
            data: {
                title,
                status,
                priority,
                deadline: deadline ? new Date(deadline) : null,
                description,
                user: {
                    connect: {
                        email
                    }
                }
            },
        });

        if (!isTask) {
            return NextResponse.json({ success: false, message: "Failed to add task" }, { status: 400 });
        }

        const path = req.nextUrl.searchParams.get('path') || '/dashboard'
        revalidatePath(path)

        return NextResponse.json({ success: true, message: "Task added successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal Server error" }, { status: 500 });
    }
}