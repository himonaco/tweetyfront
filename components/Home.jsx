import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../reducers/user";
import Tweet from "./Tweet";
// import LastTweets from "./LastTweets";
// import Trends from "./Trends";
// import moment from "moment";

function Home() {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!user.token) {
      router.push("/");
    } else {
      const { token } = user; // Ensure you are destructuring the token from the user object correctly
      fetch(`https://localhost:3000/api/user/${token}`, { // Adjusted the fetch URL to match your backend route structure
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFirstname(data.user.firstname);
          setUsername(data.user.username);
        })
        .catch((error) => console.error('Error fetching user data:', error)); // Added error handling
    }
  }, [user.token]); // Added user.token as a dependency to re-run the effect when it changes

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    router.push("/");
  };

  const [tweetList, setTweetList] = useState([]);
  const tweetStatus = useSelector((state) => state.tweets.value);

  useEffect(() => {
    fetch("https://localhost:3000/api/tweets/all", { // Adjusted the fetch URL to match your backend route structure
      method: 'GET', // Specify the method, assuming your backend expects a GET request
      headers: {
        'Content-Type': 'application/json',
        // Assuming no Authorization needed for this public endpoint, remove if not the case
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTweetList(data.tweets);
      })
      .catch((error) => console.error('Error fetching tweets:', error)); // Added error handling
  }, [tweetStatus]); // Added tweetStatus as a dependency to re-run the effect when it changes

  tweetList.sort((a, b) => b.timestamp - a.timestamp);

  function displayText(str) {
    const words = str.split(" ");
    let newStr = [];
    const startsWithHashtag = /^#/;
    for (let i = 0; i < words.length; i++) {
      if (startsWithHashtag.test(words[i])) {
        newStr.push(
          <span style={{ color: "#1c9cef", cursor: "pointer" }}>
            {words[i]}{" "}
          </span>
        );
      } else {
        newStr.push(<span>{words[i]} </span>);
      }
    }
    return newStr;
  }

  const allTweets = tweetList.map((data, i) => {
    return (
      <LastTweets
        key={i}
        tweetId={data._id}
        firstname={data.author.firstname}
        username={data.author.username}
        token={data.author.token}
        timestamp={moment(data.timestamp).startOf("second").fromNow()}
        tweetText={displayText(data.tweet)}
      />
    );
  });

  return (
    <>
      <div>
        <div>
          <img
            src="/tweet.png"
            alt="tweet"
            onClick={() => router.push("/")}
          />
          <div>
            <div>
              <img src="/user-logo.png" alt="user" />
              <div>
                <h4>{firstname}</h4>
                <h5>@{username}</h5>
              </div>
            </div>
            <button onClick={() => handleSignOut()}>signOut</button>
          </div>
        </div>
        <div>
          <h1>Home</h1>
          <Tweet />
          <div>{allTweets}</div>
        </div>
        <div>
          {/* <h1>Trends</h1>
          <Trends /> */}
        </div>
      </div>
    </>
  );
}

export default Home;
