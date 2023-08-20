import {React, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
function CreatePost({authenticated, token, setCreatedPost}){
      const navigate = useNavigate();
      const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);
    const [message,setMessage] = useState("");
    const [messageType,setMessageType] = useState("");

      const COHORT_NAME = "2209-FTB-ET-WEB-FT";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
      useEffect(()=>{
if(!authenticated){
        navigate("/");
    }
      }, [navigate]);

      //delete message after 5 seconds
  
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

        const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          title: "",
          description: "",
          price: "",
          location: "",
          willDeliver: false,
        },
      });

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

            const makePost = async () => {

            const postData={
                post:{
                    title :title,
                    description: description,
                    price: price,
                    location: location,
                    willDeliver: willDeliver
                }
            }
            try {
                const response = await fetch(`${BASE_URL}/posts`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body:JSON.stringify(postData)
                });
                //Posting  and response
                const result = await response.json();
                console.log(result);
                //If the response is ok code will reset to the state to initial values.
                if(response.ok) {
                    setMessage("the Post was created successfully");
                    setMessageType("success-alert-text sucess-div");
                    document.getElementById("form-post").reset();
                    setTitle("");
                    setDescription("");
                    setPrice("");
                    setLocation("");
                    setWillDeliver(false);
                   setCreatedPost(true);
                    
                }else{
                    setMessage("Post could not be created.");
                    setMessageType("danger-color-text danger-div");
            } 
            
            }catch (error){
                console.error(error);
            }
        }
 return(
        <div>
        <div className="alertStyleBox alertMessage">
        {message && (
          <div className={messageType}>
            <span>{message}</span>
          </div>
        )}
      </div>
           <div className="container">

           <h2>Create New Post</h2>

            <div className="containerform">
            <form id="form-post" onSubmit={handleSubmit(() => {
                makePost();
              })}>
                <div className="inputstyle">
                    <label>Title:</label>
                    <input type="text" {...register('title',{
                        required: "This is required.",
                        minLength: {
                      value: 4,
                      message: "Min Lengt is 4",
                    },
                    })}
                     value={title} onChange={(e)=> setTitle(e.target.value)}/>
                     {errors.title && (
                <p className="danger-color-text">
                  {checkIcon}&nbsp;{errors.title?.message}
                </p>
              )}
                </div>
                <div className="inputstyle">
                    <label>Description:</label>
                    <textarea value={description} {...register("description", {
                      required: "This is required.",
                      minLength: {
                        value: 4,
                        message: "Min Lengt is 4",
                      },
                    })} onChange={(e) => setDescription(e.target.value)} rows="4" cols="50"/>
                    {errors.description && (
                <p className="danger-color-text">
                  {checkIcon}&nbsp;{errors.description?.message}
                </p>
              )}
                </div>
                <div className="inputstyle">
                    <label>Price:</label>
                    <input type="text" {...register('price',{
                        required: "This is required.",
                        minLength: {
                      value: 1,
                      message: "Min Lengt is 1",
                    },
                    })} value={price} onChange={(e)=> setPrice(e.target.value)}/>
                    {errors.price && (
                <p className="danger-color-text">
                  {checkIcon}&nbsp;{errors.price?.message}
                </p>
              )}
                </div>
                <div className="inputstyle">
                    <label>Location:</label>
                    <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)}/>
                </div>
                <div>
                    <input type="checkbox" id="deliver" name="deliver"  checked={willDeliver} onChange={(e) => setWillDeliver(e.target.checked)}/>
                    <label> will be deliver?</label>
                </div>
                <button type='submit'className="sendMessageButton loginButton">Create</button>
            </form>
            </div>
           
            
            
        </div>
           </div>
           
    );        
}

export default CreatePost;