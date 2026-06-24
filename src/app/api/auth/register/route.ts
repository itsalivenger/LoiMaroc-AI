import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ detail: "Tous les champs sont requis." }, { status: 400 });
    }

    const db = await getDb();

    // Check if user already exists
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json({ detail: "L'email est déjà utilisé." }, { status: 400 });
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Upsert into pending_registrations
    await db.collection("pending_registrations").updateOne(
      { email },
      { $set: { name, email, password, code, expiresAt } },
      { upsert: true }
    );

    // Send verification email
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const emailFrom = process.env.EMAIL_FROM || smtpUser;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: false,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"LoiMaroc AI" <${emailFrom}>`,
        to: email,
        subject: "Votre code de vérification LoiMaroc AI",
        text: `Bonjour ${name},\n\nVotre code de vérification est : ${code}\n\nCe code expirera dans 15 minutes.`,
      });
    }

    return NextResponse.json({ status: "success", message: "Code de vérification envoyé." });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ detail: "Erreur serveur lors de l'inscription." }, { status: 500 });
  }
}
