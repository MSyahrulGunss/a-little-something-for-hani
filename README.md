# A Little Something For Hanifatu Nisa

A small personal website — a digital gift. It is meant to say *I like you*, quietly. It is not a relationship proposal.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configure everything in one file

Edit [`src/config/site.ts`](src/config/site.ts):

| Field | What it does |
| --- | --- |
| `secretCode` | Code on the opening page (compared case-insensitively) |
| `allowSkipSecretCode` | Shows “Skip for now”, and `?skip=1` also unlocks |
| `welcome`, `letter` | Greeting and letter copy |
| `music.tracks` | Title, artist, `src`, and cover image |
| `notes.items` | Sticky notes |
| `gallery.items` | Photos and captions |

## Music (important)

Do **not** add copyrighted songs you do not have permission to use.

Place your own licensed or original files in `public/audio/`, then point `src` at them, for example `/audio/your-song.mp3`.

The music section also has **Choose your own audio** for a temporary local preview. The selected file stays in that browser session and is not uploaded. For a permanent playlist, place the file in `public/audio/` and update `music.tracks` in the config.

The two included `.wav` files are original, generated placeholders so the player works immediately.

## Gallery

Gallery photos are configured in `src/config/site.ts` and use images in `public/gallery/`. The Flowers section uses the images in `public/gallery/flower/`. Replace files or update each image path and caption there as needed. Captions stay focused on the individual pictures rather than implying shared memories.

## Secret code

Default code: `nisa`

To skip the gate while testing: add `?skip=1` or use the skip button (only if `allowSkipSecretCode` is `true`).
# Hani-
