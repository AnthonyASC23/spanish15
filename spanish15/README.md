# Spanish 15 — vocabulary trainer

Every word and phrase from the Spanish 15 Canvas modules (Units 1–3, Semanas 7 and 9), as a phone app:
36 stations, ~1,050 words/phrases, 8 conjugation drills. Modes: Flashcards, Quiz, Type it, Match, Conjugate.
Progress is saved on the phone. Works offline once installed.

## Put it online (one time, ~3 minutes)

1. Go to github.com → **New repository** → name it `spanish15` → Public → **Create repository**.
2. Click **uploading an existing file**, drag in everything from this folder
   (index.html, vocab.js, sw.js, manifest.webmanifest, the three icon PNGs, and the `fonts` folder) → **Commit changes**.
   - If the uploader won't take the folder, create it: **Add file → Create new file**, type `fonts/x` as the name, delete `x`,
     then upload the .woff2 files into it.
3. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, folder `/ (root)` → Save**.
4. After about a minute the app is live at `https://<your-github-username>.github.io/spanish15/`

## Put it on your iPhone

Open that link in **Safari** → tap the **Share** button → **Add to Home Screen**.
It opens full-screen like a normal app and keeps working with no signal.

## Editing the words

All the vocabulary is in `vocab.js` — each entry is `["spanish", "english"]`. Add, fix, or remove lines,
re-upload the file, and the app picks it up the next time it opens online. Verb sets for the Conjugate drill
are at the bottom of the same file.

Fonts: Barlow and Barlow Condensed (SIL Open Font License, see fonts/OFL.txt).
