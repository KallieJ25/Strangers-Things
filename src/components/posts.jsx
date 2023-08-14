import { useEffect, useState } from "react";
import PostDetails from "./postdetails.jsx";

function Posts() {
  const [posts, setPosts] = useState([]); // State for storing posts
  const [userToken, setUserToken] = useState(''); // State for user 
  const [selectedPost, setSelectedPost] = useState(null);
  const [ showPopup, setShowPopup ] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/posts', {
        headers: {
          Authorization: `Bearer ${userToken}`, // Space added after 'Bearer'
        },
      });
      const data = await response.json();
      setPosts(data.data.posts); // Assuming that the API returns an object with a 'data' property containing 'posts'
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

  const closePopup = () =>
    setShowPopup(false);


 return (

    <div className='Post-web'>
      <h1 className='Post-tittle'>Posts</h1>
      <div className='PostBox'>
       <ul>
       {posts.map((post) => (
        <div className="Content" key={post._id}>
          <h2 >{post.title}</h2>
          <p>{post.description}</p>
          <p>Price: {post.price}</p>
            <button onClick={() => onPost(post._id)}>See Details</button>
            <button>Delete</button>
            <button>Edit</button>
         </div>
       ))}
      </ul>
    </div>

    {showPopup && selectedPost && (
      <PostDetails selectedPost={selectedPost} onClick={closePopup} />
      
      
      )}
     </div>
   );
}


        
export default Posts;






