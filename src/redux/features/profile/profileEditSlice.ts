import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileEditState {
  editing: boolean;
}

const initialState: ProfileEditState = {
  editing: false,
};

const profileEditSlice = createSlice({
  name: "profileEdit",
  initialState,
  reducers: {
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.editing = action.payload;
    },

    resetProfileEdit: (state) => {
      state.editing = false;
    },
  },
});

export const {
  setEditing,
  resetProfileEdit,
} = profileEditSlice.actions;

export default profileEditSlice.reducer;