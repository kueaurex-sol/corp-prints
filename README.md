# Corps Prints - Backend (Next.js)

Next.js (App Router) version of the Corps Prints enquiry / custom order backend.
Same behaviour as the Express version, just implemented as Next.js Route Handlers
so it can be deployed as a single Next.js app (e.g. on Vercel) or combined with a
frontend in the same project later.

## Setup

```bash
npm install
cp .env.local.example .env.local   # fill in the real values
npm run dev
```

Server runs at `http://localhost:3000`, API under `http://localhost:3000/api/submissions`.

### `.env.local` values needed

```
MONGODB_URI=""
EMAIL_USER=
EMAIL_PASS=            # Gmail App Password, not your normal password
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Get the Cloudinary values from your Cloudinary dashboard (Settings → API Keys).
For Gmail, `EMAIL_PASS` must be an **App Password** (Google Account → Security →
2-Step Verification → App Passwords) — your normal Gmail password will not work.

> If you deploy this on Vercel, add the same variables under
> Project Settings → Environment Variables.

## Project structure

```
app/
  api/
    submissions/
      route.js                 -> POST (create), GET (list)
      [id]/
        route.js                -> GET one
        status/route.js         -> PATCH status
      check/[email]/route.js    -> GET check-by-email
lib/
  mongodb.js       -> cached Mongoose connection (serverless-safe)
  cloudinary.js    -> Cloudinary config
  cloudinaryUpload.js -> converts uploaded Files -> Buffers -> Cloudinary
  sendEmail.js     -> nodemailer transporter + send helper
  emailTemplates.js -> "thank you" email HTML
models/
  Submission.js    -> Mongoose schema (enquiry + custom order fields, status)
```

## How the form maps to the API

One endpoint, `POST /api/submissions`, handles both form types. Send it as
`multipart/form-data` with a `type` field of `"enquiry"` or `"custom_order"` —
only that type's fields are required/used. (Plain JSON also works for an enquiry
with no images — just set `Content-Type: application/json`.)

### 1. Enquiry (`type=enquiry`)
| Field | Notes |
|---|---|
| name | required |
| company | |
| email | required |
| phone | required |
| alternativePhone | |
| issueRequest | required |

### 2. Custom Order (`type=custom_order`)
Must be sent as `multipart/form-data` (needed for the two image fields).

**Personal Details**
| Field | Notes |
|---|---|
| name | required |
| company | |
| email | required |
| phone | required |
| alternativePhone | |
| gstNo | |

**Custom Order Request**
| Field | Notes |
|---|---|
| solutionLookingFor | required, one of the dropdown values below |
| size | |
| quantity | |
| artwork | image file(s), field name `artwork`, up to 5 |
| endProductInspiration | image file(s), field name `endProductInspiration`, up to 5 |
| requestDescription | |
| dropRequestOrWhatsapp | "Drop Request or communication with WhatsApp" field |

`solutionLookingFor` dropdown options (validated server-side against this exact list):
- Flex Printing
- Vinyl Printing
- UV Printing(with White)
- Branding Solutions
- Signage & Display Systems
- Laser Cutting
- CNC Cutting

**Delivery Details**
| Field | Notes |
|---|---|
| pickupOrDelivery | required, `"pickup"` or `"delivery"` |
| deliveryAddress | required only if `pickupOrDelivery` is `"delivery"` (this client ships large/bulky products, so pickup is also supported) |

## Duplicate / in-progress check

Before creating a new submission, the API looks up the given `email` for any
existing submission whose `status` is **not** `completed` (i.e. `requested` or
`in process`). If one is found, it does **not** create a new record — it responds
with `409` and the existing submission's `type` + `status` so the frontend can show
"You already have a submission in progress."

Check ahead of time (e.g. to disable the submit button) with:

```
GET /api/submissions/check/:email
```

## Order status

Every submission has a `status`, one of:
- `requested` (default, on creation)
- `in process`
- `completed`

Update it (e.g. from an admin panel) with:

```
PATCH /api/submissions/:id/status
Body: { "status": "in process" }
```

## All endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | /api/submissions | Create an enquiry or custom order |
| GET | /api/submissions | List all submissions (`?type=`, `?status=` filters) |
| GET | /api/submissions/:id | Get one submission |
| PATCH | /api/submissions/:id/status | Update status |
| GET | /api/submissions/check/:email | Check if email has an active submission |

## Emails

On successful submission, the applicant automatically receives a "Thank you, your
form has been submitted, we'll reach out" email (wording differs slightly for
enquiry vs. custom order). Email failures are logged but never block the
submission itself — the record is still saved even if the email fails to send.

## Notes / assumptions made

- Every API route sets `export const runtime = "nodejs"` — these routes need
  Node's Buffer/stream APIs (for Cloudinary uploads) and Mongoose, neither of
  which work on the Edge runtime. Don't remove that line.
- Images go straight to Cloudinary under `corps-prints/artwork` and
  `corps-prints/inspiration` folders; only the resulting URL + public ID are stored
  in MongoDB (not the raw file).
- "Active submission" = status is `requested` or `in process`. Once a submission is
  marked `completed`, that email is free to submit a new form.
- Nodemailer is configured for Gmail's `service: "gmail"` shortcut. Swap the
  `transporter` config in `lib/sendEmail.js` for a custom SMTP host if the client
  uses a different provider.
- No auth on the admin routes (list / get / update-status) — add an API key or
  session check before exposing this publicly if needed.
# corp-prints
