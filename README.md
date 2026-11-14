# Szavazóoldal – Cloudflare Pages + D1

Négy statikus oldal, egy Pages Function API és egy D1 adatbázis.

## Lépések

1. Hozz létre egy GitHub repositoryt, és töltsd fel a projekt teljes tartalmát a repository gyökerébe.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git. Válaszd a repositoryt.
3. Framework preset: None; build command: üres; output directory: `public`. Production branch: `main`.
4. Cloudflare Dashboard → D1 SQL Database → Create database, név: `szavazas-db`.
5. A D1 Console felületén futtasd a `schema.sql` teljes tartalmát (vagy Wrangler CLI-val: `npx wrangler d1 execute szavazas-db --remote --file=./schema.sql`).
6. Workers & Pages → Pages projekt → Settings → Bindings → Add → D1 database. Variable name: `DB`; D1 database: `szavazas-db`.
7. Indíts új production deploymentet, hogy a binding aktív legyen.
8. Nyisd meg a `https://<projekt>.pages.dev/szavazas.html` címet és szavazz.

## Eredmények ellenőrzése

A Cloudflare D1 Console-ban:

```sql
SELECT choice, COUNT(*) AS votes FROM votes GROUP BY choice ORDER BY choice;
```

## Tudnivalók

- A cookie alapú egyszeri szavazás böngészőnként működik, nem bizonyít személyazonosságot. A sütik törlésével új szavazat adható le.
- Erős visszaélés-védelemhez Turnstile, sebességkorlátozás vagy hitelesítés kell.
- A `schema.sql` futtatása szükséges az első szavazás előtt.
- A `functions` mappa nem a `public` mappában van.
- Ne publikálj személyes adatot; a példa csak a választást, egy véletlen tokenazonosítót és időpontot tárol.
- Érdemes rendszeresen exportálni a D1 adatbázisodat.
