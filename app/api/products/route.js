import { productData } from "@/app/productData";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const products = await productData.filter((item) => item);
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
