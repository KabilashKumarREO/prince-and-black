import { productData } from "@/app/productData";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { slug } = await req.json();

    const product = await productData.filter((item) => item.slug === slug);

    if (product.length === 0)
      return NextResponse.json(
        { message: "Product not found" },
        { status: 400 }
      );

    return NextResponse.json({ data: product[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
