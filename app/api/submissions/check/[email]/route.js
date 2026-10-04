import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Submission from "@/models/Submission";

export const runtime = "nodejs";

const ACTIVE_STATUSES = ["requested", "in process"];

export async function GET(request, { params }) {
  try {
    await connectDB();

    const email = decodeURIComponent(params.email).toLowerCase().trim();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // optional: "enquiry" | "custom_order"

    if (type) {
      // Check a specific type only - e.g. "can this email submit an enquiry right now?"
      const existing = await Submission.findOne({
        email,
        type,
        status: { $in: ACTIVE_STATUSES },
      }).sort({ createdAt: -1 });

      if (!existing) {
        return NextResponse.json({ exists: false }, { status: 200 });
      }

      return NextResponse.json(
        { exists: true, type: existing.type, status: existing.status, submittedAt: existing.createdAt },
        { status: 200 }
      );
    }

    // No type given - report every active submission for this email, grouped by type,
    // since an enquiry and a custom order can be active for the same email at once.
    const activeSubmissions = await Submission.find({
      email,
      status: { $in: ACTIVE_STATUSES },
    }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        exists: activeSubmissions.length > 0,
        active: activeSubmissions.map((s) => ({
          type: s.type,
          status: s.status,
          submittedAt: s.createdAt,
        })),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}