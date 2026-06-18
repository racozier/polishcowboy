import { useEffect, useState } from "react";
import { CHECKLISTS } from "../data/checklists";

const STORAGE_KEY = "ridingPath.progress.v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// progress shape: { [itemId]: true }
export function useChecklistState() {
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const toggleItem = (itemId) => {
    setProgress((prev) => {
      const next = { ...prev };
      if (next[itemId]) delete next[itemId];
      else next[itemId] = true;
      return next;
    });
  };

  const isDone = (itemId) => Boolean(progress[itemId]);

  // Returns flattened list of {milestone, category, item} in order, plus stats.
  const getFlatItems = (checklist) => {
    const flat = [];
    checklist.milestones.forEach((milestone) => {
      milestone.categories.forEach((category) => {
        category.items.forEach((item) => {
          flat.push({ milestone, category, item });
        });
      });
    });
    return flat;
  };

  const getCurrentItem = (checklist) => {
    const flat = getFlatItems(checklist);
    return flat.find(({ item }) => !isDone(item.id)) || null;
  };

  const getStats = (checklist) => {
    const flat = getFlatItems(checklist);
    const total = flat.length;
    const done = flat.filter(({ item }) => isDone(item.id)).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  return { progress, toggleItem, isDone, getFlatItems, getCurrentItem, getStats };
}

export function getAllChecklists() {
  return CHECKLISTS;
}
