import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Submission from "@/models/Submission";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const submission = await Submission.findById(params.id);
    if (!submission) {
      return NextResponse.json({ message: "Submission not found" }, { status: 404 });
    }
    return NextResponse.json(submission, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}
