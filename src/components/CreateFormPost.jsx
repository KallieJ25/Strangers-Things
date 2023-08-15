import React from "react";
import { useState } from "react";


const CreatePostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log('posted:',{title, content});
        setTitle('');
        setContent('');
    };
    return(
        <div>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={handleTitleChange}/>
                </div>
                <div>
                    <label>Content</label>
                    <textarea value={content} onChange={handleContentChange}/>
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    );        
}

export default CreatePostForm;