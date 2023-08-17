import React from 'react';


 function DropDown( {sortedPost, setSortDirection}) {
return (
    <>
    <div className='sortpost'>
        <label htmlFor = 'sort'>Sort By</label>
        <select 
            id='sort'
            value={sortedPost}
            onChange={(e) => setSortDirection(e.target.value)}>

             <option value='newest'>Newest to Oldest</option>
             <option value='oldest'>Oldest to Newest</option>
        </select>
    </div>
    </>
    )   
}
     

export default DropDown;