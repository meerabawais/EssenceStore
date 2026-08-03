import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function POST(request, { params }) {
    try {
        const { id } = await params;

        const contactId = Number(id);

        if (!contactId || Number.isNaN(contactId)) {
            return NextResponse.json(
                {
                    message: "Invalid contact ID",
                },
                {
                    status: 400,
                }
            );
        }

        const body = await request.json();

        const message = body.message?.trim();

        if (!message) {
            return NextResponse.json(
                {
                    message: "Message cannot be empty",
                },
                {
                    status: 400,
                }
            );
        }

        // Find customer/conversation
        const contact = await prisma.contactInfo.findUnique({
            where: {
                id: contactId,
            },
        });

        if (!contact) {
            return NextResponse.json(
                {
                    message: "Conversation not found",
                },
                {
                    status: 404,
                }
            );
        }

        // Save admin reply in database
        const savedMessage = await prisma.contactMessage.create({
            data: {
                contactId: contactId,
                sender: "ADMIN",
                message: message,
                isRead: true,
            },
        });

        // Send email to customer
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: contact.email,
            subject: "Reply from Essence Store",
            text: message,

            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    
                    <h2>Essence Store</h2>

                    <p>Hello ${contact.userName},</p>

                    <p>
                        Thank you for contacting Essence Store.
                    </p>

                    <div style="
                        margin: 20px 0;
                        padding: 15px;
                        background: #f5f5f5;
                        border-left: 4px solid #000;
                    ">
                        ${message.replace(/\n/g, "<br>")}
                    </div>

                    <p>
                        If you have any further questions, feel free to reply
                        to this email.
                    </p>

                    <p>
                        Regards,<br>
                        <strong>Essence Store</strong>
                    </p>

                </div>
            `,
        });

        // Get updated conversation
        const conversation = await prisma.contactInfo.findUnique({
            where: {
                id: contactId,
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            message: "Reply sent successfully",
            savedMessage,
            conversation,
        });

    } catch (error) {

        console.error("SEND REPLY ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to send reply",
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}