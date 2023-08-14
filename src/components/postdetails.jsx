import React from 'react';


const PostDetails = ({ selectedPost, onClose }) => {
  return (
    <div className='pop-up'>
      <div className='pop-content'>
        <h3>{selectedPost.title}</h3>
        <p>{selectedPost.description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PostDetails;
