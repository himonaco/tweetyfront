import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { addTweet } from "../reducers/tweets";
import toast, { Toaster } from "react-hot-toast";

function Tweet() {
  const [tweet, setTweet] = useState("");
  const [token, setToken] = useState("");
  const [timestamp, setTimestamp] = useState(0);

  const user = useSelector((state) => state.user.value);
  const tweetStatus = useSelector((state) => state.tweets.value);

  const dispatch = useDispatch();

  useEffect(() => {
    setToken(user.token);
    setTimestamp(new Date().getTime());
  }, [tweetStatus]);

  // Handle submit button:
  const handleSubmitBtn = () => {
    if (tweet === "") {
      toast.error("Please enter a tweet first !"); // Changed toast to error for better visibility
      return;
    }

    const userData = { token, tweet, timestamp };

    fetch("https://localhost:3000/tweets/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json()) 
      .then((data) => {
        if (data.result) {
          dispatch(addTweet());
          toast.success("Tweet saved !"); // Changed toast to success for positive feedback
          setTweet("");
        } else {
          toast.error("An error occurred while sending the tweet.");
        }
      });
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="What's up ?"
          maxLength="280"
          value={tweet}
          onChange={(input) => setTweet(input.target.value)}
        />
        <div>
          <p>{tweet.length}/280</p>
          <button onClick={() => handleSubmitBtn()}>Tweet</button>
          <Toaster></Toaster>
        </div>
      </div>
    </>
  );
}

export default Tweet;
