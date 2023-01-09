import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: { toggleForm: false },
  update: { toggleForm: false },
};

export const ReducerSlice = createSlice({
  name: "halaqa_metrah",
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
    updateAction: (state) => {
      state.update.toggleForm = !state.update.toggleForm;
    },
  },
});

export const { toggleChangeAction, updateAction } = ReducerSlice.actions;

export default ReducerSlice.reducer;
