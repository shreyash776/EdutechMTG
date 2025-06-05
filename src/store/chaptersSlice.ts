import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import chaptersData from "@/data/chapters.json";

interface ChaptersState {
  activeSubject: string;
  selectedClass?: string;
  selectedUnit?: string;
  notStarted: boolean;
  weakChapters: boolean;
  chapters: typeof chaptersData;
}

const initialState: ChaptersState = {
  activeSubject: "Physics",
  selectedClass: undefined,
  selectedUnit: undefined,
  notStarted: false,
  weakChapters: false,
  chapters: chaptersData,
};

const chaptersSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {
    setActiveSubject(state, action: PayloadAction<string>) {
      state.activeSubject = action.payload;
      // Reset class and unit when subject changes
      state.selectedClass = undefined;
      state.selectedUnit = undefined;
    },
    setClass(state, action: PayloadAction<string | undefined>) {
      state.selectedClass = action.payload;
    },
    setUnit(state, action: PayloadAction<string | undefined>) {
      state.selectedUnit = action.payload;
    },
    toggleNotStarted(state) {
      state.notStarted = !state.notStarted;
    },
    toggleWeakChapters(state) {
      state.weakChapters = !state.weakChapters;
    },
  },
});

export const {
  setActiveSubject,
  setClass,
  setUnit,
  toggleNotStarted,
  toggleWeakChapters,
} = chaptersSlice.actions;
export default chaptersSlice.reducer;
