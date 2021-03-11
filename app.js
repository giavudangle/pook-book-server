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
const networkInterfaces = os.networkInterfaces();
const ip = networkInterfaces.lo0[0].address
const dbURI = process.env.DB_CONNECTION;


/**
 * Router 
 */

import PRODUCT_ROUTE from './routes/product'
//const  = require('./routes/product')

const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const favoriteRoute = require("./routes/favorite");
const authRoute = require("./routes/auth");
const notification = require("./middlewares/notification");

const Root = () => {
  const app = express();
  //Connect to DB
  mongoose.connect(
    dbURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => {
      app.listen(process.env.PORT, ip,() => {
          console.log('====================================');
          console.log(`Sever connected at ${ip}/${process.env.PORT}`);
          console.log('===================================='); 
      })
      let dirPath = path.join(
        __dirname,
        "public/api/static/images/productPictures"
      );
      let dirPathUser = path.join(
        __dirname,
        "public/api/static/images/userprofile"
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

  app.use(`/api/${process.env.VERSION}/product`, PRODUCT_ROUTE);
  // app.use(`/api/${process.env.VERSION}/cart`, cartRoute);
  // app.use(`/api/${process.env.VERSION}/order`, orderRoute);
  // app.use(`/api/${process.env.VERSION}/favoritelist`, favoriteRoute);
  // app.use(`/api/${process.env.VERSION}/user`, authRoute);
  // app.use(`/api/notification`, notification);
}


/**
 * RUN ROOT ANT CATCH EX
 */

Root()
