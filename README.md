# Szülői Bál 2027

React + Vite webhely a Szülői Bálhoz, közös oldalvázzal és négy aloldallal. A szövegek, a program és a támogatási célok a `src/data/site.js` fájlban módosíthatók; a regisztráció dátuma a `src/pages/Pages.jsx` fájlban egyelőre „Hamarosan közzétesszük”.

## Helyi indítás

Node.js 22.13 vagy újabb szükséges.

```bash
npm install
npm run dev
```

A Vite kiírja a helyi címet. A `--host 0.0.0.0` miatt az oldalt ugyanazon a helyi hálózaton másik eszközről is el lehet érni a gép IP-címével és a kiírt porttal.

## A szavazás kipróbálása helyben

A szavazatokat D1 adatbázis tárolja. A sima Vite-előnézet önmagában nem indítja el az API-t: ilyenkor a felület jelzi, hogy a szavazás nem érhető el.

```bash
cp wrangler.example.jsonc wrangler.jsonc
npm run db:init
npm run build
npm run dev:api
```

Az API futása közben egy másik terminálban indítsd a `npm run dev` parancsot. Az első regisztrációs időszak dátuma a mintán üres, ezért ezt közzététel előtt külön kell megadni.

## Cloudflare Pages és D1

A Pages projekt buildparancsa `npm run build`, kimeneti könyvtára `dist`. A `functions/api/vote.js` Pages Function számára a D1-adatbázist `DB` néven kell kötni. Új, üres adatbázishoz a `schema.sql` hozza létre a táblát. A `wrangler.jsonc` fájlban éles műveletek előtt a tényleges adatbázis-azonosító szükséges.

Ha már létezik korábbi szavazási adatbázis, ne hozz létre helyette újat és ne futtass automatikusan migrációt: először ellenőrizd a sémáját és készíts mentést. A szavazásonkénti böngészőkorlátozás sütire épül; a sütik törlésével vagy másik böngészővel megkerülhető, így nem személyazonosság-ellenőrzés.

## Felépítés

- `src/components/`: közös fejléc, keret, lábléc, elválasztók, navigációs ikonok és szavazófelület.
- `src/pages/Pages.jsx`: a főoldal és az aloldalak tartalma.
- `src/styles.css`: közös arculat és mobilos töréspontok.
- `public/assets/`: a főoldal és vacsora grafikája, valamint az átlátszó PNG-logó.
- `functions/api/vote.js`, `schema.sql`: a Cloudflare Pages szavazási API-ja és adatbázissémája.
- `scripts/build-site-worker.mjs`, `drizzle/`: a privát előnézethez használt Worker és D1 séma.

A logó átlátszó, a mintakép alapján újrarajzolt változat. A főoldali báli kép és a vacsora poharas díszítése a megadott képből származik.
