import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function POST(request) {
    try {

        const {
            to,
            subject,
            message,
        } = await request.json();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: `<pre>${message}</pre>`,
        });

        return NextResponse.json({
            success: true,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}