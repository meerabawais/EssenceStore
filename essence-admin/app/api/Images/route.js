import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const folder = path.join(process.cwd(), "public", "img", "product-img");

    const files = fs.readdirSync(folder);

    const images = files
      .filter(file =>
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      )
      .map(file => ({
        name: file,
        path: `/img/product-img/${file}`,
      }));

    return NextResponse.json(images);

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}