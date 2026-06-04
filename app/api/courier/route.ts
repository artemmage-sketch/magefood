import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = "https://hook.eu2.make.com/f9ru5p2iv70ln3we9k84beyrm0dwujrk";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const city = body.city === "Інше місто" ? body.customCity : body.city;

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        city,
        age: body.age,
        phone: body.phone,
        experience: body.experience,
        transport: body.transport,
        reservation: body.reservation,
        submitted_at: new Date().toISOString(),
        source: "Анкета кур'єра",
      }),
    });
  } catch (err) {
    console.error("Courier webhook error:", err);
  }

  return NextResponse.json({ ok: true });
}
