import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      userId,
      userName,
      email,
      message,
    } = body;

    console.log("CONTACT DATA:", {
      userId,
      userName,
      email,
      message,
    });

    // Basic validation
    if (!userName || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required.",
        },
        { status: 400 }
      );
    }

    const contact = await prisma.contactInfo.create({
      data: {
        userId: userId || null,
        userName,
        email,
        messages:{
          create: {
            sender: "CUSTOMER",
            message,
          },
        },
      },

      include: {
        messages: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
      contact,
    });

  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save contact message.",
      },
      { status: 500 }
    );
  }
}