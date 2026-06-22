
# Clarendon Park / Shorewood Homes — Design System Extraction

This is a forensic breakdown of the actual design DNA used in this project (extracted from `index.css`, `tailwind.config.ts`, and the section components). It is structured so you can paste sections directly into a new Lovable project.

> Note on Lovable capabilities: Lovable does **not** support live cross-project inheritance of a design system, theme package, or component library. The native ways to carry this DNA across projects are: (1) **Remix** this project as the starting point, or (2) paste the prompts in Section I into the new project. The artifacts below are written so option 2 reproduces option 1's fidelity.

---

## A. Brand Identity Overview

- **Aesthetic:** Editorial luxury British property branding. Closer to a fine-art catalogue than a tech site. Calm, slow, generous, restrained.
- **Two-tone palette only.** Deep "Pagent Blue" and warm "Limestone" cream. No greys, no gradients, no accent colour.
- **Typography duality:** A wide-tracked Roman serif (Trajan Pro) for all hierarchy, paired with a hairline humanist sans (Lato Light) for body.
- **Layout language:** Full-bleed cinematic image sections alternating with solid block sections in either Blue or Limestone. No rounded corners, no shadows, no cards in the usual sense — only hairline 1px dividers and bordered tiles.
- **Motion:** Slow (0.7–1.1s), eased with `cubic-bezier(0.22, 1, 0.36, 1)` or `(0.25, 0.1, 0.25, 1)`. Fade-and-rise (`y: 20–40 → 0`) is the only entrance pattern.
- **Strapline tone:** "Built for Living, Valued for Life." Short, declarative, capitalised, spaced.

---

## B. Typography System

### Fonts (exact)
- **Display / Headings:** `"Trajan Pro", serif` — loaded from `https://fonts.cdnfonts.com/css/trajan-pro`. Always `font-weight: 400` (`font-normal`) — never bold. Always `uppercase`.
- **Body / UI:** `"Lato", sans-serif` — Google Fonts, weights `300, 400, 600, 700` imported but **`300` (Light) is used almost everywhere**. `400` only for inputs.
- **Fallback chain:** `'Trajan Pro', serif` and `'Lato', sans-serif` only — no system fallbacks added.

### Heading scale (actual usage)
| Role | Size (mobile → desktop) | Tracking | Transform |
|---|---|---|---|
| Hero H1 | `text-3xl → text-7xl → text-6xl` (clamps back at `lg`) | `letter-spacing: 0.3em` | uppercase |
| Page H1 (sub-pages) | `text-2xl → text-4xl` | `tracking-[0.3em]` | uppercase |
| Section H2 | `text-2xl → text-4xl` | `tracking-[0.25em]` or `0.3em` | uppercase |
| Subsection H3 | `text-xl → text-3xl` | `tracking-[0.25em]` | uppercase |
| Card H4 | `text-[15px] → text-base` | `tracking-[0.15em–0.18em]` | uppercase |
| Eyebrow | `text-[10px] → text-[11px]` | `tracking-[0.15em]` | uppercase, font-body |
| Button label | `text-[10px] → text-xs` | `tracking-[0.2em–0.25em]` | uppercase, font-body |

### Body scale
- Lead paragraph: `text-sm → text-[15px]`, `leading-[1.9]`, `font-light`.
- Standard paragraph: `text-[13px] → text-sm`, `leading-[1.8–1.85]`, `font-light`.
- Meta / caption: `text-[10px] → text-xs`, `tracking-[0.15–0.2em]`, uppercase, opacity 40–60%.

### Reading rhythm rules
- Body paragraphs are always centred under a centred H2 unless inside a 2-col grid card.
- Max paragraph width: `max-w-xl` for lead, `max-w-2xl` for body, `max-w-lg` for sub-copy.
- Headings followed by a `w-10 h-px bg-foreground/20 mx-auto mb-10` hairline divider (the signature motif).
- Letter-spacing scales with importance — the larger the heading, the wider the tracking (0.3em at top, 0.15em at card level).

---

## C. Colour System

### Tokens (HSL — exact values from `index.css`)
```css
--brand-blue:      197 100% 15%;   /* #00314B  Pagent Blue */
--brand-limestone: 48  24%  92%;   /* #EFEDE5  Limestone */

--background:       48 24%  92%;   /* Limestone */
--foreground:      197 100% 15%;   /* Blue */
--primary:         197 100% 15%;
--primary-foreground: 48 24% 92%;
--secondary:       197 100% 15%;   /* same as primary — intentional */
--secondary-foreground: 48 24% 92%;
--muted:            48 15%  86%;
--muted-foreground:197 40%  40%;
--border:          197 100% 15%;
--input:           197 30%  70%;
--ring:            197 100% 15%;
--radius:          0px;            /* zero radius everywhere */
```

### Usage rules
- **Only two surface colours**: Limestone (`bg-background`) and Blue (`bg-secondary`). Sections alternate between them — never mix on one section.
- **Text on Limestone:** `text-foreground` (full), `text-foreground/70` (body), `text-foreground/50` (meta), `text-foreground/40` (captions).
- **Text on Blue:** `text-brand-limestone`, `text-brand-limestone/70`, `/55`, `/40`, `/30` for progressive de-emphasis.
- **Dividers:** `bg-foreground/20` on Limestone, `bg-brand-limestone/20` on Blue. Always `h-px`, width `w-10` (short) or `w-16–20` (hero).
- **Image overlays:** `bg-brand-blue/35` over hero photography. Lightbox overlay: `bg-brand-blue/95 backdrop-blur-md`. Modal overlay: `bg-secondary/95 backdrop-blur-md`.
- **Hover states:** opacity shift only (e.g. `/70 → /100`) or invert (`hover:bg-brand-limestone hover:text-secondary`). Never colour-shift.
- **Forbidden:** any third colour, gradient backgrounds, drop shadows, gold/champagne accents (those were removed early), greys outside the `muted` token.

---

## D. Spacing & Layout System

### Container
```ts
.container-main = max-w-7xl mx-auto px-6   // 1280px max
```
- Inner section padding pattern: `px-5 sm:px-6` (extra mobile breathing room inside container).
- Sub-content widths: `max-w-3xl` (long-form), `max-w-4xl` (2-col grid), `max-w-5xl` (contact grid), `max-w-6xl` (3-col video grid), `max-w-xl` (forms / lead copy).

### Section spacing (this is the signature rhythm)
- **Standard section:** `py-24 md:py-36` (96px → 144px). Used on Vision, Residences philosophy, Brochure, Updates.
- **Compact section:** `py-16 sm:py-24 md:py-32` (Contact).
- **Hero:** `h-[100svh]` (home) or `h-[70vh] md:h-[85vh]` (sub-page heroes).
- **Header below text block under hero on sub-pages:** `py-24 md:py-36` so the page "settles" before content.

### Internal pacing within a section
- Eyebrow → `mb-5` → H2 → `mb-8` → hairline divider → `mb-10` → body.
- Section header block to content grid: `mb-14 sm:mb-20` or `mb-16 md:mb-20`.
- Card internal: image → `mb-5` → meta → `mb-2` → title → `mb-2/3` → body → `mb-3` → CTA.
- Grid gaps: `gap-x-8 gap-y-12` (3-col), `gap-x-12 gap-y-12 sm:gap-y-14` (2-col), `gap-10 sm:gap-16` (contact split).

### Whitespace philosophy
Generous vertical breathing room (144px between blocks on desktop) and tight, deliberate inter-element spacing inside blocks. The space *between* sections is the luxury cue; the space *inside* a card is editorial-tight.

### Responsiveness
- Mobile-first. Two breakpoints carry most of the work: `sm` (640) and `md` (768). `lg` only used to collapse the hero H1 size and switch the contact grid to two columns.
- Mobile pattern: stack everything, halve vertical paddings (`py-24` not `py-36`), drop letter-spacing one step (0.25em → 0.2em on small headings), reduce body font 1px.
- Mobile nav is a fullscreen overlay (`bg-secondary`) with stacked centred links at `text-2xl`, never a slide-in drawer.

---

## E. UI Component System

### Buttons (the only style)
```
.btn-outline-gold {
  border: 1px solid hsl(var(--primary)/0.3);
  background: transparent;
  color: hsl(var(--primary));
  padding: 12px 32px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 14px;
  font-weight: 500;             /* the only place 500 is used */
  font-family: Lato;
  transition: all 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
}
.btn-outline-gold:hover { background: primary; color: primary-foreground; }
```
On Blue surfaces the override is `border-brand-limestone/30 text-brand-limestone hover:bg-brand-limestone/10`. There are **no filled buttons, no icon buttons with backgrounds, no rounded buttons**. Class name kept for legacy — there is no gold.

### Inputs / Forms
- Transparent background, `border border-{fg}/15`, `px-4 py-3`, `text-sm`, placeholder at `/25–/30`. Focus: border `/40`, no ring, no shadow. Always rectangular (radius 0).

### Cards
- Not "cards" in the Material sense. They are content blocks delimited by a top hairline (`border-t border-{fg}/10 pt-6`) or framed images (`border border-{fg}/10`).
- Images are always `aspect-[4/3]` or `aspect-video`, `object-cover`, with a slow `scale-[1.04]` zoom over `duration-[900ms]` on group hover.

### Navigation / Header
- Fixed, `z-40`, `transition-all duration-500`. Transparent on home above scroll; `bg-secondary/95 backdrop-blur-md` once scrolled or on sub-pages.
- Logo (Shorewood) `h-5 md:h-6`. Nav items use the eyebrow style. Single CTA (`Register Interest`) on the right in the limestone-outline variant.

### Hero
- 100svh height, full-bleed `bg-cover bg-center` image with `bg-brand-blue/35` overlay.
- Centre stack: eyebrow → H1 (`tracking-[0.3em]`) → `w-16 sm:w-20 h-px` divider → sub-eyebrow → outlined CTA.
- Entrance: each child fades+rises with staggered `delay: 0.3 / 0.5 / 0.7 / 0.85 / 1.0`, all `duration: 0.9`.

### Iconography
- `lucide-react` only. Always `strokeWidth={1}` or `1.2` (never default 2). Size 14–22px. Colour inherits opacity-modulated foreground.

### Image presentation
- Always full-bleed within frame, no captions overlaid, no rounded corners.
- Hero images can play subtle parallax via `useScroll` + `useTransform` but never zoom on scroll.
- Videos in update grids autoplay on hover only, muted/loop/playsInline, with a circular outlined play badge over a `bg-brand-blue/20` veil that fades out on hover.

### Dividers — the signature motif
A 1px horizontal hairline, `w-10` (40px), centred, at `bg-{fg}/20`, placed between heading and body. This is the single most repeated element on the site.

---

## F. Motion / Animation System

- **Library:** `framer-motion` exclusively.
- **Entrance pattern (universal):**
  ```tsx
  initial={{ opacity: 0, y: 20-30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7-0.9, delay: i * 0.06-0.08 }}
  ```
- **Eases:** `[0.22, 1, 0.36, 1]` for hero/page transitions; `[0.25, 0.1, 0.25, 1]` for UI; `ease-out` for image scale on hover.
- **Durations:** UI transitions 300ms, content reveals 700–900ms, page-level transitions 1000–1100ms, image hover-zoom 900ms.
- **Splash screen:** logo fade-in over 1.2s, fade-out over 0.8s with 0.2s delay.
- **Page transition (Discover More):** fullscreen `bg-secondary` overlay fades in, then "The Vision" text animates `letter-spacing 0.2em → 0.45em` over 1.1s before route change.
- **Hover:** all hovers are 300ms opacity or background swaps. No transforms on links/buttons.

---

## G. Premium Design Psychology — why this works

1. **Two-colour restraint = certainty.** Eliminating choice (one dark, one light, nothing else) reads as confidence and heritage. Luxury brands rarely have a third colour.
2. **Trajan + capitals = institutional gravitas.** Trajan is literally Roman inscriptional capitals — the brain associates it with monuments, museums, films like *Gladiator*. Wide tracking (`0.3em`) slows reading speed and forces respect.
3. **Lato Light body = whisper voice.** Pairing a monumental headline with a thin sans creates contrast that mimics how high-end print uses display serifs over hairline body copy.
4. **Zero border-radius = architectural honesty.** Squared edges read as built, structural, considered — appropriate for property. Rounded corners read as software/consumer-app.
5. **144px section padding = pacing.** It forces the eye to rest between ideas. The product is sold by what you *don't* see.
6. **40px hairline divider as ritual.** Repeating this exact motif under every heading creates a liturgical rhythm; the user subconsciously learns the cadence.
7. **`leading-[1.9]` body = exhalation.** Standard line-height is 1.5. Pushing to 1.9 makes paragraphs feel airy and contemplative.
8. **Slow eases (`cubic-bezier(0.22, 1, 0.36, 1)`).** This is the "expo-out" curve — the same one Apple uses on iOS. It feels expensive because nothing snaps.
9. **No filled buttons, no shadows.** The interface refuses to "sell" — it presents. This inversion of e-commerce UX is itself the status signal.
10. **Hover = opacity, never colour.** Maintains palette purity and reads as a Bond Street boutique, not a SaaS dashboard.

---

## H. Cross-Project Transfer Instructions

**Native Lovable options, ranked by fidelity:**

1. **Remix (highest fidelity).** Right-click this project in the sidebar → Remix → start the new project from this codebase, then delete the existing pages/components and build fresh. You inherit `index.css`, `tailwind.config.ts`, the font imports, `btn-outline-gold`, `eyebrow`, `section-spacing`, `container-main`, and the entire shadcn baseline already themed to Pagent Blue + Limestone.
2. **Cross-project file copy.** In a new project, type `@` in chat and reference this project. Ask the agent to copy `src/index.css`, `tailwind.config.ts`, and `src/assets/shorewood-logo.png` (if applicable). Then paste the Section I prompt to enforce the system.
3. **Prompt-only transfer.** Use Section I. Lower fidelity but works in any blank Lovable project.

There is no global theme package or design-system inheritance in Lovable today — every project carries its own `index.css` + `tailwind.config.ts`. The design system *is* those two files plus the component conventions documented above.

---

## I. Paste-Ready Prompts for the New Lovable Project

### Prompt 1 — Initialise the design system (paste first, in a blank project)

> Set up the entire design system for this project. We are building inside the **Shorewood Homes brand ecosystem** — a heritage British luxury property aesthetic.
>
> **Fonts:** Import in `src/index.css`:
> ```
> @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap');
> @import url('https://fonts.cdnfonts.com/css/trajan-pro');
> ```
> In `tailwind.config.ts` set `fontFamily.display = ['"Trajan Pro"', 'serif']` and `fontFamily.body = ['"Lato"', 'sans-serif']`.
>
> **Colour tokens (HSL, in `:root`):**
> ```
> --brand-blue: 197 100% 15%;       /* Pagent Blue #00314B */
> --brand-limestone: 48 24% 92%;    /* Limestone #EFEDE5 */
> --background: 48 24% 92%;
> --foreground: 197 100% 15%;
> --primary: 197 100% 15%;
> --primary-foreground: 48 24% 92%;
> --secondary: 197 100% 15%;
> --secondary-foreground: 48 24% 92%;
> --muted: 48 15% 86%;
> --muted-foreground: 197 40% 40%;
> --border: 197 100% 15%;
> --input: 197 30% 70%;
> --ring: 197 100% 15%;
> --radius: 0px;
> ```
> Extend Tailwind colours with `brand-blue` and `brand-limestone` mapped to these tokens.
>
> **Global rules:**
> - Body: `bg-background text-foreground font-body antialiased`.
> - All `h1–h6` use `font-display`, weight 400, **always uppercase**.
> - Add `html { scroll-behavior: smooth; }`.
>
> **Utility classes in `@layer components`:**
> ```
> .btn-outline-gold  → border border-primary/30 text-primary bg-transparent px-8 py-3 uppercase tracking-[0.15em] text-sm font-body font-medium transition-all duration-300; ease cubic-bezier(0.25,0.1,0.25,1); hover bg-primary text-primary-foreground.
> .eyebrow            → uppercase tracking-[0.15em] text-xs font-body font-medium text-primary.
> .section-spacing    → py-24 md:py-32.
> .container-main     → max-w-7xl mx-auto px-6.
> ```
>
> Install `framer-motion` and `lucide-react`. Do not install any other UI/icon libraries.

### Prompt 2 — Lock the visual rules (paste once the tokens are in)

> From now on, every component you build for this project must follow these rules without exception:
>
> 1. **Only two surface colours:** `bg-background` (Limestone) or `bg-secondary` (Pagent Blue). Sections alternate; never mix.
> 2. **Text opacity ladder:** full → `/70` body → `/50` meta → `/40` caption → `/30` faint. Use `text-foreground/*` on Limestone, `text-brand-limestone/*` on Blue.
> 3. **No rounded corners.** Radius is `0` globally.
> 4. **No shadows, no gradients, no third colour, no greys outside `--muted`.**
> 5. **Headings:** `font-display`, `font-normal`, `uppercase`, `tracking-[0.18em–0.3em]` (wider for larger sizes). Always followed by a `w-10 h-px bg-{fg}/20 mx-auto mb-10` hairline divider.
> 6. **Body copy:** `font-body font-light`, `text-[13px]–text-[15px]`, `leading-[1.8–1.9]`. Max widths `max-w-xl` (lead) / `max-w-2xl` (body).
> 7. **Eyebrows:** uppercase, `tracking-[0.15em]`, `text-[10px] sm:text-[11px]`, opacity `/50`.
> 8. **Section padding:** `py-24 md:py-36` standard. Compact only for forms: `py-16 sm:py-24 md:py-32`.
> 9. **Inner padding inside `container-main`:** `px-5 sm:px-6`.
> 10. **Buttons:** outlined only, use `.btn-outline-gold`. On Blue add `border-brand-limestone/30 text-brand-limestone hover:bg-brand-limestone/10`.
> 11. **Inputs:** transparent, `border-{fg}/15`, `px-4 py-3`, focus border `/40`, no ring.
> 12. **Icons:** `lucide-react` only, `strokeWidth={1}` or `1.2`, size 14–22.
> 13. **Images:** `aspect-[4/3]` or `aspect-video`, `object-cover`, with `border border-{fg}/10`. Hover zoom: `scale-[1.04]` over `duration-[900ms] ease-out`.
> 14. **Motion:** `framer-motion`, entrance `initial={{opacity:0, y:20-30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7-0.9, delay:i*0.07}}`. Eases: `[0.22,1,0.36,1]` for page-level, `[0.25,0.1,0.25,1]` for UI. All hovers are 300ms opacity/colour-invert only — never transforms.
> 15. **Mobile nav:** fullscreen `bg-secondary` overlay with centred stacked `font-display text-2xl uppercase tracking-[0.2em]` links. No drawers, no slide-ins.

### Prompt 3 — Reusable section recipes

> Use these recipes whenever I ask for a section:
>
> **Hero (full-bleed image):**
> ```
> <section className="relative h-[100svh] w-full overflow-hidden">
>   <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url(${img})`}}/>
>   <div className="absolute inset-0 bg-brand-blue/35"/>
>   <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
>     <p className="eyebrow text-brand-limestone mb-5 text-[10px] sm:text-[11px]">{eyebrow}</p>
>     <h1 className="font-display font-normal text-3xl sm:text-5xl md:text-7xl text-brand-limestone uppercase" style={{letterSpacing:"0.3em"}}>{title}</h1>
>     <div className="w-16 sm:w-20 h-px bg-brand-limestone/40 mt-6 sm:mt-8"/>
>     <p className="eyebrow text-brand-limestone/70 mt-6 sm:mt-8">{subtitle}</p>
>   </div>
> </section>
> ```
>
> **Standard content block:** `py-24 md:py-36`, centred eyebrow + H2/H3 + `w-10 h-px` divider + body `max-w-2xl mx-auto leading-[1.9]`.
>
> **2-col value grid:** `max-w-4xl mx-auto`, `grid sm:grid-cols-2 gap-x-12 gap-y-14`, each item `border-t border-{fg}/10 pt-6` with H4 `tracking-[0.18em]` and body `text-[13px]/[1.8] opacity 55`.
>
> **3-col media grid:** `max-w-6xl`, `grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12`, each item: framed `aspect-video` with category eyebrow top-left, title underneath, body in `/50`.
>
> **Footer (single line, Limestone bg):** thin horizontal row of separator-divided links on left, legal + © on right, all `font-body text-[13px] text-brand-blue` separated by `/` glyphs at `/40`.

### Prompt 4 — Sanity check / enforcement

> Audit every component you generate against the rules above before returning code. If a request would require a third colour, a shadow, a rounded corner, a filled button, a heading without `uppercase tracking-[0.18em+]`, or a body line-height under 1.8 — refuse and propose the on-brand alternative.

---

Pasting Prompts 1 → 2 → 3 → 4 sequentially into a new Lovable project reconstructs this exact design DNA on top of any new page structure you want to build. For the highest fidelity, combine with **Remix** of this project.
