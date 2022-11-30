import create from "zustand";

type Store = {
  entries: Entry[];
  setEntries: (entries: Entry[]) => void;
  deleteEntry: (entryId: number) => void;
};

const deleteOneEntry = (entries: Entry[], entryId: number) => {
  const oldEntries = [...entries];
  const newEntries = oldEntries.filter((entry) => entry.id !== entryId);
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
}));

export default useStore;

export const useEntries = () =>
  useStore((state) => ({
    entries: state.entries,
    setEntries: state.setEntries,
    deleteEntry: state.deleteEntry,
  }));
