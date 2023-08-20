import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";


function CreateFormPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, SetWillDeliver] = useState(false);
    const COHORT_NAME = "2209-FTB-ET-WEB-FT";
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
    const [userToken, setUserToken] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          title: "",
          password: "",
        },
      });

        //calling API 
        const makePost = async (event) => {
            event.preventDefault();//what is this for?
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
                        'Authorization': `Bearer ${userToken}`
                    },
                    body:JSON.stringify(postData)
                });
                //Posting  and response
                const result = await response.json();
    
                //If the response is ok code will reset to the state to initial values.
            //     if(response.ok) {
            //         setTitle('');
            //         setDescription('');
            //         setPrice('');
            //         setLocation('');
            //         SetWillDeliver(false);
                    
            //     }else{
            //         console.log('Error posting', error);
            // } 
            
            }catch (error){
                console.error(error);
            }
        }
    
            
            // console.log('posted:',{title, content});//why console.log? 
            // setTitle('');
            // setContent('');
    

    return(
        <div>
            <h2>Create New Post</h2>
            
            <form onSubmit={handleSubmit(() => {
                makePost();
              })}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)}/>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                                <div>
                    <label>Price:</label>
                    <input type="text" value={price} onChange={(e)=> setPrice(e.target.value)}/>
                </div>
                                <div>
                    <label>Location:</label>
                    <textarea value={location} onChange={(e) => setLocation(e.target.value)}/>
                </div>
                                <div>
                    <label>Deliver:</label>
                    <input type="checkbox" id="deliver" name="deliver" value={SetWillDeliver(true)}/>
  <label for="deliver"> will be deliver?</label>
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    );        
}

export default CreateFormPost;