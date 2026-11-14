# Szülői Bál 2027 – Cloudflare Pages + D1

## A változtatás

A `/celjaink.html` oldal négy konkrét támogatási célt jelenít meg, A/B/C/D opciókkal és szavazati eredményekkel.
A `/szavazas.html` régi cím a Közös céljaink oldalra irányít.

## FONTOS: meglévő D1 adatbázis migrálása

A korábbi `votes` táblában `CHECK (choice IN ('A','B','C'))` megszorítás van. A **D** opció mentéséhez a tábla átalakítása kötelező. A korábbi szavazatok megmaradnak.

1. Mielőtt bármit módosítasz, készíts mentést a Cloudflare D1 adatbázisról (Dashboard / D1 / Backups, vagy Wrangler export).
2. Győződj meg róla, hogy a megfelelő `szavazas-db` adatbázist választottad ki.
3. A projekt gyökerében futtasd (Node.js/npm szükséges):

   ```bash
   npx wrangler login
   npx wrangler d1 execute szavazas-db --remote --file=./migration-4-options.sql
   ```

4. Ellenőrizd:

   ```sql
   SELECT COUNT(*) AS total FROM votes;
   SELECT sql FROM sqlite_master WHERE name='votes';
   ```

   Az új `CHECK` az `A`, `B`, `C`, `D` értékeket fogadja.

5. A GitHubra feltöltés után a Cloudflare Pages automatikusan deployolja az új frontend és API fájlokat. Ellenőrizd: `https://szavazo-oldal.pages.dev/api/vote`, ahol a `counts` objektumban már `D` is szerepel.

**Megjegyzés:** a már meglévő A/B/C szavazatok nem kapnak automatikusan új értelmezést. Ha a korábbi A/B/C mintaszavazatok voltak, éles szavazás előtt külön döntsd el, törölni akarod-e őket. A migráció nem törli őket.

## Feltöltés a GitHubra

Másold a ZIP `szavazo-bal` mappájának tartalmát a meglévő repository gyökerébe, majd:

```bash
git add public/celjaink.html public/szavazas.html public/vote.js public/style.css functions/api/vote.js schema.sql migration-4-options.sql README.md
git commit -m "Negy tamogatasi cel es szavazas"
GIT_SSH_COMMAND="ssh -o IdentityAgent=none -o IdentitiesOnly=yes -i ~/.ssh/id_ed25519" git push origin main
```

A Pages build output mappa továbbra is `public`, a D1 binding neve `DB`.

## Projektfájlok

- `public/celjaink.html`: támogatási célok, szavazás, eredmények
- `public/style.css`: teljes arculat
- `public/vote.js`: szavazási kliens
- `functions/api/vote.js`: szerveroldali szavazási API
- `migration-4-options.sql`: meglévő D1 séma biztonságos átalakítása (mentést követően)
- `schema.sql`: új adatbázishoz használt séma

Egy böngészősütivel működő szavazási korlátozás nem jelent teljes visszaélésvédelmet.
