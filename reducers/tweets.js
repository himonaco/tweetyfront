import { createSlice } from '@reduxjs/toolkit';

const initialState = {

value: [],
}

export const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    allTweets: (state,action) => {
      state.value = action.payload;
    },
    addTweet: (state, action) => {
      state.value.push(action.payload);
    },
    removeTweet: (state) => {
        state.value = state.value.filter(tweet => tweet.id !== action.payload.id);
    },
  },
});

export const { allTweets, addTweet, removeTweet } = tweetSlice.actions;
export default tweetSlice.reducer;