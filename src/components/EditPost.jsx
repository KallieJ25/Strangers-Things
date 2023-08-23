import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

function EditPost({ token }){
    const COHORT_NAME = "2209-FTB-ET-WEB-FT";
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
    const [post, setPost] = useState([]);
    const { postId }= useParams();
   


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

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch(`${BASE_URL}/posts`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
    
            const data = await response.json();
            setPost(data.data.posts);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPosts();
      }, [BASE_URL, token]); 

        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [price, setPrice] = useState('');
        const [location, setLocation] = useState('');
        const [willDeliver, setWillDeliver] = useState(false);


        const filteredPosts = post.filter((p) => p._id === postId);
        useEffect(() => {
        if (filteredPosts.length > 0) {
          setTitle(filteredPosts[0]?.title || '');
          setDescription(filteredPosts[0]?.description  ||'');
          setPrice(filteredPosts[0]?.price || '');
          setLocation(filteredPosts[0]?.location  || '');
          setWillDeliver(filteredPosts[0]?.willDeliver || false);
        }
      }, [post, postId]);

        

    
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          title: title,
          description: description,
          price: price,
          location: location,
          willDeliver: false,
        }
      });
      console.log(title)
   
    const handleSave = async () => {
        const postData={
            post:{
                title :title || filteredPosts[0]?.title,
                description: description || filteredPosts[0]?.description,
                price: price || filteredPosts[0]?.price,
                location: location || filteredPosts[0]?.location,
                willDeliver: willDeliver !== undefined ? willDeliver : filteredPosts[0]?.willDeliver
            }

        }         
        if(title === ""){ setTitle(filteredPosts [0]?.title)
            }else if(description === ""){setDescription(filteredPosts [0]?.description)
             }else if(price === ""){setPrice(filteredPosts[0]?.price)
               }else if(location === ""){setLocation(filteredPosts[0]?.location)
                } else if(willDeliver === false){setWillDeliver(filteredPosts[0]?.willDeliver)}
        


       

        try {
            const response = await fetch(`${BASE_URL}/posts/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(postData)
            });
            const result = await response.json();
            
            if (response.ok) {
                // Maybe refresh the posts or do some other operation
                navigate('/Posts'); 
            }
            console.log(result);
            return result
        } catch (error) {
            console.error(err);
        }
    } 

    const handleCancel = () => {
        navigate('/Posts'); 
    }

    

    return (

        <>
      
            
           
            <div className='editContainerForm' key={post._id}>

            <div className="containerform">

            <form id="form-post" onSubmit={handleSubmit(() => {
                handleSave();
              })}>

                <div className='inputstyle'>
                <input name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className='inputstyle'>
                <textarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder={post.description}></textarea>
                </div>

                <div className='inputstyle'>
                <input name='price' value={price} onChange={(e) => setPrice(e.target.value)} placeholder={post.price} />
                </div>

                <div className='inputstyle'>
                <input name="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={post.location} />
                </div>
                <div className='inputstyle'>
                <input type="checkbox" name="willDeliver" checked={willDeliver} onChange={(e) => setWillDeliver(e.target.checked)} /> Deliver 
                </div>
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="submit" >Save</button>
            </form>
        </div>
            </div>
        
        </>
    );
}

export default EditPost;
