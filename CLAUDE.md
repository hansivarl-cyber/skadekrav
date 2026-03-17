# skadekrav.no — Prosjekthukommelse for Claude Code

## Hva er dette prosjektet?
Skadekrav.no er en norsk landingsside for hjelp med forsikringskrav ved boligskader.
Eier: Hans Ivar, Oslo.
Tjenesten hjelper boligeiere som har fått avslag eller for lav utbetaling fra forsikringen.
Provisjonsmodell: 30% av det ekstra vi henter inn. Gratis vurdering.

## Tech stack
- Ren HTML, CSS og vanilla JavaScript (ingen rammeverk)
- Formspree for skjemainnsending (action: https://formspree.io/f/xgonvdrz)
- Google Fonts: Manrope
- Ingen build-steg, ingen npm — åpne index.html direkte i nettleser

## Filstruktur
```
skadekrav/
├── index.html       — Hele siden (forside, om oss, personvern)
├── style.css        — All styling
├── script.js        — Navigasjon, skjemalogikk, A/B-test
└── images/
    ├── logo-skadekrav.svg
    └── hero-par-vannlekkasje.jpg
```

## Sider (alt i én HTML-fil, byttes med showPage())
- `forside` — Hovedside med hero, stats, slik fungerer det, skjema, FAQ
- `om-oss` — Bakgrunn og om Hans Ivar
- `personvern` — GDPR-erklæring

## Det som er bygget så langt
1. **Progressiv skjemaflyt** — 8 steg, ett spørsmål om gangen, fremdriftslinje, validering per steg
2. **Testimonials** — Seksjon #kundehistorier med 3 kort (Kari/Oslo, Petter/Bergen, Lise og Tor/Trondheim)
3. **Forbedret hero** — Ny h1, tillitspills, sekundær CTA, større skrift
4. **CTA A/B-test** — 50/50 mellom to knappetekster, lagret i localStorage som `cta_variant`

## Viktige designbeslutninger
- Farger: Hvit bakgrunn, mørk tekst, oransje/amber som aksentfarge
- Font: Manrope (400, 600, 700, 800)
- Responsivt: Mobil-første, grid-layout på desktop
- Ingen cookies eller sporing — kun Formspree og localStorage for A/B-test
- Språk: Norsk bokmål gjennomgående

## SEO
- Meta-tags, Open Graph og schema.org (ProfessionalService + FAQPage) er satt opp
- Canonical URL: https://skadekrav.no/
- Robots: index, follow

## Neste steg / ideer
- [ ] Ekte kundehistorier når de finnes
- [ ] Google Analytics eller Plausible for trafikkmåling
- [ ] Registrere org.nr i Brønnøysund (nevnt i personvernerklæringen)
- [ ] Favicon
- [ ] Vurder å legge til chat-widget for lavterskel kontakt

## Slik starter du
```
cd C:\Users\hansi\[mappenavn]
claude
```
