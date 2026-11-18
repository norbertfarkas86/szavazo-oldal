export const EVENT = {
  title: "Szülői Bál",
  year: "2027",
  date: "2027. február 20.",
  time: "19:00",
  venue: "Novotel Szeged",
};
export const navigation = [
  {
    path: "/program.html",
    title: "Az est részletes programja",
    cardTitle: ["Az est", "részletes programja"],
    icon: "▦",
    style: "card-program",
    short: "Program",
  },
  {
    path: "/vacsora.html",
    title: "Gálavacsora az est ízei",
    cardTitle: ["Gálavacsora", "az est ízei"],
    icon: "♧",
    style: "card-dinner",
    short: "Gálavacsora",
  },
  {
    path: "/jegyek.html",
    title: "Regisztrációs jegyek",
    icon: "◇",
    style: "card-tickets",
    short: "Jegyek",
  },
  {
    path: "/celjaink.html",
    title: "Közös céljaink",
    subtitle:
      "Ismerje meg a Szülői Bál bevételéből támogatni kívánt célokat. Döntsük el közösen!",
    icon: "♡",
    style: "card-goals",
    short: "Közös céljaink",
  },
];
export const agenda = [
  {
    time: "19:00",
    title: "Vendégfogadás",
    text: "Welcome drink, régi ismerősök, új találkozások és kötetlen beszélgetések – hangolódjunk együtt az estére!",
  },
  {
    time: "19:45",
    title: "Ünnepélyes megnyitó",
    text: "Köszöntők és igazgatói beszéd.",
  },
  {
    time: "20:00",
    title: "Gálaműsor vendégeink részére",
    details: [
      {
        title: "Szegedi Classic Trió",
        text: "Az est elegáns zenei hangulatát a Szegedi Classic Trió kamaraegyüttes alapozza meg, a fuvola, a fagott és a zongora nem mindennapi összhangjával.",
      },
      {
        title: "Tiszavirág Néptáncegyüttes",
        text: "Magyar néphagyományainkat megidéző néptáncelőadás.",
      },
    ],
  },
  {
    time: "20:30",
    title: "Gálavacsora",
    text: "A gasztronómiai élményekről a Novotel Szeged séfjei gondoskodnak, kellemes vacsorazene kíséretében.",
  },
  {
    time: "21:30",
    title: "Bál és tánc – Feeling Music zenekar",
    text: "A parketté a főszerep! A Feeling Music zenekar ismert hazai és nemzetközi slágerekkel gondoskodik az est tánczenéjéről, felidézve „fiatalságunk szombat estéinek” hangulatát – amikor még nem az volt a legnagyobb kérdés, hogy ki vigyáz a gyerekekre, hanem hogy meddig tart a buli!",
  },
  {
    time: "24:00",
    title: "Fortuna színre lép!",
    text: "A hagyományos báli tombolasorsolások izgalmát megidéző nyereménysorsolás, értékes meglepetésajándékokkal.",
  },
];
export const goals = [
  {
    id: "A",
    color: "rose",
    title: "Az oktatási eszközpark fejlesztése",
    description:
      "Projektorok és tartozékaik korszerűsítése, az élményalapú oktatást segítő eszközök beszerzése.",
    short: "Oktatási eszközpark",
  },
  {
    id: "B",
    color: "blue",
    title: "A tantermek hőkomfortjának javítása",
    description:
      "Hővédő függönyök felszerelése a tartós, közvetlen napsugárzásnak kitett tantermek túlzott felmelegedésének mérséklése és a kellemesebb tanulási környezet kialakítása érdekében.",
    short: "Tantermek hőkomfortja",
  },
  {
    id: "C",
    color: "green",
    title: "Az iskolai kézmosási és mosdóhasználati feltételek korszerűsítése",
    description:
      "Szenzoros csaptelepek, automata szappanadagolók és zárható WC-papír-adagolók felszerelése, különös figyelmet fordítva az étkezés előtti kézmosás megkönnyítésére és a gyermekek mindennapi komfortérzetének növelésére.",
    short: "Kézmosás és mosdók",
  },
  {
    id: "D",
    color: "gold",
    title: "A tornaterem ablakainak védelme",
    description:
      "Az ablaküvegeket védő rácsok felszerelése a biztonságosabb sportolási és udvari környezet kialakítása érdekében.",
    short: "Tornatermi ablakvédelem",
  },
];
export const menu = [
  {
    id: "Előétel - Fingerfood",
    meal: [
      "Humusszal és fetasajttal töltött tortilla tekercs",
      "Pármai sonka márványsajt habbal és kandírozott dióval",
      "Grillezett camembert lilahagyma lekvárral",
    ],
  },
  {
    id: "Levesek",
    meal: [
      "Sertésraguleves vadgombákkal",
      "Narancsos sütőtők krémleves mandulával",
    ],
  },
  {
    id: "Főételek",
    meal: [
      "Marharagu karamellizált zöldségekkel, juhtúrós galuskával",
      "Pácolt sertés csülök házi fűszeres steak burgonyával",
      "Csirkemell ropogós kukoricapehelyben, zöldséges jázminrizzsel",
      "Padlizsános-paradicsomos lasagne rukkolával",
      "Salátabár"
    ],
  },
  {
    id: "Desszertek",
    meal: [
      "Mákos crumble",
      "Mandarinos sajttorta",
    ],
  },
];
