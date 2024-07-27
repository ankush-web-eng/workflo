import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { revalidatePath } from "next/cache";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { email, password, name } = reqBody

        const isUser = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10)

        if (isUser) {
            if (isUser.isVerified) {
                return NextResponse.json({ success: false, message: "User already exists. Please Login" }, { status: 400 })
            } else {
                await prisma.user.update({
                    where: {
                        email
                    },
                    data: {
                        password: hashedPassword,
                        verifyCode
                    }
                })
            }
        } else {
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name
                }
            })
            if (!user) {
                return NextResponse.json({ success: false, message: "User not created" }, { status: 500 })
            }
        }

        const emailResponse = await sendVerificationEmail(
            email,
            name,
            verifyCode
        );

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                { status: 500 }
            );
        }

        const path = req.nextUrl.searchParams.get("path") || "/signup"
        revalidatePath(path)

        return Response.json(
            {
                success: true,
                message: 'User registered successfully. Please verify your account.',
            },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json({ success: false, message: "Server Error Occured" }, { status: 500 })
    }
}