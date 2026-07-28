import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request){

    const body=await request.json();

    const user=await prisma.user.findUnique({

        where:{
            email:body.email
        }

    });

    if(!user){

        return NextResponse.json({

            success:false,

            error:"Invalid Email"

        });

    }

    const match=await bcrypt.compare(

        body.password,

        user.password

    );

    if(!match){

        return NextResponse.json({

            success:false,

            error:"Wrong Password"

        });

    }

    return NextResponse.json({

        success:true,

        role:user.role,

    });

}