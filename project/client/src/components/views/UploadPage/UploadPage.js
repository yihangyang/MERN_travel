import React, { useState, useEffect} from 'react'
import { Typography, Button, message, Form, Input, Icon, Select } from 'antd';
import * as Yup from 'yup';
import { Formik } from 'formik';
import FileUpload from '../../utils/FileUpload'
import axios from 'axios';
import { useSelector } from 'react-redux'

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
let yup = require('yup');

const Continent = [
  { value: 0, label:'Africa'},
  { value: 1, label:'Asia'},
  { value: 2, label:'Europe'},
  { value: 3, label:'America'},
  { value: 4, label:'Australia'},
  { value: 5, label:'Antarctica'},
]

const Catogory = [
  { value: 0, label: "Beach" },
  { value: 1, label: "Thinking" },
  { value: 2, label: "Romantic" },
  { value: 3, label: "Family" },
  { value: 4, label: "Relax" },
]

function UploadVideoPage(props) {
  const user = useSelector(state => state.user)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [continent, setContinent] = useState(0)
  const [categories, setCategories] = useState(0)
  const [images, setImages] = useState([])


  const handleChangeTitle = ( event ) => {
    setTitle(event.currentTarget.value)
  }

  const handleChangeDescription = (event) => {
    setDescription(event.currentTarget.value)
  }

  const handleChangePrice = (event) => {
    setPrice(event.currentTarget.value.replace("^[0-9]*$"))
  }

  const handleChangeContinent = (event) => {
    setContinent(event.currentTarget.value)
  }

  const handleChangeCategory = (event) => {
    setCategories(event.currentTarget.value)
  }

  

  const onSubmit = (e) => {
    e.preventDefault()

    if (title === "" || description === "" || !price ||
        categories === "" || continent === "" || !images ) {
          return alert("Please fill all fields first")
        }

    
    const variables = {
      writer: props.user.userData._id,
      title: title,
      description: description,
      price: price,
      images: images,
      continent: continent,
      category: categories,
    }
    console.log(variables)
    axios.post('/api/product/uploadProduct', variables)
      .then(res => {
        if(res.data.success) {
          alert("Product Uploaded Successfully")
          props.history.push('/')
        } else {
          alert('failed to upload product')
        }
      })
  }

  const updateImages = (newImages) => {
    setImages(newImages)
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} > Upload Video</Title>
      </div>
      <Formik
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
          name: yup.string().required(),
          // name: Yup.string()
          //   .required('Name is required'),
          // lastName: Yup.string()
          //   .required('Last Name is required'),
          // email: Yup.string()
          //   .email('Email is invalid')
          //   .required('Email is required'),
          // password: Yup.string()
          //   .min(6, 'Password must be at least 6 characters')
          //   .required('Password is required'),
          // confirmPassword: Yup.string()
          //   .oneOf([Yup.ref('password'), null], 'Passwords must match')
          //   .required('Confirm Password is required')
        })}
        render={() => (
          <Form>
          <FileUpload refreshFunction={updateImages} />
          <br /><br />
          <label>Title</label>
          <Input
            onChange={handleChangeTitle}
            value={title}
          />
          <br /><br />
          <label>Description</label>
          <TextArea
            onChange={handleChangeDescription}
            value={description}
          />
          <br /><br />
          <label>Price($)</label>
          <Input
            onChange={handleChangePrice}
            value={price}
          />
          <br /><br />
          <div>
            <select onChange={handleChangeContinent} style={{width: '40%', float:'left' }}>
              {Continent.map((item, index) => (
                <option key={index} value={item.value}>{item.label}</option>
              ))}
            </select>
            {/* <br /><br /> */}

            <select onChange={handleChangeCategory} style={{ width: '40%', float:'right' }}>
              {Catogory.map((item, index) => (
                  <option key={index} value={item.value}>{item.label}</option>
              ))}
          </select>
          </div>
          <br /><br />

          <Button type="primary" size="large" onClick={onSubmit} style={{ display:'block', margin:'0 auto' }}>
            Submit
          </Button>
          </Form>
        )}
      />
  </div>
  )
}

export default UploadVideoPage