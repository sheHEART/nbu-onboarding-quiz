import { useState } from "react";
const GREEN = "#2d6a4f";
const LIGHT_GREEN = "#52b788";
const PALE = "#d8f3dc";
const ACCENT = "#f4a261";
const typologyQuestions = [
  {
    id: "origin",
    question: "Kommst du aus Niedersachsen?",
    options: [
      { value: "yes", label: "Ja, ich bin echte/r Niedersachse/in 🌾" },
      { value: "partly", label: "Nicht ganz – aber ich lebe hier" },
      { value: "no", label: "Nein, ich komme von woanders" },
    ],
  },
  {
    id: "play",
    question: "Spielst du gerne? (Bingo, Spiele, Quizze ...)",
    options: [
      { value: "love", label: "Ja, ich liebe Spiele! 🎲" },
      { value: "sometimes", label: "Manchmal – kommt aufs Spiel an" },
      { value: "not_really", label: "Eher nicht – ich mache lieber andere Dinge" },
    ],
  },
  {
    id: "nature",
    question: "Wie wichtig ist dir Naturschutz persönlich?",
    options: [
      { value: "very", label: "Sehr wichtig – ein echtes Herzensthema 🌿" },
      { value: "medium", label: "Wichtig, aber nicht mein Hauptthema" },
      { value: "growing", label: "Ich lerne gerade mehr darüber" },
    ],
  },
  {
    id: "foundation",
    question: "Wie viel weißt du über Stiftungen?",
    options: [
      { value: "expert", label: "Einiges – ich kenne mich aus 🏛️" },
      { value: "basic", label: "Grundlagen kenne ich" },
      { value: "beginner", label: "Ehrlich gesagt: noch wenig" },
    ],
  },
];
function buildTypologyMessage(answers) {
  const { origin, play, nature, foundation } = answers;
  const parts = [];
  if (origin === "yes") parts.push("Als echte/r Niedersächsin/Niedersachse weißt du, wofür diese Region steht");
  else if (origin === "partly") parts.push("Auch wenn du nicht ursprünglich von hier stammst – du bist jetzt Teil von Niedersachsen");
  else parts.push("Obwohl du von woanders kommst, zeigt dein Interesse: Engagement kennt keine Grenzen");
  if (play === "love") parts.push("und deine Spielfreude passt wunderbar zu einer Stiftung, die buchstäblich mit einem Spiel – Bingo! – Gutes in der Welt bewirkt");
  else if (play === "sometimes") parts.push("und mit dem richtigen Spiel – wie diesem hier – kann man richtig viel Freude haben");
  else parts.push("und auch wenn Spiele nicht dein Ding sind: Dieses Onboarding wird dich trotzdem überraschen");
  if (nature === "very") parts.push("Dein Herzensthema Naturschutz ist hier genau richtig – du wirst viel Sinnvolles entdecken");
  else if (nature === "medium") parts.push("Dein Interesse an Naturschutz wird hier wachsen – versprochen");
  else parts.push("Du lernst hier Naturschutz ganz konkret kennen – von Artenschutz bis Emsfonds");
  let foundationNote = "";
  if (foundation === "expert") foundationNote = "Dein Stiftungswissen ist ein tolles Fundament – du wirst viele Verbindungen zu deinem Vorwissen finden.";
  else if (foundation === "basic") foundationNote = "Dein Grundwissen zu Stiftungen können wir hier gemeinsam vertiefen und mit Leben füllen.";
  else foundationNote = "Dein Wissen zu Stiftungen bauen wir hier zusammen Schritt für Schritt auf – kein Problem!";
  return `${parts.join(", ")}. ${foundationNote} Herzlich willkommen bei der NBU! 🎉`;
}
const quizQuestions = [
  {
    q: "Was ist der offizielle Vollname der Stiftung?",
    options: [
      "Niedersächsische Bingo-Umweltstiftung",
      "Niedersächsische Bingostiftung für Umwelt und Entwicklungszusammenarbeit",
      "Niedersächsische Lotto- und Umweltstiftung",
      "Niedersächsische Naturschutzstiftung Bingo",
    ],
    correct: 1,
    explanation: "Der offizielle Name lautet \"Niedersächsische Bingostiftung für Umwelt und Entwicklungszusammenarbeit\" – NBU ist die gebräuchliche Kurzform.",
  },
  {
    q: "Woher kommt der Großteil der Mittel der Stiftung?",
    options: [
      "Staatliche Zuschüsse des Bundes",
      "Private Großspenden aus der Wirtschaft",
      "Überschüsse der Bingo!-Umweltlotterie und Finanzhilfen des Landes Niedersachsen",
      "EU-Förderprogramme",
    ],
    correct: 2,
    explanation: "Die Haupteinnahmequelle sind die Überschüsse der Bingo!-Umweltlotterie sowie Finanzhilfen des Landes Niedersachsen. Die Lotterie läuft in mehreren norddeutschen Bundesländern.",
  },
  {
    q: "In welchem Jahr wurde die Stiftung gegründet – und als Reaktion auf was?",
    options: [
      "2009, als Reaktion auf die Finanzkrise",
      "1989, als Reaktion auf die Nuklearkatastrophe von Tschernobyl",
      "2000, als Reaktion auf den Klimagipfel in Kyoto",
      "1995, als Reaktion auf das Waldsterben",
    ],
    correct: 1,
    explanation: "Die Stiftung wurde 1989 unter dem Namen \"Niedersächsische Umweltstiftung\" gegründet – als direkte Reaktion auf die Nuklearkatastrophe von Tschernobyl 1986.",
  },
  {
    q: "Welche vier Förderbereiche hat die Stiftung laut Satzung?",
    options: [
      "Umweltschutz, Klimaschutz, Tierschutz, Bildung",
      "Naturschutz, Umweltschutz, Entwicklungszusammenarbeit, Denkmalpflege",
      "Landwirtschaft, Gewässerschutz, Stadtgrün, Entwicklungshilfe",
      "Artenschutz, Forschung, Öffentlichkeitsarbeit, Sport",
    ],
    correct: 1,
    explanation: "§ 2 der Satzung nennt: Naturschutz, Umweltschutz, Entwicklungszusammenarbeit sowie Denkmalpflege. Diese vier Bereiche definieren den Stiftungszweck.",
  },
  {
    q: "Wofür steht der \"Emsfonds\" als Sondervermögen der Stiftung?",
    options: [
      "Förderung von Fischerei-Projekten in der Nordsee",
      "Verbesserung der ökologischen Gesamtsituation im Ems-Dollart-Gebiet",
      "Finanzierung von Deichbau-Projekten",
      "Unterstützung der Stadt Emden",
    ],
    correct: 1,
    explanation: "Der Emsfonds wurde aus einer Vereinbarung zwischen dem Land Niedersachsen und den Umweltverbänden BUND, NABU und WWF eingerichtet. Ziel: ökologische Verbesserung im Ems-Dollart-Gebiet.",
  },
  {
    q: "Welche Organe hat die Stiftung laut Satzung?",
    options: [
      "Geschäftsführung, Beirat und Mitgliederversammlung",
      "Vorstand, Aufsichtsrat und Hauptversammlung",
      "Vorstand, Kuratorium, Umweltrat und Emsrat",
      "Direktion, Fachausschuss und Förderrat",
    ],
    correct: 2,
    explanation: "Laut § 7 der Satzung sind die vier Organe: Vorstand, Kuratorium, Umweltrat und Emsrat. Alle Organmitglieder sind ehrenamtlich tätig.",
  },
  {
    q: "Wer ist laut Satzung Vorsitzende/r des Kuratoriums?",
    options: [
      "Die Geschäftsführerin / der Geschäftsführer der NBU",
      "Der Ministerpräsident / die Ministerpräsidentin von Niedersachsen",
      "Die amtierende Umweltministerin / der amtierende Umweltminister des Landes",
      "Eine vom Umweltrat gewählte Person",
    ],
    correct: 2,
    explanation: "§ 10 der Satzung: Die/der Vorsitzende des Kuratoriums ist – sofern benannt – die jeweilig amtierende Umweltministerin bzw. der amtierende Umweltminister.",
  },
  {
    q: "Was gilt für den Höchstanteil an Entwicklungszusammenarbeit aus der Landesfinanzhilfe?",
    options: [
      "Mindestens 50 % müssen für Entwicklungszusammenarbeit verwendet werden",
      "Es gibt keine Begrenzung",
      "Höchstens 20 % der Finanzhilfe dürfen für Entwicklungszusammenarbeit verwendet werden",
      "Genau 30 % sind gesetzlich festgelegt",
    ],
    correct: 2,
    explanation: "§ 20 des Niedersächsischen Glücksspielgesetzes (seit 2017): Für Entwicklungszusammenarbeit dürfen höchstens 20 % der Landesfinanzhilfe verwendet werden.",
  },
];
const creativeQuestions = [
  {
    id: "new_area",
    prompt: "💡 Neue Förderbereiche",
    question: "Die NBU fördert Naturschutz, Umwelt, Entwicklungszusammenarbeit und Denkmalpflege. Welchen neuen Förderbereich könntest du dir in Zukunft vorstellen – und warum?",
    placeholder: "z.B. Bildung für nachhaltige Entwicklung, Urban Gardening, Klimaanpassung in Städten ...",
  },
  {
    id: "fundraising",
    prompt: "💰 Fundraising-Ideen",
    question: "Die Haupteinnahmen kommen aus der Bingo-Lotterie. Welche zusätzliche Fundraising-Idee hättest du, um die Stiftung bekannter oder finanziell breiter aufzustellen?",
    placeholder: "z.B. Crowdfunding-Kampagnen, Kooperationen mit Unternehmen, Nachhaltigkeits-Challenges ...",
  },
  {
    id: "pr_message",
    prompt: "📣 Öffentlichkeitsbotschaft",
    question: "Formuliere einen Satz (oder Slogan), den die NBU auf Social Media oder einer Plakatkampagne nutzen könnte:",
    placeholder: "z.B. \"Mit jedem Bingo-Los ein bisschen mehr Natur.\" ...",
  },
];
export default function App() {
  const [phase, setPhase] = useState("intro"); // intro | typology | typology_result | quiz | creative | result
  const [typologyAnswers, setTypologyAnswers] = useState({});
  const [typologyStep, setTypologyStep] = useState(0);
  const [typologyMessage, setTypologyMessage] = useState("");
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [creativeAnswers, setCreativeAnswers] = useState({});
  const totalQuizQuestions = quizQuestions.length;
  const correctCount = quizAnswers.filter((a) => a.correct).length;
  function handleTypologyAnswer(val) {
    const qId = typologyQuestions[typologyStep].id;
    const updated = { ...typologyAnswers, [qId]: val };
    setTypologyAnswers(updated);
    if (typologyStep < typologyQuestions.length - 1) {
      setTypologyStep(typologyStep + 1);
    } else {
      setTypologyMessage(buildTypologyMessage(updated));
      setPhase("typology_result");
    }
  }
  function handleQuizSelect(idx) {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);
    setQuizAnswers([...quizAnswers, { correct: idx === quizQuestions[quizStep].correct }]);
  }
  function handleNextQuiz() {
    setShowFeedback(false);
    setSelectedOption(null);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setPhase("creative");
    }
  }
  const pct = Math.round((correctCount / totalQuizQuestions) * 100);
  const quizRemark =
    pct >= 80 ? "Hervorragend! Du kennst die NBU schon sehr gut. 🌟" :
    pct >= 50 ? "Gut gemacht! Du hast eine solide Grundlage. 👍" :
    "Danke für deine Ehrlichkeit! Jetzt kennst du die wichtigsten Fakten. 🌱";
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${PALE} 0%, #b7e4c7 100%)`, fontFamily: "'Segoe UI', sans-serif", padding: "20px" }}>
      <div style={{ maxWidth: 660, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 40 }}>🎱</div>
          <h1 style={{ color: GREEN, fontSize: 22, fontWeight: 700, margin: "4px 0 2px" }}>Niedersächsische Bingo-Umweltstiftung</h1>
          <p style={{ color: LIGHT_GREEN, fontSize: 14, margin: 0 }}>Dein interaktives Onboarding</p>
        </div>
        {/* INTRO */}
        {phase === "intro" && (
          <Card>
            <h2 style={{ color: GREEN }}>Willkommen! 👋</h2>
            <p>Schön, dass du dabei bist. In den nächsten Minuten lernst du die <strong>Niedersächsische Bingo-Umweltstiftung</strong> kennen – spielerisch, interaktiv und ganz persönlich.</p>
            <p>Das Onboarding besteht aus drei Teilen:</p>
            <div style={{ background: PALE, borderRadius: 10, padding: "12px 16px", margin: "12px 0" }}>
              <Step n="1" label="Kurze persönliche Kennenlernrunde (4 Fragen)" />
              <Step n="2" label="Wissens-Quiz zur NBU (8 Fragen)" />
              <Step n="3" label="Deine kreativen Ideen (3 offene Fragen)" />
            </div>
            <p style={{ fontSize: 13, color: "#666" }}>⏱ Dauer: ca. 10–15 Minuten</p>
            <Btn onClick={() => setPhase("typology")}>Los geht's! 🚀</Btn>
          </Card>
        )}
        {/* TYPOLOGY */}
        {phase === "typology" && (
          <Card>
            <ProgressBar current={typologyStep + 1} total={typologyQuestions.length} label="Kennenlernen" color={ACCENT} />
            <h3 style={{ color: GREEN, marginTop: 16 }}>{typologyQuestions[typologyStep].question}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {typologyQuestions[typologyStep].options.map((opt) => (
                <button key={opt.value} onClick={() => handleTypologyAnswer(opt.value)}
                  style={{ background: "white", border: `2px solid ${LIGHT_GREEN}`, borderRadius: 10, padding: "12px 16px", fontSize: 15, cursor: "pointer", textAlign: "left", transition: "all .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = PALE}
                  onMouseLeave={e => e.currentTarget.style.background = "white"}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Card>
        )}
        {/* TYPOLOGY RESULT */}
        {phase === "typology_result" && (
          <Card>
            <div style={{ fontSize: 48, textAlign: "center" }}>🎉</div>
            <h2 style={{ color: GREEN, textAlign: "center" }}>Schön, dich kennenzulernen!</h2>
            <div style={{ background: `linear-gradient(135deg, ${GREEN}, ${LIGHT_GREEN})`, color: "white", borderRadius: 14, padding: "18px 20px", fontSize: 16, lineHeight: 1.6, margin: "16px 0" }}>
              {typologyMessage}
            </div>
            <p style={{ color: "#555", fontSize: 14 }}>Jetzt geht's weiter mit dem Wissens-Quiz. Keine Sorge – es geht ums Lernen, nicht ums Bewertet-werden!</p>
            <Btn onClick={() => setPhase("quiz")}>Weiter zum Quiz 🎯</Btn>
          </Card>
        )}
        {/* QUIZ */}
        {phase === "quiz" && (
          <Card>
            <ProgressBar current={quizStep + 1} total={totalQuizQuestions} label="Wissens-Quiz" color={GREEN} />
            <h3 style={{ color: GREEN, marginTop: 16 }}>{quizQuestions[quizStep].q}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
              {quizQuestions[quizStep].options.map((opt, idx) => {
                const isCorrect = idx === quizQuestions[quizStep].correct;
                const isSelected = idx === selectedOption;
                let bg = "white", border = `2px solid #ccc`;
                if (showFeedback) {
                  if (isCorrect) { bg = "#d8f3dc"; border = `2px solid ${GREEN}`; }
                  else if (isSelected && !isCorrect) { bg = "#ffe5d0"; border = `2px solid #e76f51`; }
                }
                return (
                  <button key={idx} onClick={() => handleQuizSelect(idx)} disabled={showFeedback}
                    style={{ background: bg, border, borderRadius: 10, padding: "12px 16px", fontSize: 15, cursor: showFeedback ? "default" : "pointer", textAlign: "left", transition: "all .2s" }}>
                    {showFeedback && isCorrect && <span style={{ marginRight: 6 }}>✅</span>}
                    {showFeedback && isSelected && !isCorrect && <span style={{ marginRight: 6 }}>❌</span>}
                    {opt}
                  </button>
                );
              })}
            </div>
            {showFeedback && (
              <div style={{ background: PALE, borderRadius: 10, padding: "12px 14px", marginTop: 14, fontSize: 14, color: "#333" }}>
                <strong>💡 </strong>{quizQuestions[quizStep].explanation}
              </div>
            )}
            {showFeedback && (
              <Btn onClick={handleNextQuiz} style={{ marginTop: 12 }}>
                {quizStep < totalQuizQuestions - 1 ? "Nächste Frage →" : "Weiter zu deinen Ideen 💡"}
              </Btn>
            )}
          </Card>
        )}
        {/* CREATIVE */}
        {phase === "creative" && (
          <Card>
            <div style={{ background: `linear-gradient(135deg, ${GREEN}, ${LIGHT_GREEN})`, color: "white", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 15 }}>
              🎯 Quiz abgeschlossen: <strong>{correctCount}/{totalQuizQuestions} richtig ({pct}%)</strong> – {quizRemark}
            </div>
            <h2 style={{ color: GREEN }}>Deine Ideen zählen! 🌱</h2>
            <p style={{ color: "#555", fontSize: 14 }}>Die NBU lebt von frischen Perspektiven. Was denkst du?</p>
            {creativeQuestions.map((cq) => (
              <div key={cq.id} style={{ marginBottom: 20 }}>
                <label style={{ fontWeight: 600, color: GREEN, display: "block", marginBottom: 6 }}>{cq.prompt}<br />
                  <span style={{ fontWeight: 400, color: "#333", fontSize: 14 }}>{cq.question}</span>
                </label>
                <textarea
                  value={creativeAnswers[cq.id] || ""}
                  onChange={e => setCreativeAnswers({ ...creativeAnswers, [cq.id]: e.target.value })}
                  placeholder={cq.placeholder}
                  rows={3}
                  style={{ width: "100%", borderRadius: 10, border: `2px solid ${LIGHT_GREEN}`, padding: "10px 12px", fontSize: 14, resize: "vertical", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <Btn onClick={() => setPhase("result")}>Abschließen & Ergebnis sehen 🎊</Btn>
          </Card>
        )}
        {/* RESULT */}
        {phase === "result" && (
          <Card>
            <div style={{ textAlign: "center", fontSize: 52 }}>{pct >= 80 ? "🏆" : pct >= 50 ? "🌟" : "🌱"}</div>
            <h2 style={{ color: GREEN, textAlign: "center" }}>Herzlich willkommen im NBU-Team!</h2>
            <div style={{ background: `linear-gradient(135deg, ${GREEN}, ${LIGHT_GREEN})`, color: "white", borderRadius: 12, padding: "16px 18px", marginBottom: 16 }}>
              <strong>Dein Quizergebnis:</strong> {correctCount}/{totalQuizQuestions} richtig ({pct}%)<br />
              <span style={{ fontSize: 14 }}>{quizRemark}</span>
            </div>
            {Object.values(creativeAnswers).some(v => v.trim()) && (
              <div style={{ background: PALE, borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
                <h3 style={{ color: GREEN, marginTop: 0 }}>💡 Deine Ideen</h3>
                {creativeQuestions.map(cq => creativeAnswers[cq.id]?.trim() ? (
                  <div key={cq.id} style={{ marginBottom: 12 }}>
                    <strong style={{ color: GREEN }}>{cq.prompt}</strong>
                    <p style={{ margin: "4px 0 0", fontSize: 14, color: "#333" }}>{creativeAnswers[cq.id]}</p>
                  </div>
                ) : null)}
              </div>
            )}
            <div style={{ background: "white", border: `2px solid ${LIGHT_GREEN}`, borderRadius: 12, padding: "14px 16px", fontSize: 14, color: "#333" }}>
              <strong>📌 Nächste Schritte:</strong>
              <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
                <li>Besuche <a href="https://www.bingo-umweltstiftung.de" target="_blank" style={{ color: GREEN }}>bingo-umweltstiftung.de</a> für aktuelle Projekte</li>
                <li>Schau dir die Förderrichtlinie und aktuelle Ausschreibungen an</li>
                <li>Teile deine kreativen Ideen gerne mit deinem Team!</li>
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
function Card({ children }) {
  return (
    <div style={{ background: "white", borderRadius: 16, padding: "24px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", marginBottom: 20 }}>
      {children}
    </div>
  );
}
function Btn({ onClick, children }) {
  const GREEN = "#2d6a4f";
  return (
    <button onClick={onClick}
      style={{ background: GREEN, color: "white", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 16, fontWeight: 600, cursor: "pointer", width: "100%", marginTop: 8 }}>
      {children}
    </button>
  );
}
function Step({ n, label }) {
  const GREEN = "#2d6a4f";
  const LIGHT_GREEN = "#52b788";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <div style={{ background: GREEN, color: "white", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{n}</div>
      <span style={{ fontSize: 14, color: "#333" }}>{label}</span>
    </div>
  );
}
function ProgressBar({ current, total, label, color }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", marginBottom: 4 }}>
        <span>{label}</span><span>{current}/{total}</span>
      </div>
      <div style={{ background: "#eee", borderRadius: 10, height: 8 }}>
        <div style={{ background: color, borderRadius: 10, height: 8, width: `${(current / total) * 100}%`, transition: "width .3s" }} />
      </div>
    </div>
  );
}
