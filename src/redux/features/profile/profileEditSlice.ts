import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileEditState {
  editing: boolean;
  image: File | null;
  preview: string | null;
}

const initialState: ProfileEditState = {
  editing: false,
  image: null,
  preview: null,
};

const profileEditSlice = createSlice({
  name: "profileEdit",
  initialState,
  reducers: {
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.editing = action.payload;
    },

    setImage: (state, action: PayloadAction<File | null>) => {
      state.image = action.payload;
    },

    setPreview: (state, action: PayloadAction<string | null>) => {
      state.preview = action.payload;
    },

    resetProfileEdit: (state) => {
      state.editing = false;
      state.image = null;
      state.preview = null;
    },
  },
});

export const {
  setEditing,
  setImage,
  setPreview,
  resetProfileEdit,
} = profileEditSlice.actions;

export default profileEditSlice.reducer;
