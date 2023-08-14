import { useEffect, useState } from "react";
import PostDetails from "./postdetails.jsx";

function Posts() {
  const [posts, setPosts] = useState([]); 
  const [userToken, setUserToken] = useState(''); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [ showPopup, setShowPopup ] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/posts', {
        headers: {
          Authorization: `Bearer ${userToken}`, 
        },
      });
      const data = await response.json();
      setPosts(data.data.posts); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userToken]); 

  const onPost = (postId) => {
    const post = posts.find((post) => post._id === postId);
    setSelectedPost(post);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  const isAuthenticated = userToken && userToken.length > 0;


 return (

    <div className='Post-web'>
      <h1 className='Post-tittle'>Posts</h1>
      <div className='PostBox'>
       <ul>
       {posts.map((post) => (
        <div className="Content" key={post._id}>
          <h2 >{post.title}</h2>
          <p>{post.description}</p>
          {isAuthenticated && (
                <>
                  <p>Price: {post.price}</p>
                  <button onClick={() => onPost(post._id)}>See Details</button>
                  <button>Delete</button>
                  <button>Edit</button>
                </>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
          


        
export default Posts;