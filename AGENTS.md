# Agent Instructions — hextended.com

Static Jekyll site for the **Hyper Extended** Magic: The Gathering format (Fallen Empires through Scourge + Portal sets). Deployed via GitHub Pages. Last actively updated ~2019.

## Build & Serve

```sh
bundle install
bundle exec jekyll serve --port 8080 --future
```

Requires Ruby with Bundler. The `--future` flag renders posts with future dates.

## Project Structure

| Directory | Purpose |
|-----------|---------|
| `_posts/` | Blog posts (tournament reports, announcements, decklists) |
| `_pages/` | Static pages included via `_config.yml` `include: [_pages]` |
| `_layouts/` | `post`, `page`, `home`, `archive` |
| `_includes/` | `head.html` (meta/Twitter cards), `scripts.html` (Scryfall tooltips) |
| `_data/authors.yml` | Author profiles with `name` and `twitter` fields |
| `_plugins/card_tag.rb` | Custom Liquid tag for Scryfall card links |
| `_plugins/strip.js` | Node utility to rebuild `scryfall-filtered-cards.json` from Scryfall API data — do not delete |
| `_sass/` | SCSS partials imported by `assets/css/main.scss` |
| `assets/js/scryfall.js` | Client-side card image hover/modal tooltips |
| `_site/` | Generated output (gitignored for local dev, built by GH Pages) |

## Content Conventions

### Post front matter

```yaml
---
layout: post
title: "Post Title"
author: brendanhagan          # key from _data/authors.yml
date: 2019-09-29 14:00:00 -0500
categories: blog
tags: events report           # space-separated
image: /assets/img/...        # optional, used for Twitter card
---
```

### Page front matter

```yaml
---
layout: post
permalink: /restricted-list/
title: "Restricted List"
subtitle: "Currently restricted cards."
---
```

### Card references (custom Liquid tag)

Inline card links with Scryfall hover images:

```liquid
{% card Academy Rector %}
{% card Duress | set: usg %}
{% card Duress | text: Zwang %}
```

The plugin reads from `_plugins/scryfall-filtered-cards.json` and generates styled anchor tags. Do not modify `scryfall-filtered-cards.json` by hand — it contains Scryfall API data.

## Styling

- SCSS with monospace font stack (`Monospace, Courier`)
- Mobile breakpoint at 699px
- Max content width 1000px
- Imports: `_common.scss` (base styles), `_imageHover.scss` (loading spinner for card tooltips)
- Vendor CSS: Keyrune icon font for MTG set symbols

## Key Details

- **Permalink pattern:** `/blog/:year/:month/:day/:title/`
- **Archive plugin:** `jekyll-archives` generates year, month, and tag archive pages
- **Analytics:** Google Analytics block exists in `head.html` but is disabled (no tracking ID configured)
- **CNAME:** `hextended.com`
