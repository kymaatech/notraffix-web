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
