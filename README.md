# Szülői Bál 2027 – Cloudflare Pages + D1

A korábbi szavazóoldal áttervezett változata a megadott báli plakát színvilágával és felépítésével.

## Oldalak
- `/` – nyitóoldal, négy kattintható nyilas kártyával
- `/program.html` – az est programja
- `/vacsora.html` – gálavacsora
- `/jegyek.html` – regisztrációs jegyek
- `/celjaink.html` – közös célok, A/B/C szavazás és eredmények

A `/szavazas.html` továbbra is működik. A régi `/informaciok.html` és `/gyik.html` átirányítást tartalmaz.

## Deploy (meglévő Pages projekt)
1. A projekt gyökerében: `git add . && git commit -m "Szülői Bál arculat"`.
2. Feltöltés: `GIT_SSH_COMMAND="ssh -o IdentityAgent=none -o IdentitiesOnly=yes -i ~/.ssh/id_ed25519" git push origin main`.
3. Cloudflare Pages build output directory: `public`, build command üres.
4. `Settings → Bindings`: a `DB` D1 binding maradjon a `szavazas-db` adatbázison.
5. **Ne futtasd újra törléssel a schema.sql-t**, a meglévő `votes` táblát és szavazatokat meghagyjuk.

A backend forrása `functions/api/vote.js` nem változott. Az API `/api/vote` ugyanaz; új adatbázis nem szükséges.

## Egyedi tartalom
A képen szereplő dátum, helyszín és leírás szerepel. Program/menü/jegyinformáció nem volt megadva, ezért ezeknél egyértelmű tájékoztató helyőrzők maradtak. Az A/B/C opciókat a `public/celjaink.html` és `public/szavazas.html` fájlban lehet átnevezni; az A/B/C `value` értékeket ne módosítsd, mert a backend és az adatbázis ezeket tárolja.

A plakátból kivágott kép felhasználásával készültek a helyi webes illusztrációk (`public/assets`). A weboldal nem hivatkozik külső képfájlokra; a Google Fonts viszont hálózati betöltést használ.
