import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../reducers/tweets";
import toast, { Toaster } from "react-hot-toast";

//# Component:
function LastTweets(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const dispatch = useDispatch();

  const activeUser = useSelector((state) => state.activeUser.value);

  //! Handle like:
  const handleLike = (button) => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    button.target.style.color = isLiked ? "white" : "red";
  };

  //! Handle delete:
  const handleDelete = () => {
    fetch(`https://localhost:3000/api/tweets/delete/${props.tweetId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => dispatch(changeState()))
      .then(() => toast.success("The tweet has been successfully deleted"));
  };

  //! Hide trash:
  let trash = null;
  if (activeUser.token === props.token) {
    trash = <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />;
  }

  return (
    <>
      <div key={props.key}>
        <div>
          <img src="/user-logo.png" alt="" />
          <div>
            <h4>
              {props.firstname}{" "}
              <span style={{ color: "grey" }}>
                @{props.username} - {props.timestamp}
              </span>
            </h4>
          </div>
        </div>
        <div>
          <p>{props.tweetText}</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faHeart} onClick={handleLike} />
          <p>{likeCount}</p>
          {trash}
        </div>
      </div>
    </>
  );
}

export default LastTweets;
