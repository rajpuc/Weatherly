import { createSlice} from '@reduxjs/toolkit';


// Define the state type
interface ThemeState {
  darkMode: boolean;
}

// Initial state
const initialState: ThemeState = {
  darkMode: localStorage.getItem("theme") === "dark", 
};

// Create the slice
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    }
  },
});

// Actions
export const { setDarkMode } = themeSlice.actions;

// Reducer
export default themeSlice.reducer;
