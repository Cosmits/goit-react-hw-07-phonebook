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


// ======== OLD method ================

// const handlePending = state => {
//   state.isLoading = true;
// };
// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState: defContacts,
//   extraReducers: {
//     [getAllContacts.pending]: handlePending,
//     [addContact.pending]: handlePending,
//     [delContact.pending]: handlePending,
//     [getAllContacts.rejected]: handleRejected,
//     [addContact.rejected]: handleRejected,
//     [delContact.rejected]: handleRejected,
//     [getAllContacts.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.items = action.payload;
//     },
//     [addContact.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.items.push(action.payload);
//     },
//     [delContact.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       const index = state.items.findIndex(
//         contact => contact.id === action.payload.id
//       );
//       state.items.splice(index, 1);
//     }
//   },
// });

export const contactsReducer = contactsSlice.reducer;
