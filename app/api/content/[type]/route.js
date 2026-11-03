import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { RESOURCES } from "@/models/Content";

export const revalidate = 60; // admin changes show up within about a minute

export async function GET(_req, { params }) {
  const { type } = await params;
  const pinned = type === "gallery-pinned";
  const R = RESOURCES[pinned ? "gallery" : type];
  if (!R) return NextResponse.json([], { status: 404 });

  await dbConnect();
  const docs = pinned
    ? await R.model.find({ pinned: true }).sort({ pinOrder: 1 }).lean()
    : await R.model.find().sort(R.sort).lean();

  return NextResponse.json(docs.map(({ publicId, __v, ...d }) => d));
}