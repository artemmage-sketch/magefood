import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Here you'd integrate with email (Resend, SendGrid) or Telegram bot
  // For now, just log and return success
  console.log("New order/contact:", body);
  return NextResponse.json({ ok: true, message: "Дякуємо! Ми зв'яжемося з вами найближчим часом." });
}
