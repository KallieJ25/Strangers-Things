import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Profile({ authenticated, userId, token }) {
  const COHORT_NAME = "2209-FTB-ET-WEB-FT";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  const navigate = useNavigate();
  const [allMessages, setAllMessages] = useState([]); // Array to store all messages

  // If not authenticated, redirect to the login page
  useEffect(() => {
    if (authenticated !== true) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        // Extract all messages into a single array with post info
        const messages = data.data.posts
          .filter(
            (post) => post.author._id === userId && post.messages.length > 0
          )
          .flatMap((post) =>
            post.messages.map((message) => ({
              postId: post._id, //adding the id of the post inside messages
              postTitle: post.title, //adding the title of the post inside messages
              message,
            }))
          );

        // Sort messages by date
        const sortedMessages = messages.sort(
          (a, b) =>
            new Date(b.message.createdAt) - new Date(a.message.createdAt)
        );

        setAllMessages(sortedMessages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [BASE_URL, token, userId]);

  return (
    <>
      <div className="container">
        <h1>Profile</h1>

        {allMessages.map(({ postId, postTitle, message }) => (
          <div className="containerMessage" key={message._id}>
            <div className="Content">
              <div className="fromUser">
                <span className="bold-text">From: </span>
                {message.fromUser.username}
              </div>
              <div className="messageDescription">{message.content}</div>
              <div className="viewPost">
                <Link to={`/message/${postId}/casasd`}>
                  View my post: {postTitle}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Profile;
