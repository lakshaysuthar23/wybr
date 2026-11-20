# Wybr v5
Find people who match your vibe: love, movie buddies, sports partners, co-founders.

1. Extract over your `wybr` folder (replace files).
2. `npm install` (new font)
3. `npm run dev`

Demo mode runs with 10 sample people and no keys. Add `.env` keys later for live login.
Database: `supabase/schema.sql` has new columns (age, intents, interests, vibe, bio).
If you ran the old schema, drop the profiles table in a test project and rerun this file.
Theme: Profile > gear icon > Appearance (Light default, Dark, System).

## v6 changes
- Aligned to the final wybr logo (green spark, near-black). Green brand colour, light default.
- One "Get started" button. Keyboard auto-opens on number, code and name. Enter goes next.
- Gender warning plus confirm sheet. Date of birth uses 3 vertical wheels (age computed, 18+).
- Home: Bengaluru location, search, notifications. Tabs: For you / Nearby.
- Chats: vertical list only. WhatsApp-style doodle wall. Replies follow what you say.
- Vibe In: random partner on every connect. No looping animation. Smooth staged lobby entrance.
- Profiles: no 5-vibe comparison. Single-photo vertical feed with 1-column / 3-column toggle. My profile uses the same layout; gear opens Settings.
