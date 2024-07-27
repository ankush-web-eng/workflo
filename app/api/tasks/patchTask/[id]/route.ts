import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface Params {
    params: {
        id: string;
    };
}

export async function POST(req: NextRequest, params: Params) {
    try {
        const { params: { id } } = params;

        if (!id) {
            return NextResponse.json({ success: false, message: "ID is missing in the request params" }, { status: 400 });
        }

        const { status } = await req.json();

        const task = await prisma.todo.findUnique({
            where: {
                id
            }
        });

        if (!task) {
            return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
        }

        await prisma.todo.update({
            where: {
                id
            },
            data: {
                status
            }
        });

        const path = req.nextUrl.searchParams.get('path') || "/";
        revalidatePath(path);

        return NextResponse.json({ success: true, message: "Task updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
