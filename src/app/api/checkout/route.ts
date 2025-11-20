import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Checkout endpoint not implemented yet" },
    { status: 501 }
  );
}
