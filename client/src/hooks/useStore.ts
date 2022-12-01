import create from "zustand";

type Store = {
  entries: Entry[];
  currentEntryId: number | null;
  isAddModal: boolean;
  isEditModal: boolean;
  setCurrentEntryId: (id: number) => void;
  setIsEditModal: (bool: boolean) => void;
  setIsAddModal: (bool: boolean) => void;
  setEntries: (entries: Entry[]) => void;
  deleteEntry: (entryId: number) => void;
  addEntry: (entry: EntryWithoutId) => void;
  editEntry: (entry: Entry) => void;
};

const deleteOneEntry = (entries: Entry[], entryId: number) => {
  const oldEntries = [...entries];
  const newEntries = oldEntries.filter((entry) => entry.id !== entryId);
  return newEntries;
};

const addOneEntry = (entries: Entry[], newEntry: EntryWithoutId) => {
  const newEntries = [...entries];
  newEntries.push({ ...newEntry, id: entries[entries.length - 1].id + 1 });
  return newEntries;
};

const editOneEntry = (entries: Entry[], editedEntry: Entry) => {
  const entriesCopy = [...entries];
  const filteredEntries = entriesCopy.filter((entry) => entry.id !== editedEntry.id);
  filteredEntries.push(editedEntry);
  const sortedEntries = filteredEntries.sort((a, b) => a.id - b.id); // sorting array before returning it
  return sortedEntries;
};

const useStore = create<Store>((set) => ({
  entries: [],
  currentEntryId: null,
  isAddModal: false,
  isEditModal: false,
  setCurrentEntryId: (id) => {
    set((state) => ({
      ...state,
      currentEntryId: id,
    }));
  },
  setIsEditModal: (bool) => {
    set((state) => ({
      ...state,
      isEditModal: bool,
    }));
  },
  setIsAddModal: (bool) => {
    set((state) => ({
      ...state,
      isAddModal: bool,
    }));
  },
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
  editEntry: (entry) => {
    set((state) => ({
      ...state,
      entries: editOneEntry(state.entries, entry),
    }));
  },
}));

export const useEntries = () =>
  useStore((state) => ({
    entries: state.entries,
    currentEntryId: state.currentEntryId,
    setCurrentEntryId: state.setCurrentEntryId,
    setEntries: state.setEntries,
    deleteEntry: state.deleteEntry,
    addEntry: state.addEntry,
    editEntry: state.editEntry,
  }));

export const useModals = () =>
  useStore((state) => ({
    isAddModal: state.isAddModal,
    setIsAddModal: state.setIsAddModal,
    isEditModal: state.isEditModal,
    setIsEditModal: state.setIsEditModal,
  }));

export default useStore;
