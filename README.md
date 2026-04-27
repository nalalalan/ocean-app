# Ocean Tracker

A bookmarkable personal web app for tracking progress toward ocean-inspired morphing structures, creative technology, and R&D roles across WDI and adjacent labs.

## Run Locally

```bash
npm start
```

Open `http://localhost:3000`.

## Deploy To Railway

1. Push this folder to a GitHub repo.
2. Create a new Railway project from that repo.
3. Railway should detect Node and run `npm start`.
4. Add the custom domain `ocean.aolabs.io` in Railway.
5. In Porkbun DNS, point `ocean.aolabs.io` to the Railway target Railway gives you.

## Data

The app stores data in your browser with `localStorage`.

Use **Settings -> Export JSON** regularly if the tracker becomes important. Import that JSON on another browser or after redeploying.
