import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
function Message({ token }) {
  const COHORT_NAME = "2209-FTB-ET-WEB-FT";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  const { id } = useParams();
  const [post, setPost] = useState([]);
    // const navigate = useNavigate();
  const [messageInfo, setMessageInfo] = useState("Post not found");
  const [message, setMessage] = useState("");
  const [messageApi, setMessageApi] = useState("");
  const [messageType, setMessageType] = useState("");
  const checkIcon = (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1.1em"
      width="1.1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12" y2="16"></line>
    </svg>
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setPost(data.data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [BASE_URL, token]); // Include id and token in the dependency array

  const handleMessage = async () => {
    const postMessage = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts/${id}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: {
              content: message,
            },
          }),
        });
        const result = await response.json();
        if (result.success === false) {
          setMessageApi("Message could not be sent.");
          setMessageType("danger-color-text danger-div");
        } else {
          setMessageApi("Message was sent successfully!");
          setMessageType("success-alert-text sucess-div");
        }
        return result;
      } catch (err) {
        console.error(err);
      }
    };
    postMessage();
  };

  //delete message after 5 seconds
  useEffect(() => {
    if (messageApi) {
      const timer = setTimeout(() => {
        setMessageApi("");
        setMessageType("");
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [messageApi]);

  const filteredPosts = post.filter((p) => p._id === id);
  return (
    <>
      <div className="alertStyleBox alertMessage">
        {messageApi && (
          <div className={messageType}>
            <span>{messageApi}</span>
          </div>
        )}
      </div>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div className="contentMessage" key={post._id}>
            <div className="container-card-title">
              <div className="card-title">
                <h2 className="titlePost">{post.title}</h2>
                <span className="soldBy">
                  {"Sold By: " + post.author.username}
                </span>
              </div>
              <div className="card-price">
                <span>Price: </span>
                <span
                  className={
                    "postPrice bold-text " +
                    (post.price == "free" ? "free-price" : "")
                  }
                >
                  {post.price}
                </span>
              </div>
            </div>
            <div className="Container-post-description">
              <p className="postDescription">{post.description}</p>
            </div>
            <div className="sendMessage">
              <h3>Message User About This Post </h3>
              <form onSubmit={handleSubmit(handleMessage)}>
                <textarea
                  {...register("message", {
                    required: "This is required.",
                    minLength: {
                      value: 4,
                      message: "Min Length is 4",
                    },
                  })}
                  id=""
                  cols="60"
                  rows="10"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <div className="buttons">
                  {errors.message && (
                    <p className="danger-color-text">
                      {checkIcon}&nbsp;{errors.message?.message}
                    </p>
                  )}
                  <button type="submit" className="loginButton">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))
      ) : (
        <div className="container-Error-Post">
          <div className="errorPost">
            <h2>{messageInfo}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
