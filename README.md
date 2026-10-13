# DinoCDX portfolio

Static site, no build step. Upload the whole folder to the GitHub Pages repo.

## Files
- `index.html` page markup
- `style.css` all styles
- `script.js` renders the cards, carousel, filters and effects
- `assets/` images (favicon, hero picture, Minigames Ahoy! icon)
- `projects/` one file per project card
- `novels/` one file per novel

## Add a project
1. Copy any file in `projects/` and rename it.
2. Edit its fields. `cats` controls the filter chips (`android`, `discord`, `godot`).
3. Add a `<script src="projects/your-file.js"></script>` line in `index.html` next to the others. Order of the lines is the order of the cards.

## Add a novel
1. Copy any file in `novels/` and edit `initials`, `title`, `author`, `blurb` and `status`.
2. Add a `<script src="novels/your-file.js"></script>` line in `index.html`.

## New filter chip
Add a button with `data-f="yourcategory"` to the `.chips` group in `index.html`, then use that category in a project's `cats`.
