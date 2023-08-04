import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, delContact, getAllContacts } from './thunk';

const defContacts = {
  items: [],
  isLoading: false,
  error: null,
};

const getActions = type =>
  isAnyOf(getAllContacts[type], addContact[type], delContact[type]);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: defContacts,
  extraReducers: builder =>
    builder
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(delContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      //================================================================
      .addMatcher(getActions('pending'), state => {
        state.isLoading = true;
      })
      .addMatcher(getActions('rejected'), (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
      })
      .addMatcher(getActions('fulfilled'), state => {
        state.isLoading = false; 
        state.error = null; 
      }),
});

export const { setContactSlice, delContactSlice } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
