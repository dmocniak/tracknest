require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nightmare = require('nightmare')()
// const mongoose = require('mongoose');

// const Post = require('./models/post');

const app = express();

app.use(bodyParser.json());

const products = [
  {
    title: '',
    curPrice: '',
    ogPrice: '120.51',
    imgURL: '',
    productURL: 'https://www.amazon.com/dp/B01F46RPS4/'
  }
];

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// app.post('/posts', (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   post.save().then(newPost => {
//     res.status(201).json({
//       message: 'Post successful',
//       postID: newPost._id
//     });
//   })
// });

app.get('/subscriptions', (req, res, next) => {
  checkPrice().then(prods => {
    res.status(200).json({
      message: 'GET successful',
      subs: prods
    }
    )
  }).catch();

  // Post.find()
  //   .then(dbRes => {
  //     res.status(200).json({
  //       message: 'Posts fetched successfully',
  //       posts: dbRes
  //     })
  //   }).catch();
});

// app.delete('/posts/:id', (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     res.status(200).json({ message: 'Post Deleted!' })
//   })
// });



async function checkPrice() {
  try {

    const productElements = await nightmare
      .goto('https://www.amazon.com/dp/B00IDCSQF8/')
      .wait('#priceblock_ourprice')
      .evaluate(() => {
        return [
          document.getElementById('landingImage').src,
          document.getElementById('productTitle').innerHTML,
          document.getElementById('priceblock_ourprice').innerHTML
        ]
      })
      .end();
    console.log('nightmare finished');
    const productImg = productElements[0];
    const productTitle = productElements[1];
    const priceNumber = parseFloat(productElements[2].replace('$', ''));

    products[0].imgURL = productImg;
    products[0].title = productTitle;
    products[0].curPrice = priceNumber;

    console.log(parseFloat(productElements[2].replace('$', '')));


    return products


  } catch (e) {
    console.log('checkPrice error');
    throw e;
  }
};

module.exports = app;
