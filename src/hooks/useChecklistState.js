import { useEffect, useState } from "react";
import { get, set } from "idb-keyval";
import { CHECKLISTS } from "../data/checklists";

// Progress lives in IndexedDB (not localStorage) so the service worker can
// read the same store in the background to build reminder notifications.
const PROGRESS_KEY = "ridingPath.progress.v1";

// progress shape: { [itemId]: true }
export function useChecklistState() {
  const [progress, setProgress] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    get(PROGRESS_KEY).then((stored) => {
      setProgress(stored || {});
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) set(PROGRESS_KEY, progress);
  }, [progress, loaded]);

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

  return { progress, loaded, toggleItem, isDone, getFlatItems, getCurrentItem, getStats };
}

export function getAllChecklists() {
  return CHECKLISTS;
}
