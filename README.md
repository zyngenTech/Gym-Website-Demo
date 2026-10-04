# Forge Athletic Club: gym website demo

A premium, responsive, single-page gym website built with plain HTML, CSS and vanilla JavaScript. No build step, no dependencies.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Deploys as-is to GitHub Pages, Netlify, Vercel or any static host.

## Rebrand for a new gym (about 10 minutes)

1. **Copy, prices, schedule, trainers, contact:** edit `js/config.js`. Every section renders from this file.
2. **Colours and fonts:** edit the variables at the top of `css/styles.css` (`--accent`, `--bg`, `--font-display`, ...). You can also set `brand.accent` in the config to override just the accent.
3. **Images:** replace the image URLs in `js/config.js` with the gym's own photos.
4. **Logo / favicon:** swap `assets/favicon.svg` and the `.logo__mark` shape in the CSS.
5. **Trial form:** it validates in the browser and shows a success message. To receive leads, replace the marked block in `initForm()` in `js/main.js` with a `fetch()` to Formspree, Netlify Forms or the gym's CRM.

## What's included

- Full-screen hero with "Book a free trial" call to action
- Programs, 3-tier pricing with monthly/annual toggle, trainers, testimonials
- Class schedule filterable by day (opens on today, keyboard accessible)
- Free-trial form with native browser validation and friendly error messages
- Contact section with embedded map and opening hours
- Sticky blurred nav with mobile menu, scroll-spy and scroll-reveal animations
- Respects `prefers-reduced-motion`; skip link and ARIA for tabs, switch and menu

Placeholder photos are from [Unsplash](https://unsplash.com).
