# Szülői Bál 2027 – React + Vite + Cloudflare Pages + D1

A korábbi HTML/CSS projekt React-komponensekre bontott változata. A négy tartalmi aloldal és a főoldal URL-je **változatlan**, a `functions/api/vote.js` és a meglévő távoli D1 adatbázis megmarad.

## Szükséges
- Node.js 20.19+ vagy 22.12+, npm
- Cloudflare Pages projekt: `szavazo-oldal`
- Cloudflare Pages Production D1 binding: `DB` → `szavazas-db`
- A távoli adatbázisban már 4 választ (`A/B/C/D`) fogadó `votes` tábla

## Helyi indítás (két terminál)

```bash
npm install
npm run db:init            # csak egyszer, helyi D1-hez
npm run build              # Wrangler a dist mappát szolgálja ki
npm run dev:api            # 1. terminál: D1 + Pages Functions: localhost:8788
npm run dev                # 2. terminál: React HMR: localhost:5173
```

A szavazást **http://localhost:5173/celjaink.html** címen próbáld. Vite a `/api/*` kéréseket a `localhost:8788` Wranglerhez továbbítja. Helyi D1 adatokat használ; az éles adatbázishoz nem nyúl. A `npm run db:init` egy friss helyi D1-ben létrehozza a `votes` táblát.

**Fontos:** ha megváltoztatod a `functions/api/vote.js` szerveroldali kódot, futtasd újra a `npm run build` parancsot és szükség esetén indítsd újra a `npm run dev:api` folyamatot. React/CSS módosítások azonnal frissülnek a Vite-on.

Csak statikus előnézethez elég a `npm run dev`, de ekkor a szavazási API csak a Wrangler folyamat mellett működik.

## Éles deploy – meglévő Pages projekt

1. Biztonsági mentés a jelenlegi Git repositoryról (pl. új branch). A projektfájlokat a repository **gyökerébe** másold.
2. `npm install && npm run build` és ellenőrizd helyben.
3. `git add . && git commit -m "React Vite atallas" && git push origin main` (használd a már bevált SSH-parancsodat, ha szükséges).
4. Cloudflare Pages → **Build configuration**: Framework preset: **React (Vite)** / vagy None; Build command: `npm run build`; Build output directory: `dist`; Root: `/`.
5. A meglévő Pages Functions továbbra is a projektgyökérben lévő `functions/` könyvtárból lesz deployolva. **Production D1 binding**: `DB` → `szavazas-db`. A Dashboard bindingot ne töröld.
6. Teszt: `https://szavazo-oldal.pages.dev/api/vote` és `https://szavazo-oldal.pages.dev/celjaink.html`.

**Ne futtass távoli D1-migrációt csak az átállás miatt!** A meglévő D1 szavazatokat nem módosítja a React-kód.

## Hol módosítsd?
- Arculat: `src/styles/global.css` (a meglévő meghívó CSS megőrizve), színváltozók a fájl elején.
- Közös fejléc/lábléc/navigáció: `src/components/Layout.jsx`.
- Főoldali 4 kártya: `src/data/site.js` → `navigation` és `src/components/Layout.jsx` → `NavigationCard`.
- Program: `src/data/site.js` → `agenda`, `src/pages/Program.jsx`.
- Szavazási célok: `src/data/site.js` → `goals`; megjelenítés `src/components/Voting.jsx`.
- Éles szavazási API: `functions/api/vote.js` (változatlan).
- Gálavacsora/jegyek: `src/pages/Dinner.jsx`, `src/pages/Tickets.jsx`.

## Megjegyzések
- A szavazás sütialapú egyszeri korlátozása nem biztonságos személyazonosítás; fontos szavazáshoz Turnstile/azonosítás ajánlott.
- A `wrangler.local.toml` kizárólag **helyi** konfiguráció, benne szándékosan helyi teszthez használt UUID. Nem való távoli adatbázis kezelésére. A korábbi `wrangler.toml` fájlt ne keverd össze vele.
- A `dist/`, `node_modules/`, `.wrangler/` nem kerül Gitbe.
