# skadekrav.no — Prosjekthukommelse for Claude Code

## Hva er dette prosjektet?
Skadekrav.no er en norsk landingsside for hjelp med forsikringskrav ved boligskader.
Eier: Hans Ivar, Oslo.
Tjenesten hjelper boligeiere som har fått avslag eller for lav utbetaling fra forsikringen.
Provisjonsmodell: 30% av det ekstra vi henter inn. Gratis vurdering.

## Tech stack
- Ren HTML, CSS og vanilla JavaScript (ingen rammeverk)
- **Backend:** PHP 8+ med PDO/MySQL for AI-saksvurdering og lagring
- **AI:** Claude API (claude-sonnet-4-20250514) via curl i behandle.php
- Google Fonts: Manrope
- Ingen build-steg, ingen npm

## Filstruktur
```
skadekrav/  (= public_html på server)
├── index.html       — Hele siden (forside, om oss, personvern)
├── style.css        — All styling
├── script.js        — Navigasjon, skjemalogikk, A/B-test, AI-submit
├── behandle.php     — Backend: mottar skjema, kaller Claude API, lagrer i DB
├── admin.php        — Passord-beskyttet saksbehandler-dashboard
└── images/
```

## Sider (alt i én HTML-fil, byttes med showPage())
- `forside` — Hovedside med hero, stats, slik fungerer det, skjema, FAQ
- `om-oss` — Bakgrunn og om Hans Ivar
- `personvern` — GDPR-erklæring

## Det som er bygget så langt
1. **Progressiv skjemaflyt** — 8 steg, ett spørsmål om gangen, fremdriftslinje, validering per steg
2. **Faktaseksjon #hvorfor-klage** — 3 faktakort basert på Finansklagenemnda og norsk forsikringslovgivning (erstatter fiktive testimonials)
3. **Forbedret hero** — Ny h1, tillitspills, sekundær CTA, før/etter-split-bilde, større skrift
4. **CTA A/B-test** — 50/50 mellom to knappetekster, lagret i localStorage som `cta_variant`
5. **Topbar** — Amber-stripe over header med tre tillitssignaler
6. **Inline SVG-logo** — Husikon i amber, ingen ekstern fil
7. **Før/etter-seksjon** — #foer-etter med bad og kjøkken-par
8. **Bilder** — stormskade.jpg i #krav, hero split parkett/resultat

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

## Backend-system (behandle.php + admin.php)

### Slik konfigurerer du det
Åpne **begge** PHP-filer og bytt ut alle `BYTT_MEG`-verdier i CONFIG-blokken øverst:

```php
define('DB_HOST',    'localhost');          // MySQL-host (vanligvis localhost)
define('DB_NAME',    'skadekrav');          // Databasenavn
define('DB_USER',    'skadekrav_bruker');   // DB-brukernavn
define('DB_PASS',    'hemmelig_passord');   // DB-passord
define('CLAUDE_KEY', 'sk-ant-...');        // Anthropic API-nøkkel
define('VARSLE_TIL', 'hansivarl@gmail.com'); // Din e-post for TA-varsler
define('ADMIN_PASS', 'velg_et_sterkt_passord'); // Admin-innlogging
define('SITE_URL',   'https://skadekrav.no');
```

### Hva skjer når noen sender skjemaet
1. `script.js` sender FormData til `/behandle.php` via fetch (ikke Formspree lenger)
2. `behandle.php` kaller Claude API med saksdata og vurderingsregler
3. Claude returnerer JSON: anbefaling (TA/VURDER/AVVIS), score, krav, kundebrev
4. Saken lagres i MySQL-tabellen `saker` (opprettes automatisk første gang)
5. Hvis anbefaling = **TA**: e-postvarsel sendes til VARSLE_TIL
6. Kundebrevet vises i nettleseren med fargekodet boks (grønn/amber/rød)

### Admin-panel
- URL: `https://skadekrav.no/admin.php`
- Logg inn med ADMIN_PASS
- Statistikk, filtrering (TA/VURDER/AVVIS), søk, klikk for detaljer
- Drawer viser: kundinfo, intern AI-analyse, kundebrev med kopier-knapp, mailto-link

### Databasekrav
- MySQL 5.7+ eller MariaDB 10.3+
- PHP 8.0+ med PDO, curl og mbstring-utvidelser aktivert
- Tabellen `saker` opprettes automatisk av behandle.php

## Fremtidig funksjonalitet: AI-saksvurdering (neste steg)
- Hente og analysere offentlige avgjørelser fra finansklagenemnda.no
- Filvedlegg: lagre opplastede bilder og PDF-er med saken
- Logg over AI-kall og kostnad per sak

## Slik starter du
```
cd C:\Users\hansi\[mappenavn]
claude
```
