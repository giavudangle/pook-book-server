/**
 * Transform plugin => Transform our code to ES6 
 */
require("dotenv/config");
require("@babel/core").transform("code", {
  presets: ["@babel/preset-env"],
});

/**
 * Core Library of App
 */

import express from 'express'
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import os from 'os';
import fs from 'fs'

/**
 * Utils
 */

// Get IP create deep-linking (for push notification Expo)
const networkInterfaces = os.networkInterfaces();
const ip = networkInterfaces.lo0[0].address || '0.0.0.0'


/**
 * Router 
 */

import PRODUCT_ROUTE from './routes/product'
import AUTH_ROUTE from './routes/auth'
import ORDER_ROUTE from './routes/order'
import CART_ROUTE from './routes/cart'
import FAVORITE_ROUTE from './routes/favorite'
import AUTHOR_ROUTE from './routes/author'
import CATEGORY_ROUTE from './routes/category'
import PROVIDER_ROUTE from './routes/provider'
import PUBLISHER_ROUTE from './routes/publisher'


import PUSH_NOTIFICATION from './middlewares/pushNotification'


const dbURI = process.env.DB_C0NNECTION_PRODUCTION ||  process.env.DB_CONNECTION_LOCAL;

const app = express();
//Connect to DB
mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  () => {
    app.listen(process.env.PORT, ip, () => {
      console.log('====================================');
      console.log(`Sever connected at ${ip}:${process.env.PORT}`);
      console.log('====================================');
    })
    let dirPath = path.join(
      __dirname,
      "public/api/static/images/productPictures"
    );
    let dirPathUser = path.join(
      __dirname,
      "public/api/static/images/userPictures"
    );
    createDir(dirPath);
    createDir(dirPathUser);
    console.log('====================================');
    console.log(`Database connected successfully ^^`);
    console.log('====================================');
  }
);

function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }, (err) => {
      if (err) {
        console.error("createDir Error:", err);
      } else {
        console.log("Directory is made!");
      }
    });
  }
}

/**
 * Use our middleware
 */
app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));

/**
 * Router
 */
app.get("/expo", (req, res) => {
  const id = req.query.userid;
  const token = req.query.token;
  console.log(id, token);
  res.writeHead(301, {
    Location: `exp://${ip}:19000/--/ResetPw?userid=${id}&token=${token}`,
  });
  res.end();
});

app.get("/",(req,res)=> {
  res.send("<img width='100%' height='100%' src='https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/151284066_207254161142817_5812038792384707893_n.png?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ULYjP6cA8W0AX9SamJ-&_nc_ht=scontent.fsgn2-1.fna&oh=95c1fd975387814ade2d7f04fa0ead82&oe=609E2BB1'></img>")
})

app.use(`/api/notification`, PUSH_NOTIFICATION);
app.use(`/api/${process.env.VERSION}/products`, PRODUCT_ROUTE);
app.use(`/api/${process.env.VERSION}/users`, AUTH_ROUTE);
app.use(`/api/${process.env.VERSION}/orders`, ORDER_ROUTE);
app.use(`/api/${process.env.VERSION}/carts`, CART_ROUTE);
app.use(`/api/${process.env.VERSION}/favorites`, FAVORITE_ROUTE);
app.use(`/api/${process.env.VERSION}/authors`, AUTHOR_ROUTE);
app.use(`/api/${process.env.VERSION}/categories`, CATEGORY_ROUTE);
app.use(`/api/${process.env.VERSION}/providers`, PROVIDER_ROUTE);
app.use(`/api/${process.env.VERSION}/publishers`, PUBLISHER_ROUTE);



