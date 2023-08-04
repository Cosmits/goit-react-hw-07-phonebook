const { createSlice } = require('@reduxjs/toolkit');

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilterSlice(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setFilterSlice } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
