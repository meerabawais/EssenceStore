import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request){

    const body = await request.json();

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(body.email)){

        return NextResponse.json({

            success:false,

            error:"Invalid Email"

        });

    }

    if(body.password.length<8){

        return NextResponse.json({

            success:false,

            error:"Password should be atleast 8 characters"

        });

    }

    const existing=await prisma.user.findUnique({

        where:{
            email:body.email
        }

    });

    if(existing){

        return NextResponse.json({

            success:false,

            error:"Email already exists"

        });

    }

    const hashedPassword=await bcrypt.hash(body.password,10);

    await prisma.user.create({

        data:{

            name:body.name,

            email:body.email,

            password:hashedPassword,

            role:"USER",

        }

    });

    return NextResponse.json({

        success:true

    });

}