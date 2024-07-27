import { PrismaClient } from "@prisma/client/extension";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req : NextRequest) {
    try {
        const { email, code } = await req.json();
        const decodedEmail = decodeURIComponent(email);

        const user = await prisma.user.findUnique({
            where: {
                email: decodedEmail
            }
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        if (user.verificationCode !== code) {
            return NextResponse.json(
                { success: false, message: 'Invalid verification code' },
                { status: 400 }
            );
        }

        await prisma.user.update({
            where: {
                email: decodedEmail
            },
            data: {
                isVerified: true
            }
        });

        const path = req.nextUrl.searchParams.get('path') || `/verify/${decodeURIComponent(email)}`;
        revalidatePath(path);

        return NextResponse.json(
            { success: true, message: 'User verified successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error verifying user:', error);
        return NextResponse.json(
          { success: false, message: 'Error verifying user' },
          { status: 500 }
        );
      }
}