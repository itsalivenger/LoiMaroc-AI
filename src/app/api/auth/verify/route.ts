import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ detail: "Email et code requis." }, { status: 400 });
    }

    const db = await getDb();

    const pending = await db.collection("pending_registrations").findOne({ email, code });

    if (!pending) {
      return NextResponse.json({ detail: "Code incorrect ou expiré." }, { status: 400 });
    }

    // Check expiry
    if (Date.now() > pending.expiresAt) {
      await db.collection("pending_registrations").deleteOne({ email });
      return NextResponse.json({ detail: "Code expiré. Veuillez vous inscrire à nouveau." }, { status: 400 });
    }

    // Move user to the permanent users collection
    const { _id, code: _code, expiresAt: _exp, ...userData } = pending;
    await db.collection("users").insertOne({
      ...userData,
      verified: true,
      createdAt: Date.now(),
    });

    // Clean up pending record
    await db.collection("pending_registrations").deleteOne({ email });

    return NextResponse.json({ status: "success", message: "Compte vérifié avec succès." });
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ detail: "Erreur serveur lors de la vérification." }, { status: 500 });
  }
}
