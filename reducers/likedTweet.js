import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    value: [],

}

export const likedTweetSlice = createSlice({
  name: 'likedTweets',
  initialState,
  reducers: {
    addLikedTweet: (state, action) => {
      state.value.push(action.payload);
    },
    removeLikedTweet: (state) => {
        state.value = state.value.filter(tweet => tweet.id !== action.payload.id);
    },
  },
});

export const { addLikedTweet, removeLikedTweet } = likedTweetSlice.actions;
export default likedTweetSlice.reducer;