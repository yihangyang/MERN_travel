import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';

import { Typography, Button, Form, message, Input, Icon } from 'antd';


function FileUpload(props) {
  const [images, setImages] = useState([])
  
  const onDrop = ( files ) => {
    let formData = new FormData()
    const config = {
      header: { 'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])
    axios.post('/api/product/uploadImage', formData, config)
      .then(res => {
        if(res.data.success) {
          setImages([...images, res.data.image])
          props.refreshFunction([...images, res.data.image])

        } else {
          alert("failed to save video in server")
        }
      })
  }

  const onDelete = (image) => {
    const currentIndex = images.indexOf(image)
    let newImages = [...images]
    newImages.splice(currentIndex, 1)

    setImages(newImages)
    props.refreshFunction(newImages)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone
        onDrop={onDrop}
        multiple={false}
        maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            {...getRootProps()}
          >
          <input {...getInputProps()} />
          <Icon type="plus" style={{ fontSize: '3rem' }} />

          </div>
        )}
      </Dropzone>

      <div style={{ display:'flex', width: '350px', height:'240px', overflowX:'scroll'}}>
        {images.map((image, idx) => (
          <div key={idx + image} onClick={() => onDelete(image)}>
            <img style={{ minWidth: '300px', width: '300px', height:'240px' }} src={`http://localhost:5000/${image}`} alt={`product-${idx}`} />
          </div>
        ))}
          
      </div>
    
    </div>
  )
}

export default FileUpload
