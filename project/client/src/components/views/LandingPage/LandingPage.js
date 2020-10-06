import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Icon, Button, Row, Col, Card } from 'antd'
import ImageSlider from '../../utils/ImageSlider'
const { Meta } = Card

function LandingPage() {
  const [products, setproducts] = useState([])
  useEffect(() => {
    axios.post('/api/product/getProducts')
      .then(res => {
        if (res.data.success) {
          setproducts(res.data.products)
          console.log(res.data.products)
        } else {
          alert('Falied to fetch product data')
        }
      })
  }, [])

  
  return (
    <div style={{ width: '75%', margin: '3rem auto'}}>
      
    </div>
  )
}

export default LandingPage
