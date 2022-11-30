import create from "zustand";

type Store = {
  entries: Entry[];
  newEntry: Entry;
  addEntry: () => void;
  setNewEntry: (entry: Entry) => void;
};

const emptyEntry: Entry = {
  id: 0,
  name: "",
  email: "",
  gender: "male",
  address: {
    street: "",
    city: "",
  },
  phone: "",
};

const useStore = create<Store>((set) => ({
  entries: [],
  newEntry: emptyEntry,
  addEntry() {
    set((state) => ({
      ...state,
      entries: addEntry(state.entries, state.newEntry),
      newEntry: emptyEntry,
    }));
  },
  setNewEntry(entry: Entry) {
    set((state) => ({
      ...state,
      newEntry: entry,
    }));
  },
}));

function addEntry(entries: Entry[], newEntry: Entry) {
  entries.push(newEntry);
  return entries;
}
