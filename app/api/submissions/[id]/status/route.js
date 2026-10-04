import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Submission from "@/models/Submission";

export const runtime = "nodejs";

export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const body = await request.json().catch(() => ({}));
    const { status } = body;

    if (!["requested", "in process", "completed"].includes(status)) {
      return NextResponse.json({ message: "Invalid status value" }, { status: 400 });
    }

    const submission = await Submission.findByIdAndUpdate(params.id, { status }, { new: true });

    if (!submission) {
      return NextResponse.json({ message: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Status updated", submission }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}
