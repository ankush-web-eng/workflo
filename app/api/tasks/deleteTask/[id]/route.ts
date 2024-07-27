import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface Params {
    params: {
        id: string;
    };
}

export async function GET(req: NextRequest, params: Params) {
    try {
        const { params: { id } } = params;

        if (!id) {
            return NextResponse.json({ success: false, message: "ID is missing in the request params" }, { status: 400 });
        }

        const isDeleted = await prisma.todo.delete({
            where: {
                id: id
            }
        });

        if (!isDeleted) {
            return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
        }

        const path = req.nextUrl.searchParams.get('path') || "/dashboard";
        revalidatePath(path);

        return NextResponse.json({ success: true, message: "Task deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
