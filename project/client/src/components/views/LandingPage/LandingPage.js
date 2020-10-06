import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Icon, Button, Row, Col, Card } from 'antd'
import ImageSlider from '../../utils/ImageSlider'
const { Meta } = Card

function LandingPage() {
  const [products, setproducts] = useState([])
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(6)
  // only if postsize = 8 => show load more data button
  const [postsize, setPostsize] = useState(0)

  useEffect(() => {
    const variables = {
      skip: skip,
      limit: limit
    }
    getProducts(variables)
  }, [])

  const getProducts = (variables) => {
    axios.post('/api/product/getProducts', variables)
      .then(res => {
        if (res.data.success) {
          setproducts([...products, ...res.data.products])
          setPostsize(res.data.postsize)
        } else {
          alert('Falied to fetch product data')
        }
      })
  }

  const renderCards = products.map((product, idx) => {
    return (
      <Col key={product + idx} lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
          style={{ height: '250px' }}
        >
          <Meta
            title={product.title}
            description={`$${product.price}`}
          />
        </Card>
      </Col>
    )
  })

  const onLoadMore = () => {
    let newSkip = skip + limit
    const variables = {
      skip: newSkip,
      limit: limit
    }
    getProducts(variables)
    setSkip(newSkip)
  }
  
  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>  Los geht  </h2>
      </div>


{/* 
    <Row gutter={[16, 16]}>
        <Col lg={12} xs={24} >
            <CheckBox
                list={continents}
                handleFilters={filters => handleFilters(filters, "continents")}
            />
        </Col>
        <Col lg={12} xs={24}>
            <RadioBox
                list={price}
                handleFilters={filters => handleFilters(filters, "price")}
            />
        </Col>
    </Row> */}


    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

      {/* <SearchFeature
          refreshFunction={updateSearchTerms}
      /> */}

    </div>


    {products.length === 0 ?
      (
        <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
          <h2>No post yet...</h2>
        </div>
      ) :
      (
        <div>
          <Row gutter={[16, 16]}>
            {renderCards}
          </Row>
        </div>
      )
    }
    <br /><br />
    {
      
      postsize >= limit && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={onLoadMore}>Load More</Button>
        </div>
      )
    }
  </div>
  )
}

export default LandingPage
