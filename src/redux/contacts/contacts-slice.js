import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContacts: {
      reducer: (state, { payload }) => {
        state.push(payload);
      },
      prepare: payload => ({
        payload: {
          id: nanoid(2),
          ...payload,
        },
      }),
    },
    deleteContacts: (state, { payload }) => {
      return state.filter(({ id }) => id !== payload);
    },
  },
});

export default contactsSlice.reducer;

export const { addContacts, deleteContacts } = contactsSlice.actions;
