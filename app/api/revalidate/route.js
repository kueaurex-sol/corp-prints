import crypto from "crypto";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const same = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

// The admin panel calls this after every change, so the site shows new services, photos and prices straight away.
export async function POST(request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("x-revalidate-secret");
  if (!secret || !given || !same(given, secret)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true });
}