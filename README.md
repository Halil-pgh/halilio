# halilio.dev

My personal site: the projects behind my CV, each with a demo and the story of how it works.
SvelteKit 2 + Svelte 5, prerendered to static HTML with `adapter-static`, deployed on Netlify.

```sh
pnpm install
pnpm dev        # http://localhost:5173
pnpm check      # svelte-check + TypeScript
pnpm build      # static site in build/
pnpm preview    # serve build/ locally
```

Node 20.19+ works locally. SvelteKit is pinned to 2.x because 3.x needs Node 22.17+.

## Where things live

| What | Where |
|---|---|
| Project list: titles, one-line hooks, stacks, links, card media | `src/lib/projects.ts` |
| Each project's page | `src/routes/projects/<slug>/+page.svelte` |
| Home page (intro, project cards, experience) | `src/routes/+page.svelte` |
| About page | `src/routes/about/+page.svelte` |
| Colors, fonts, shared styles (light and dark) | `src/app.css` |
| Videos, posters, screenshots | `static/media/` |
| The CV PDF linked everywhere | `static/Halil_Ibrahim_Ozturk_CV.pdf` |
| Link-preview image | `static/og.png`, made from `scripts/og-image.html` |

To add a project: add an entry to `projects` in `src/lib/projects.ts`, then create
`src/routes/projects/<slug>/+page.svelte` wrapped in `<ProjectPage slug="<slug>">`. The home page
card, the "next project" link and the sitemap pick it up automatically.

## Updating things

**The CV.** After regenerating it in `~/Documents/cv`, copy it over:

```sh
cp ~/Documents/cv/Halil_Ibrahim_Ozturk_CV.pdf static/
```

**A demo GIF.** Convert it to a small looping video and a poster, then point the project's
`media` at them:

```sh
ffmpeg -i demo.gif -movflags +faststart -pix_fmt yuv420p \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 28 -preset slow static/media/name.mp4
ffmpeg -i demo.gif -vf "select=eq(n\,1)" -frames:v 1 -c:v libwebp -quality 80 static/media/name.webp
```

Slideshow-like GIFs (few frames, long delays) stay small with `-fps_mode vfr -tune stillimage`.

**The link-preview image.**

```sh
google-chrome --headless=new --hide-scrollbars --allow-file-access-from-files \
  --window-size=1200,630 --screenshot=static/og.png "file://$PWD/scripts/og-image.html"
```

## Deploying

Push the repo to GitHub, then in Netlify choose **Add new site → Import an existing project** and
pick the repo. `netlify.toml` already sets the build command (`pnpm build`), the publish directory
(`build`) and Node 22, so there's nothing to fill in. Every push to `main` then redeploys. Finally,
move the `halilio.dev` domain from the old site to the new one under **Domain management**.
