import { useEffect, useRef } from "react";

export default function ChecklistView({ checklist, lang, isDone, toggleItem, currentItemId }) {
  const currentRef = useRef(null);

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [checklist.id]);

  return (
    <div className="checklist-view">
      {checklist.milestones.map((milestone) => (
        <section key={milestone.id} className="milestone">
          <h2 className="milestone-title">{milestone.title[lang]}</h2>
          {milestone.categories.map((category) => (
            <div key={category.id} className="category">
              <h3 className="category-title">{category.title[lang]}</h3>
              <ul className="item-list">
                {category.items.map((item) => {
                  const done = isDone(item.id);
                  const isCurrent = item.id === currentItemId;
                  return (
                    <li
                      key={item.id}
                      ref={isCurrent ? currentRef : null}
                      className={[
                        "item",
                        done ? "item-done" : "",
                        isCurrent ? "item-current" : "",
                      ].join(" ")}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => toggleItem(item.id)}
                        />
                        <span className="item-text">{item.text[lang]}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
