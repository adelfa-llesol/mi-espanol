"use client";

import { useMemo, useState } from "react";

type Tab = "Home" | "Lessons" | "Practice" | "DELE A2";
const modules = [
  ["01", "Introductions & personal information", "Greetings, nationality, age, family and professions", "A1"],
  ["02", "Daily routines", "Present tense, reflexive verbs and telling the time", "A1"],
  ["03", "Food & shopping", "Restaurants, prices, quantities and ordering", "A1"],
  ["04", "Transport & directions", "Asking for directions, tickets and travel", "A1–A2"],
  ["05", "Past tense", "Pretérito perfecto and indefinido", "A2"],
  ["06", "Health & appointments", "Symptoms, body parts and making appointments", "A2"],
  ["07", "Plans & opinions", "Future plans, comparisons and preferences", "A2"],
  ["08", "Everyday Spanish & DELE review", "Integrated practice and exam vocabulary", "A2"],
];
const skills = [
  ["Reading", "Comprensión de lectura", "Understand everyday written texts, notices, messages and emails.", "60 minutes"],
  ["Listening", "Comprensión auditiva", "Understand conversations and short recordings in everyday contexts.", "40 minutes"],
  ["Writing", "Expresión e interacción escritas", "Write short messages and texts for everyday situations.", "45 minutes"],
  ["Speaking", "Expresión e interacción orales", "Answer questions, describe situations and interact in Spanish.", "About 12 minutes + preparation"],
];

export default function Home() {
  const [tab, setTab] = useState<Tab>("Home");
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [writing, setWriting] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [mockAnswer, setMockAnswer] = useState("");
  const [mockSubmitted, setMockSubmitted] = useState(false);
  const [vocab, setVocab] = useState(0);

  const progress = useMemo(() => Math.round((completed.length / modules.length) * 100), [completed]);
  const markLesson = (i: number) => setCompleted((old) => old.includes(i) ? old : [...old, i]);

  return (
    <main className="shell">
      <header className="hero">
        <div className="topline"><div className="brand-mark">Mi<span>Español</span> 🇪🇸</div><span className="level-pill">A1 → A2</span></div>
        <p className="eyebrow">TU CAMINO HACIA EL DELE A2</p>
        <h1>¡Hola! Let&apos;s learn Spanish.</h1>
        <p className="hero-copy">Your personal Spanish learning companion, from everyday conversations to exam confidence.</p>
        <div className="stats">
          <div><strong>30</strong><span>MIN / DAY</span></div>
          <div><strong>{completed.length}</strong><span>LESSONS DONE</span></div>
          <div><strong>12</strong><span>MONTHS TO GOAL</span></div>
        </div>
      </header>

      <nav className="tabs" aria-label="Main navigation">
        {(["Home", "Lessons", "Practice", "DELE A2"] as Tab[]).map((item) =>
          <button key={item} className={tab === item ? "tab active" : "tab"} onClick={() => setTab(item)}>{item}</button>
        )}
      </nav>

      {tab === "Home" && <section className="content">
        <div className="section-heading"><div><p className="eyebrow dark">YOUR LEARNING DASHBOARD</p><h2>Welcome back!</h2></div><span className="date-pill">12-MONTH PLAN</span></div>
        <div className="progress-card">
          <div className="between"><strong>Your DELE A2 journey</strong><b>{progress}%</b></div>
          <div className="progress-track"><div className="progress-fill" style={{width: `${progress}%`}} /></div>
          <p className="muted">Complete the eight learning modules to finish this introductory curriculum.</p>
        </div>
        <h3>Today&apos;s 30-minute plan</h3>
        <div className="plan-grid">
          {[["10 min","Vocabulary","Learn and review useful words"],["10 min","Grammar","Understand one grammar point"],["5 min","Conversation","Practise everyday Spanish"],["5 min","Quick quiz","Check what you have learned"]].map(([time,title,desc]) =>
            <div className="plan-item" key={title}><span className="time">{time}</span><strong>{title}</strong><small>{desc}</small></div>
          )}
        </div>
        <div className="minutes-card"><div className="between"><strong>Minutes studied today</strong><b>{minutes}/30</b></div><input aria-label="Minutes studied today" type="range" min="0" max="30" step="5" value={minutes} onChange={e=>setMinutes(Number(e.target.value))}/></div>
        <div className="callout"><div><span className="tag">START HERE · A1 GRAMMAR</span><h3>Ser vs. estar</h3><p>Learn when to use two of the most important Spanish verbs.</p></div><button className="primary" onClick={()=>setTab("Practice")}>Start lesson →</button></div>
        <h3>Four DELE A2 skills</h3>
        <div className="skill-grid">{skills.map(([name,es])=><div className="skill-card" key={name}><span className="skill-icon">{name==="Reading"?"📖":name==="Listening"?"🎧":name==="Writing"?"✍️":"🗣️"}</span><strong>{name}</strong><small>{es}</small></div>)}</div>
      </section>}

      {tab === "Lessons" && <section className="content">
        <p className="eyebrow dark">STRUCTURED CURRICULUM</p><h2>Spanish lessons</h2><p className="muted intro">Work through the modules in order. Mark each lesson complete as you finish it.</p>
        <div className="module-list">{modules.map(([num,title,desc,level],i)=><article className="module" key={num}>
          <div className="module-top"><span className="module-num">{num}</span><span className="tag">{level}</span></div>
          <h3>{title}</h3><p>{desc}</p>
          <button className={completed.includes(i)?"complete-button":"secondary"} onClick={()=>markLesson(i)}>{completed.includes(i)?"✓ Completed":"Mark lesson complete"}</button>
        </article>)}</div>
      </section>}

      {tab === "Practice" && <section className="content">
        <p className="eyebrow dark">INTERACTIVE LEARNING</p><h2>Practice & get feedback</h2>
        <div className="exercise-card">
          <span className="tag">A1 · GRAMMAR</span><h3>Ser vs. estar</h3>
          <p className="question">Complete the sentence:</p><p className="spanish-sentence">Ahora yo _____ en Bilbao.</p><p className="muted">Right now, I am in Bilbao.</p>
          <div className="options">{[["soy","A. Soy"],["estoy","B. Estoy"],["es","C. Es"]].map(([value,label])=><button key={value} className={answer===value?"option selected":"option"} onClick={()=>{setAnswer(value);setChecked(false)}}>{label}</button>)}</div>
          <button className="primary full" disabled={!answer} onClick={()=>setChecked(true)}>Check my answer</button>
          {checked && <div className={answer==="estoy"?"feedback good":"feedback bad"}><strong>{answer==="estoy"?"¡Correcto! Well done.":"Not quite — let's correct that."}</strong><p>The correct answer is <b>estoy</b>. Use <i>estar</i> to express location. <i>Soy</i> and <i>es</i> are forms of <i>ser</i>, used for identity and characteristics.</p><p><b>Correct sentence:</b> Ahora yo estoy en Bilbao.</p></div>}
        </div>
        <div className="exercise-card">
          <span className="tag blue">DELE A2 · WRITING PRACTICE</span><h3>Introduce yourself</h3><p>Write 3–5 sentences in Spanish. Say who you are, where you live and what you usually do every day.</p>
          <textarea value={writing} onChange={e=>setWriting(e.target.value)} placeholder="Hola, me llamo... Vivo en... Cada día..." rows={5}/>
          <button className="primary full" disabled={!writing.trim()} onClick={()=>alert("Writing saved in this session. For detailed AI corrections, connect an AI tutor service in a future version. You can also paste your text into ChatGPT and ask: “Correct every mistake and explain why.”")}>Review writing instructions</button>
          <p className="fine-print">This starter version does not yet connect to an AI correction service or speech recognition. You can ask ChatGPT to correct your writing by pasting your answer into the conversation.</p>
        </div>
        <div className="exercise-card"><span className="tag">VOCABULARY</span><h3>Daily word review</h3><div className="vocab-word">{["la estación","el billete","la cita","el barrio","la cuenta"][vocab%5]}</div><p className="muted">Word {vocab+1} of your starter review set</p><button className="secondary" onClick={()=>setVocab(v=>v+1)}>Next word →</button></div>
      </section>}

      {tab === "DELE A2" && <section className="content">
        <p className="eyebrow dark">EXAM PREPARATION</p><h2>DELE A2 exam centre</h2><p className="muted intro">Practise the four skills assessed in the official examination.</p>
        <div className="exam-note"><strong>Your target: within 12 months</strong><p>Build your A1 foundation, develop A2 skills, then move into timed exam practice and mock tests.</p></div>
        <div className="exam-skills">{skills.map(([name,es,desc,duration],i)=><article className="exam-skill" key={name}><span className="skill-icon">{["📖","🎧","✍️","🗣️"][i]}</span><div><h3>{name}</h3><small>{es}</small><p>{desc}</p><span className="fine-print">Official exam component duration: {duration}</span></div></article>)}</div>
        <div className="exercise-card">
          <span className="tag blue">MINI MOCK EXAM · READING</span><h3>Read the message</h3>
          <div className="letter"><p>Hola, Marta:</p><p>Este sábado voy a visitar a mis padres en Madrid. Saldré de Bilbao a las ocho de la mañana en tren y regresaré el domingo por la tarde. ¿Quieres venir conmigo?</p><p>Un abrazo,<br/>Lucía</p></div>
          <p className="question">When will Lucía return to Bilbao?</p>
          <div className="options">{[["A","Saturday morning"],["B","Sunday afternoon"],["C","Monday morning"]].map(([v,label])=><button key={v} className={mockAnswer===v?"option selected":"option"} onClick={()=>{setMockAnswer(v);setMockSubmitted(false)}}>{v}. {label}</button>)}</div>
          <button className="primary full" disabled={!mockAnswer} onClick={()=>setMockSubmitted(true)}>Submit answer</button>
          {mockSubmitted && <div className={mockAnswer==="B"?"feedback good":"feedback bad"}><strong>{mockAnswer==="B"?"¡Correcto!":"Not quite."}</strong><p>The answer is B, Sunday afternoon. The clue is “regresaré el domingo por la tarde”.</p></div>}
        </div>
        <div className="callout"><div><span className="tag">NEXT MILESTONE</span><h3>Full four-skill mock exam</h3><p>A timed practice test with reading, listening, writing and speaking tasks is planned for a later version.</p></div></div>
        <p className="fine-print">Exam durations and format can change. Check the Instituto Cervantes website for the current official exam guide and registration details.</p>
        <a className="text-link" href="https://examenes.cervantes.es/" target="_blank" rel="noreferrer">Official Instituto Cervantes DELE portal ↗</a>
      </section>}
      <footer><strong>Mi Español 🇪🇸</strong><span>Personal Spanish learning · Starter version</span><span>Your progress is currently saved only during this browser session. Persistent private accounts and cloud syncing need to be configured before launch.</span></footer>
    </main>
  );
}
