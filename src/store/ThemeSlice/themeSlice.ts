import { createSlice } from "@reduxjs/toolkit";

type Theme = {
  mode: "dark" | "light";
};
const initialState: Theme = {
  mode: "light",
};
const themeSlice = createSlice({
  name: "theme",//name use in store
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});
export const {toggleTheme}=themeSlice.actions;
export default themeSlice.reducer;