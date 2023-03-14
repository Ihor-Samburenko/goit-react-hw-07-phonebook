import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../../shared/api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, thunkAPI) => {
    console.log(thunkAPI.getState());

    try {
      const { data } = await api.getAllContacts();
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteContacts(id);
      return id;
    } catch ({ response }) {
      return rejectWithValue(response);
    }
  }
);

const isDublicate = (contacts, { name, number }) => {
  const normalizedName = name.toLowerCase();
  const dublicate = contacts.find(contact => {
    return (
      contact.name.toLowerCase() === normalizedName && contact.number === number
    );
  });
  return Boolean(dublicate);
};

export const addContacts = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue }) => {
    try {
      const { data: result } = await api.addContacts(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response);
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();
      if (isDublicate(contacts.items, data)) {
        alert(`${data.name} is already exist`);
        return false;
      }
    },
  }
);
