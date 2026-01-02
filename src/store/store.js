import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice";
import skillsReducer from "../features/skills/skillsSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    skills: skillsReducer,
  },
});
