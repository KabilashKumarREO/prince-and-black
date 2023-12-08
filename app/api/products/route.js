import { productData } from "@/app/productData";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const products = await productData;
    return NextResponse.json({ data: products });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
