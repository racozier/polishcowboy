import { useCallback, useState } from "react";
import { getAllChecklists, useChecklistState } from "./hooks/useChecklistState";
import { useDailyReminders } from "./hooks/useDailyReminders";
import ChecklistView from "./components/ChecklistView";
import { HERO_IMAGES, CHECKLIST_IMAGES } from "./data/images";
import "./App.css";

const LANG_KEY = "ridingPath.lang.v1";
const TAB_KEY = "ridingPath.activeTab.v1";

const STRINGS = {
  appTitle: { pl: "Droga do Instruktora", en: "The Path to Instructor" },
  tagline: {
    pl: "Codzienny krok bliżej Twojego marzenia.",
    en: "One step closer to your dream, every day.",
  },
  progress: { pl: "Postęp", en: "Progress" },
  reminders: { pl: "Przypomnienia", en: "Reminders" },
  enableReminders: { pl: "Włącz powiadomienia", en: "Enable notifications" },
  remindersOn: { pl: "Powiadomienia włączone ✓", en: "Notifications enabled ✓" },
  remindersUnsupported: {
    pl: "Powiadomienia niedostępne w tej przeglądarce",
    en: "Notifications not supported in this browser",
  },
  allDone: {
    pl: "Ukończono! Jesteś gotowy/a. 🐎",
    en: "All done! You're ready. 🐎",
  },
};

const HERO_IMAGE = HERO_IMAGES[0];

function App() {
  const checklists = getAllChecklists();
  const { isDone, toggleItem, getCurrentItem, getStats } = useChecklistState();

  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) || "pl");
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem(TAB_KEY) || checklists[0].id
  );

  const setLangPersist = (l) => {
    setLang(l);
    localStorage.setItem(LANG_KEY, l);
  };
  const setTabPersist = (id) => {
    setActiveTab(id);
    localStorage.setItem(TAB_KEY, id);
  };

  const activeChecklist = checklists.find((c) => c.id === activeTab);
  const currentEntry = getCurrentItem(activeChecklist);
  const stats = getStats(activeChecklist);

  const getReminderPayload = useCallback(() => {
    const checklist = checklists.find((c) => c.id === activeTab) || checklists[0];
    const entry = getCurrentItem(checklist);
    if (!entry) {
      return {
        title: STRINGS.appTitle[lang],
        body: `${checklist.title[lang]}: ${STRINGS.allDone[lang]}`,
      };
    }
    return {
      title: `${checklist.title[lang]} — ${entry.milestone.title[lang]}`,
      body: `${entry.category.title[lang]}: ${entry.item.text[lang]}`,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, lang]);

  const { permission, requestPermission } = useDailyReminders(getReminderPayload);

  return (
    <div className="app">
      <header className="hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="hero-overlay">
          <h1>{STRINGS.appTitle[lang]}</h1>
          <p className="tagline">{STRINGS.tagline[lang]}</p>
          <button
            className="lang-toggle"
            onClick={() => setLangPersist(lang === "pl" ? "en" : "pl")}
          >
            {lang === "pl" ? "🇬🇧 EN" : "🇵🇱 PL"}
          </button>
        </div>
      </header>

      <nav className="tabs">
        {checklists.map((c) => (
          <button
            key={c.id}
            className={`tab ${c.id === activeTab ? "tab-active" : ""}`}
            onClick={() => setTabPersist(c.id)}
            style={{ backgroundImage: `url(${CHECKLIST_IMAGES[c.id]})` }}
          >
            <span className="tab-overlay">{c.title[lang]}</span>
          </button>
        ))}
      </nav>

      <div className="progress-bar-wrap">
        <div className="progress-label">
          {STRINGS.progress[lang]}: {stats.done}/{stats.total} ({stats.pct}%)
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${stats.pct}%` }} />
        </div>
      </div>

      <div className="reminders-box">
        <span>{STRINGS.reminders[lang]}: </span>
        {permission === "unsupported" ? (
          <span>{STRINGS.remindersUnsupported[lang]}</span>
        ) : permission === "granted" ? (
          <span className="reminders-on">{STRINGS.remindersOn[lang]}</span>
        ) : (
          <button onClick={requestPermission}>{STRINGS.enableReminders[lang]}</button>
        )}
      </div>

      {currentEntry ? (
        <div className="current-banner">
          <strong>{currentEntry.milestone.title[lang]}</strong> ·{" "}
          {currentEntry.category.title[lang]} — {currentEntry.item.text[lang]}
        </div>
      ) : (
        <div className="current-banner done">{STRINGS.allDone[lang]}</div>
      )}

      <main>
        <ChecklistView
          checklist={activeChecklist}
          lang={lang}
          isDone={isDone}
          toggleItem={toggleItem}
          currentItemId={currentEntry?.item.id}
        />
      </main>
    </div>
  );
}

export default App;
