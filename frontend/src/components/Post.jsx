import React from 'react'

const Post = ({base64String,name}) => {
  return (
    <div className='post-card'>   
     <img src={`data:image/png;base64,${base64String}` } alt="datas" width="300"/>
        <div className='name'>{name}</div>
    </div>
  )
}

export default Post