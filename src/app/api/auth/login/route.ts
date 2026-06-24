import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ detail: "Email et mot de passe requis." }, { status: 400 });
    }

    const db = await getDb();
    const user = await db.collection("users").findOne({ email, password });

    if (!user) {
      return NextResponse.json({ detail: "Identifiants incorrects." }, { status: 401 });
    }

    return NextResponse.json({
      status: "success",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ detail: "Erreur serveur lors de la connexion." }, { status: 500 });
  }
}
