# oNote homepage preview — content notes

Static local preview of the original marketing homepage. Original WordPress theme, database, and backups were **not modified**.

## Design sources (reused, not reinvented)

| Layer | Source |
| --- | --- |
| Layout / markup structure | `theme/templates/page-home.twig`, `hero.twig`, `benefit-*.twig`, `header.twig`, `footer.twig`, `base.twig` |
| CSS / typography tokens | Compiled `theme/style.css` + Adobe Fonts kit `xxv0hnj` (niveau-grotesk / hero-new) |
| Artwork | Original SVGs from `theme/images/home`, `nav`, `global`, `favicon` |
| Interactions | Alpine.js dark mode + menus (same pattern as theme); preloader/theme-toggle from `src/js/app.js` without HubSpot hacks |

## CMS / copy recovery

Homepage copy was recovered from:

1. **Local MySQL backup** (`mysql57-backup/wordpress`) — custom posts `hero1`, `benefit1–6`, `source1`, `info1–4`, `resource1–2`, ACF fields `call_to_action`, `cta_link`, `resource_text`, `resource_link`
2. **Published site archive** — Wayback Machine `onote.com` (May 2022 HTML) for final public wording and primary/footer nav

### Published vs local CMS wording

Where the local CMS draft and the published homepage differed slightly, this preview uses the **published May 2022** wording (finished public design):

- Benefit 1 title: published **“Enable digital transformation”** (CMS draft: “Enables digital transformation”)
- Benefit 1 body: published shorter “shared visual models…” line (CMS draft used longer “shared visual and verbal language…” copy)
- Hero body: published “teams” plural (CMS draft used “team”)

`benefit6` (“Design right from the start”) had **empty body content** in both CMS and published HTML — preserved as empty.

## Approximations (preview-only)

- Secondary page routes (`/features/`, `/blog/`, etc.) are hash anchors (`#features`) because this preview is homepage-only
- Tracking / marketing embeds (Google Analytics, HubSpot, Twitter, LinkedIn) intentionally omitted
- HubSpot cookie/chat DOM hacks from `app.js` omitted (widgets not present)
- No WordPress, MAMP, or MySQL required

## Not copied

- `wp-config.php`, credentials, private keys, full database files, user tables, or other confidential application data
