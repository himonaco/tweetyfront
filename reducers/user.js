import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  value: {  firstname: null, username: null, token: null },

};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
    signIn: (state, action) => {
      state.value.username = action.payload.username;
      state.value.token = action.payload.token;
    },
    signOut: (state) => {
        state.value.firstname = null;
        state.value.username = null;
        state.value.token = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;