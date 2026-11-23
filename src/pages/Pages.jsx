import React from "react";
import { Link, useLocation } from "react-router-dom";
import { EVENT, navigation, agenda, goals, menu } from "../data/site.js";
import { Flourish, PageHeading, PageEndLink } from "../components/Layout.jsx";
import { NavIcon } from "../components/NavIcon.jsx";
import GoalIcon from "../components/GoalIcon.jsx";
import { Voting } from "../components/Voting.jsx";

const iconTypes = ["program", "dinner", "tickets", "goals"];

function NavigationCard({ item, index }) {
  return (
    <Link to={item.path} className={`nav-card nav-card--${iconTypes[index]}`}>
      <svg
        className="nav-card-frame"
        viewBox="0 0 240 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M18 1 H222 Q223 14 239 15 V305 Q223 306 222 319 H18 Q17 306 1 305 V15 Q17 14 18 1 Z" />
      </svg>
      <span className="nav-card-icon">
        <NavIcon type={iconTypes[index]} />
      </span>
      <span className="nav-card-title">
        {item.cardTitle
          ? item.cardTitle.map((line, i) => (
              <React.Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))
          : item.title}
      </span>
      <Flourish />
      {item.subtitle && <span className="nav-card-copy">{item.subtitle}</span>}
      <span className="nav-card-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="m9 5 7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

export function Home() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-copy">
          <p className="eyebrow">Egy este. Egy közös cél.</p>
          <h1 id="home-title">
            <span>Szülői</span>
            <strong>BÁL</strong>
          </h1>
          <Flourish heart />
          <p className="home-date">{EVENT.date}</p>
          <p className="home-time">
            {EVENT.time} <span>·</span> {EVENT.venue}
          </p>
          <p className="home-description">
            A hagyományokhoz híven idén is megrendezésre kerül a Szülői Bál,
            amelynek bevételét az iskolánkat támogató alapítvány részére
            ajánljuk fel.
          </p>
          <Link className="button button--wine" to="/program.html">
            Fedezze fel a programot <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div
          className="home-art"
          role="img"
          aria-label="Báli tánc ünnepi, gyertyafényes környezetben"
        ></div>
      </section>
      <section className="home-links" aria-labelledby="home-links-title">
        <div className="section-heading">
          <p className="eyebrow">Készüljünk együtt</p>
          <h2 id="home-links-title">Minden, amit az estről tudni érdemes</h2>
          <Flourish />
        </div>
        <div className="nav-cards">
          {navigation.map((item, index) => (
            <NavigationCard key={item.path} item={item} index={index} />
          ))}
        </div>
      </section>
      <section className="home-closing">
        <p className="eyebrow">Együtt többet tehetünk</p>
        <h2>
          Csatlakozzanak Önök is
          <br />a szülői összefogáshoz!
        </h2>
        <Flourish heart />
        <p>
          Legyenek részesei egy estének, ahol a kellemes kikapcsolódás egy
          közös, nemes céllal találkozik!
        </p>
      </section>
    </>
  );
}

export function Program() {
  return (
    <div className="inner-page">
      <PageHeading
        title="Az est programja"
        intro="2027. február 20., szombat  ·  Novotel Szeged"
      />
      <div className="narrow-content">
        <div className="timeline">
          {agenda.map((item) => (
            <article className="timeline-item" key={item.time}>
              <div className="timeline-time">{item.time}</div>
              <div className="timeline-copy">
                <h2>{item.title}</h2>
                {item.text && <p>{item.text}</p>}
                {item.details?.map((detail) => (
                  <div className="timeline-detail" key={detail.title}>
                    <h3>{detail.title}</h3>
                    <p>{detail.text}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <PageEndLink to="/vacsora.html">Az est ízei: gálavacsora</PageEndLink>
      </div>
    </div>
  );
}

export function Dinner() {
  return (
    <div className="inner-page dinner-page">
      <PageHeading
        title="Gálavacsora"
        script="Az est ízei"
        intro="2027. február 20.  ·  Novotel Szeged"
      />
      <div className="dinner-content">
        <p className="dinner-intro">
          Az est gasztronómiai élményeiről a{" "}
          <strong>Novotel Szeged séfjei</strong> gondoskodnak, akik gondosan
          összeállított, svédasztalos ételkülönlegességekkel várják
          vendégeinket.
        </p>
        <div className="menu-list">
          {menu.map((course) => (
            <section className="menu-course" key={course.id}>
              <Flourish />
              <h2>{course.id}</h2>
              <ul>
                {course.meal.map((meal) => (
                  <li key={meal}>{meal}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <PageEndLink to="/jegyek.html">Regisztrációs tudnivalók</PageEndLink>
      </div>
    </div>
  );
}

export function Tickets() {
  return (
    <div className="inner-page">
      <PageHeading
        title="Regisztráció az estére"
        intro="A Szülői Bálra a jegyek korlátozott számban érhetők el, ezért javasoljuk, hogy minél előbb jelezze részvételi szándékát."
      />
      <div className="narrow-content tickets-content">
        <p className="registration-pending">
          A regisztráció két időszakban történik, az iskola titkárságán.
          <br />
          <br />
        </p>
        <div className="registration-card">
          <p className="section-kicker">Első regisztrációs időszak</p>
          <p className="registration-label">Early bird registration</p>
          <p className="registration-pending">2026. december 14. (hétfő)</p>
          <p className="registration-pending">2026. december 15. (kedd)</p>
          <p className="registration-time">13:00 – 16:00 között</p>
        </div>
        <Flourish />
        <p className="section-kicker">Második regisztrációs időszak</p>
        <p className="registration-label">Late registration</p>
        <p className="registration-pending">
          2027. január 11-14. (hétfőtől csütörtökig)
        </p>
        <p className="registration-time">13:00 – 16:00 között</p>
        <Flourish />

        <p className="contribution">
          A részvételhez kapcsolódó ajánlott minimum hozzájárulás:
          <br />
          <strong>25 000 Ft / fő</strong>
        </p>
        <Flourish />
        <p className="tickets-quote">
          Az est bevételét iskolánk alapítványának ajánljuk fel, hogy közösen is
          tehessünk gyermekeink még szebb iskolai környezetéért.
        </p>
        <PageEndLink to="/celjaink.html">
          Ismerje meg közös céljainkat
        </PageEndLink>
      </div>
    </div>
  );
}

export function Goals() {
  return (
    <div className="inner-page">
      <PageHeading
        title="Közös céljaink"
        script="Legyen részese a döntésnek!"
        intro="A Szülői Bál bevételét az iskolánk alapítványa részére ajánljuk fel."
      />
      <div className="narrow-content goals-content">
        <p className="goals-intro">
          A báli este folyamán QR-kódos online szavazással közösen dönthetünk
          arról, hogy a felajánlott támogatás mely cél megvalósítását szolgálja
          elsősorban.
        </p>
        <h2 className="goals-heading">Javasolt támogatási célok</h2>
        <div className="goal-list">
          {goals.map((goal, index) => (
            <article
              className={`goal-item goal-item--${goal.color}`}
              key={goal.id}
            >
              <span className="goal-icon">
                <GoalIcon id={goal.id} />
              </span>
              <span className="goal-number">{index + 1}.</span>
              <div>
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="goals-quote">
          Minél több támogatás gyűlik össze,
          <br />
          annál több közös célunk válhat valóra!
        </p>
        <Flourish />
      </div>
    </div>
  );
}

export function VotePage() {
  const token = useLocation().hash.slice(1);
  const validToken = /^[A-Za-z0-9_-]{43}$/.test(token);
  return (
    <div className="inner-page">
      <PageHeading title="Szavazás" script="Legyen részese a döntésnek!" />
      <div className="narrow-content">
        {validToken ? (
          <Voting key={token} accessToken={token} />
        ) : (
          <p className="vote-access-message" role="alert">
            A szavazás az eseményen kihelyezett QR-kód beolvasásával érhető el.
          </p>
        )}
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="inner-page">
      <PageHeading
        title="Az oldal nem található"
        intro="Lehet, hogy a keresett oldal címe megváltozott."
      />
      <PageEndLink to="/">Vissza a főoldalra</PageEndLink>
    </div>
  );
}
