

 
## 🚀 PookBook Server 

[![](https://img.shields.io/badge/Facebook-CodingwithVudang-blue)](https://www.facebook.com/codingwithvudang)
[![](https://img.shields.io/badge/Gmail-codingwithvudang@gmail.com-red)](mailto:codingwithvudang@gmail@gmail.com)

<div >
<img width="400px" height="400px" src="https://res.cloudinary.com/codingwithvudang/image/upload/v1618561426/SplashScreen_2x_s5hpib.png" >
<img width="400px" height="400px" src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/151284066_207254161142817_5812038792384707893_n.png?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=KAVSahpcm04AX_lEqGb&_nc_ht=scontent.fsgn2-1.fna&oh=f8f95fca5dcb99c3592f41127391cf3c&oe=609E2BB1" >
</div>


## 🚀 Contributors
- Vudang

## 🚀 Deploy & Example Request
ROOT API ENDPOINT : http://codingwithvudang-bookserver.herokuapp.com

- api/v1/product : PRODUCT API ENDPOINT
  - ROUTER.get('/',PRODUCT_CONTROLLER.GET_LIST_PRODUCTS)
  - ROUTER.post(
     '/',upload.single('imageUrl'),
     resize,
     PRODUCT_CONTROLLER.CREATE_PRODUCT);
  - ROUTER.patch(
     '/:id',
     upload.single('imageUrl'),
     resize,
     PRODUCT_CONTROLLER.UPDATE_PRODUCT);
   - ROUTER.delete('/:id',PRODUCT_CONTROLLER.DELETE_PRODUCT)
  
- api/v1/user : USER API ENDPOINT
   - router.post("/register", USER_REGISTER);
   - router.post("/login", USER_LOGIN);
   - router.patch("/:id", verifyToken, USER_EDIT);
   - router.post("/reset_password", USER_RESET_PASSWORD);
   - router.post("/receive_new_password/:userId/:token", USER_RECEIVE_NEW_PASSWORD);
   - router.patch(
     "/photo/:id",
     verifyToken,
     upload.single("profile"),
     USER_UPLOAD_PHOTO
   );
   
- api/v1/favorite : FAVORITE API ENDPOINT
    - router.get('/', verifyToken, GET_FAVORITES);
    - router.post('/', verifyToken, POST_FAVORITE);
    - router.patch('/:userId', verifyToken, DELETE_FAVORITE_ITEM);

- api/v1/order : ORDER API ENDPOINT
    - router.get('/',verifyToken,GET_ORDERS);
    - router.post('/', verifyToken, CREATE_ORDER);
    - router.patch('/:id', verifyToken, UPDATE_ORDER);

- api/v1/product : CART API ENDPOINT
    - router.get('/', verifyToken, GET_CART);
    - router.post('/', verifyToken,CREATE_CART);
    - router.put('/:id', verifyToken, UPDATE_CART);
    - router.delete('/cartitem/:id', verifyToken, DELETE_CART_ITEM);
    - router.delete('/:id', verifyToken, DELETE_CART);



## 🚀 Get Started

``` bash
# install dependencies
yarn install
```
``` bash
# run project
yarn start
```
``` bash
# Configuration 
Change the constants in .env file (your database, host, port,cloudinary key,stripe key ,...) 
Happy coding 😍😍😍
```

## 🚀 Server Features
- Create User, Reset Password. ( )
- CRUD Products, Users, Carts, Whislist, Order.
- Fetch Products, Carts, Orders...
- Products url query (http://codingwithvudang-bookserver.herokuapp.com/api/v1/product?limit=2&page=1)
- Send email to user.
- Push notification to user's devices.
- Payment.
- Upload and resize photo.


## Technical details
- Nodejs, Express.
- Mongodb, Mongoose.
- Nodemailer.
- Multer, Sharp.
- Hapi/joi validation.
- Expo notification.
- Stripe Payment.
  
  





