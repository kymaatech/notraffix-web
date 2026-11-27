# Notraffix — website

Next.js 15 · React 19 · Tailwind 3 · Geist. Same stack as acegraphiix/aac, plus Supabase + Resend for enquiries.

## Run it

```powershell
npm install
npm run dev        # downloads the photos/videos into public/media on first run, then starts http://localhost:3000
```

If PowerShell blocks npm scripts, use `npm.cmd install` / `npm.cmd run dev`.

## Media

All photographs and video are listed in **`lib/media.ts`**. The stand-ins are free-licence Pexels files (no attribution needed). `scripts/fetch-media.mjs` downloads anything missing into `public/media` before `dev` and `build`.

To use the client's own footage, drop a file into `public/media` with the same name (e.g. `hero-roundabout.mp4`), or change the entry's `src`. Keep background videos small: 1280×720, H.264, no audio, ideally under 8 MB.

## Enquiries (Supabase + Resend)

1. In Supabase, open the SQL editor and run `supabase/schema.sql`. It creates an `enquiries` table with references like `NTX-1001`, locked down with RLS.
2. Copy `.env.example` to `.env.local` and fill in:
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (Project settings → API; the service-role key stays server-side)
   - `RESEND_API_KEY`, `ENQUIRY_TO` (comma-separated team inboxes), `ENQUIRY_FROM` (an address on a domain verified in Resend)
3. Restart `npm run dev`. Each enquiry is saved, emailed to the team (reply-to set to the sender), and the sender gets a confirmation with their reference.

Without keys, enquiries are only logged in the terminal, so previews still work.

## Edit content

- `lib/site.ts`: name, contacts, fault line (all PLACEHOLDER until the client confirms)
- `lib/content.ts`: solutions, process, projects (**projects are placeholders**), FAQ
- `lib/enquiry.ts`: form options and validation rules

## Email templates

`lib/emails.ts` holds the two emails the enquiry form sends through Resend, each with HTML and plain-text versions:

- **Team alert** (`teamEnquiryEmail`): goes to `ENQUIRY_TO`, with reply-to set to the customer. It has Reply and Call buttons, the details table and the message.
- **Customer confirmation** (`customerConfirmationEmail`): banner, reference, what happens next, and the 24/7 fault line. Replies go to `ENQUIRY_REPLY_TO`, or the first `ENQUIRY_TO` address if that isn't set.

Preview them locally at `/email-preview/team` and `/email-preview/confirmation` (add `?format=text` for the plain-text version). The preview is switched off in production unless `EMAIL_PREVIEW=on` is set.
Images load from `/public/email` on the live domain, so they show in real emails once the site is deployed.

## Solar systems (`/solar`)

The six solar junction systems from the technical partner live in **`lib/solar.ts`**: kit contents, specifications and controller features. The partner's name, model numbers, prices and photos are deliberately left out. Every visual on the page is drawn in code (`components/solar/`):

- `JunctionPlan`: animated top-down plan for each system (3-way or 4-way, cantilever or post poles, ball, arrow or countdown heads)
- `Art`: signal, countdown, pedestrian and controller drawings, plus the day/night solar pole scene
- `KitExplorer`: the system picker; each system can be linked directly, e.g. `/solar#t-junction-compact`
- `PlanWeek`: the controller's weekly timing-plan chart

Each "Request a quote" button opens `/enquiry?service=solar-systems&kit=<slug>`. The chosen system is saved in the `kit` column (see `supabase/schema.sql`) and shown in both emails.
