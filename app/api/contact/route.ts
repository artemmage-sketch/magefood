import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = "https://hook.eu2.make.com/m2ezmvts2gdwyv5udlajqriyyje5vx1i";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        phone: body.phone,
        email: body.email,
        establishment: body.establishment,
        message: body.message,
        tool: body.tool || "Загальна заявка",
        submitted_at: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.error("Webhook error:", err);
  }

  return NextResponse.json({ ok: true, message: "Дякуємо! Ми зв'яжемося з вами найближчим часом." });
}