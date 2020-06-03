require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Nightmare = require('nightmare');
const Subscription = require('./models/subscription');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://maxAdmin:31raCR57qBUTu6Il@cluster0-fbjtg.mongodb.net/tracknest?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to MongoDB Database!!');
  })
  .catch(() => {
    console.log('DB Connection Failed');
  });

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

app.get('/subscriptions', (req, res, next) => {
  // checkPrice().then(prods => {
  //   res.status(200).json({
  //     message: 'GET successful',
  //     subs: prods
  //   })
  // }).catch();

  Subscription.find()
    .then(dbRes => {
      res.status(200).json({
        message: 'Subscriptions fetched successfully',
        subscriptions: dbRes
      })
    }).catch();
});

app.post('/subscriptions', (req, res, next) => {
  checkPrice(req.body.productURL).then(newSub => {
    newSub.save().then(newDbSub => {
      res.status(201).json({
        message: 'Post Successful',
        subscription: {
          subID: newDbSub._id,
          title: newDbSub.title,
          curPrice: newDbSub.curPrice,
          ogPrice: newDbSub.ogPrice,
          imgURL: newDbSub.imgURL,
          productURL: newDbSub.productURL
        }
      });
    }).catch();

  })
});

app.delete('/subscriptions/:id', (req, res, next) => {
  Subscription.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'Post Deleted!' })
  }).catch();
});



async function checkPrice(prodURL) {
  try {
    const nightmare = Nightmare({ show: false })
    const productElements = await nightmare
      .goto(prodURL)
      .wait('#productTitle')
      .evaluate(() => {
        return [
          document.getElementById('productTitle').innerHTML,
          document.getElementById('priceblock_ourprice').innerHTML,
          document.getElementById('landingImage').src
        ]
      })

    const subscription = new Subscription({
      title: productElements[0],
      curPrice: productElements[1],
      ogPrice: productElements[1],
      imgURL: productElements[2],
      productURL: prodURL
    });


    await nightmare.end();

    return subscription

  } catch (e) {
    console.log('checkPrice error');
    throw e;
  }

};

module.exports = app;
