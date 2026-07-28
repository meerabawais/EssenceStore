import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken, setSessionCookie } from "@/lib/auth";
import { isValidEmail, isValidPassword } from "@/lib/validations";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !isValidEmail(email) || !isValidPassword(password)) {
      return NextResponse.json(
        { error: "Please provide a valid name, email, and a password of at least 6 characters." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        role: "USER",
      },
    });

    await setSessionCookie(signToken(user));

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
