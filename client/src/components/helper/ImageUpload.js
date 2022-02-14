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
          <img src={value} alt='pp' />
        </div>
        <label>Picture</label>
        <input
          className='input'
          type='file'
          onChange={handleUpload} /></> :
        <><label>Picture</label><input
          className='input'
          type='file'
          onChange={handleUpload} /></>
      }
    </>  
  )
}