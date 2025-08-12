# Jewish Hollywood Actors — Swipe Game

A tiny Tinder-style swipe game to raise awareness of how many Hollywood actors are Jewish.

**Rules**
- Swipe **RIGHT** (or press →) if the person is Jewish.
- Swipe **LEFT** (or press ←) if not.
- The card always shows the public name.
- If your guess is **correct**, their real (Jewish) name appears for 1 second.
- Score increments on correct guesses. The deck loops forever.

## Add more actors
1. Put their photo into the `actors/` folder (JPG/PNG/JPEG).
2. Open `script.js` and add a new entry to the `ACTORS` array:

```js
{ img: "actors/first last.jpg", name: "Stage Name", realName: "Hebrew / birth name", jewish: true }
```

> Note: GitHub Pages cannot auto-read a folder; you must add an entry to `ACTORS` for each new image.

## Run on GitHub Pages
- Commit the files to a repo and enable **Settings → Pages → Source: `main` / `/root`**.
- Visit the provided Pages URL. It’s fully static.

## Local preview
Just open `index.html` in a browser (or use a static server for best results).
