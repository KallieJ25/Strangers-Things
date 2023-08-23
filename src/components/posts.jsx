import { useEffect, useState } from "react";
import DropDown from "./sortdropdown";
import { Link, useNavigate } from "react-router-dom";
import CreatePost from "./CreatePost";

function Posts({ authenticated, token, userId }) {
  const [posts, setPosts] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [userIdLogin, setUserIdLogin] = useState("");
  const [sortDirection, setSortDirection] = useState("newest");
  const [createdPost, setCreatedPost] = useState(false);
  const [message,setMessage] = useState("");
  const [messageType,setMessageType] = useState("");
  const navigate = useNavigate();

  //calling the API
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/posts",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      //Response
      const data = await response.json();
      setPosts(data.data.posts);
      // sorting post by newest to old || oldest to newest
      const sortedPost = data.data.posts.sort((a, b) =>
        sortDirection === "newest"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      );
      setPosts(sortedPost);
    } catch (error) {
      console.error(error);
    }
  };

 


  useEffect(() => {
    fetchPosts();
  }, [createdPost, sortDirection]);

  useEffect(() => {
    if (authenticated) {
      setUserToken(token);
      setUserIdLogin(userId);
    }
  }, [authenticated, setUserIdLogin, setUserToken, token, userId]);


  useEffect(() => {
    if(createdPost){
      fetchPosts();
      setCreatedPost(false);
    }
  }, [createdPost]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

 

  //deleting post component
  const deletePost = async (postId) => {
    try {
      const response = await fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }); 

      if(response.ok){
        setMessage("the Post was deleted successfully");
        setMessageType("success-alert-text sucess-div");
        
                   
      }
      const updatedPosts = posts.map(post => post.id == postId ? {...post, isActive: false} : post);
      setPosts(updatedPosts);
      //refetch calling fetchPosts to update component.
      fetchPosts();
    } catch (error) {
      console.error('there was a problem deleting the post', error)
    }
  };
 
 
    

  const handleEditClick = (post) => {
    navigate(`/edit-post/${post._id}`);
}


  return (
    <>
    <div className="alertStyleBox alertMessage">
        {message && (
          <div className={messageType}>
            <span>{message}</span>
          </div>
        )}
      </div>
    
    {authenticated ? (
      <CreatePost authenticated={authenticated} token={token} createdPost={createdPost} setCreatedPost= {setCreatedPost}/> 
    ) : ('')
    }
      
      <div className="ContainerSearchBar">
        <div className="seacrBarInput">
          <label htmlFor="search" id="searchLabel">
            Search:
          </label>
          &nbsp;
          <input
            type="text"
            name="search"
            placeholder="owner, title or description"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="Post-web">
        <h1 className="Post-tittle">Posts</h1>
        <div className="Filter">
          <div className="container-Filter">
            <DropDown
              sortedPost={sortDirection}
              setSortDirection={setSortDirection}
            />
          </div>
        </div>
        <div>
        
        </div>
        <div className="PostBox">
          {posts
            .filter((post) => {
              if (searchInput === "") {
                return post;
              } else if (
                post.author.username
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                post.description
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
              ) {
                return post;
              }
            })
            .map((post) => (
              <div className="Content" key={post._id}>
                <div className="container-card-title">
                  <div className="card-title">
                    <h2 className="titlePost">{post.title}</h2>
                    <p className="soldBy">
                      <span className="bold-text">
                      Sold By:&nbsp;
                    </span>
                    {post.author.username}
                    </p>
                    
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
                <div>
                  <p><span className="bold-text">Location:&nbsp;</span>{post.location}</p>
                  <p> <span className="bold-text"> Will be deliver:&nbsp;</span>
                     {post.willDeliver ? "Yes" : "No"}</p>
                </div>
                <div className="Container-post-description">
                  <p className="postDescription">{post.description}</p>
                </div>
                <div className="buttons">
                  {authenticated && post.author._id === userIdLogin ? (
                    
                    <div className="buttonsPost">
                      <button className="deletePost" onClick={() => deletePost(post._id)}>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          version="1.2"
                          baseProfile="tiny"
                          viewBox="0 0 24 24"
                          height="1.3em"
                          width="1.3em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9 9-4.038 9-9-4.037-9-9-9zm0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zM12.707 12l2.646-2.646c.194-.194.194-.512 0-.707-.195-.194-.513-.194-.707 0l-2.646 2.646-2.646-2.647c-.195-.194-.513-.194-.707 0-.195.195-.195.513 0 .707l2.646 2.647-2.646 2.646c-.195.195-.195.513 0 .707.097.098.225.147.353.147s.256-.049.354-.146l2.646-2.647 2.646 2.646c.098.098.226.147.354.147s.256-.049.354-.146c.194-.194.194-.512 0-.707l-2.647-2.647z"></path>
                        </svg>
                        Delete
                      </button>


                        <Link to = {`/edit-post/${post._id}`}
                        className="editPost">
                          <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 1024 1024"
                          height="1.3em"
                          width="1.3em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                        </svg>{" "}
                        Edit
                        </Link>
                    
                      
                    </div>
                  ) : (
                    <div className="buttons">
                      {authenticated ? (
                        <Link
                          to={`/message/${post._id}`}
                          className="sendMessageButton loginButton"
                          id={"see-" + post._id}
                          name="see"
                        >
                          Send message
                        </Link>
                      ) : (
                        <Link
                          to={`/login`}
                          className="sendMessageButton loginButton loginNeedMessage"
                          name="login"
                        >
                          Login to send a message
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default Posts;
