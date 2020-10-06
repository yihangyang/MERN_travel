const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require('multer')

const { auth } = require("../middleware/auth");


// upload settings
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg' || ext !=='.png') {
      return cb(res.status(400).end('only .jpg and .png file is allowed to upload'), false)
    }
    cb(null, true)
  }
})

var upload = multer({ storage: storage }).single('file')

//=================================
//             Product
//=================================

router.post("/test", auth, (req, res) => {
  return res.json({ success: true, method: 'http://localhost:3000/api/product/test[GET]'})

});

router.post("/uploadImage", auth, (req, res) => {
  upload(req, res, err => {
    if (err) return res.json({ success: false, err })
    return res.json({ success: true, image: res.req.file.path, filename: res.req.file.filename })
  })
});

router.post("/uploadProduct", auth, (req, res) => {
  const product = new Product(req.body)

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })
});

router.post("/getProducts", auth, (req, res) => {
  Product.find()
    .exec(( err, products ) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, products })
    })
});


module.exports = router;
