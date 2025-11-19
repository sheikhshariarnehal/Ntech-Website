import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // TODO: Implement actual email sending or database storage
    const body = await request.json();
    console.log("Contact form submission:", body);

    return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 }
    );
}
