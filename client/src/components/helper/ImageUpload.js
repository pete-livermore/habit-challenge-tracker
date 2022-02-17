import axios from 'axios'
import React from 'react'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

export const ImageUpload = ({ handleImageUrl, value }) => {

  const handleUpload = async event => {
    console.log(event)
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    console.log(res)
    handleImageUrl(res.data.url)
  }

  return (
    <>
      {value ? 
        <><div>
          <img id='add-habit-photo' src={value} alt='pp' />
        </div>
        <label width='100%'>Change File: </label>
        <input
          className='input-pic'
          type='file'
          onChange={handleUpload} /></> :
        <><input
          className='input-pic'
          type='file'
          onChange={handleUpload} /></>
      }
    </>  
  )
}