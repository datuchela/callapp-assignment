import create from "zustand";

type Store = {
  entries: Entry[];
  setEntries: (entries: Entry[]) => void;
  deleteEntry: (entryId: number) => void;
  addEntry: (entry: EntryWithoutId) => void;
};

const deleteOneEntry = (entries: Entry[], entryId: number) => {
  const oldEntries = [...entries];
  const newEntries = oldEntries.filter((entry) => entry.id !== entryId);
  return newEntries;
};

const addOneEntry = (entries: Entry[], newEntry: EntryWithoutId) => {
  const newEntries = [...entries];
  newEntries.push({ ...newEntry, id: entries.length + 1 });
  return newEntries;
};

const useStore = create<Store>((set) => ({
  entries: [],
  setEntries: (entries) => {
    set((state) => ({
      ...state,
      entries: entries,
    }));
  },
  deleteEntry: (entryId) => {
    set((state) => ({
      ...state,
      entries: deleteOneEntry(state.entries, entryId),
    }));
  },
  addEntry: (entry) => {
    set((state) => ({
      ...state,
      entries: addOneEntry(state.entries, entry),
    }));
  },
}));

export default useStore;

export const useEntries = () =>
  useStore((state) => ({
    entries: state.entries,
    setEntries: state.setEntries,
    deleteEntry: state.deleteEntry,
    addEntry: state.addEntry,
  }));
