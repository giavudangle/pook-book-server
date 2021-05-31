

 
## 🚀 PookBook Server 

[![](https://img.shields.io/badge/Facebook-CodingwithVudang-blue)](https://www.facebook.com/codingwithvudang)
[![](https://img.shields.io/badge/Gmail-codingwithvudang@gmail.com-red)](mailto:codingwithvudang@gmail@gmail.com)

<div >
<img width="400px" height="400px" src="https://res.cloudinary.com/codingwithvudang/image/upload/v1622117732/logo_hcbfie.png" >
<img width="400px" height="400px" src="https://res.cloudinary.com/codingwithvudang/image/upload/v1622100868/sz4scfp9eit31cqy8xnf.jpg" >
</div>


## 🚀 Contributors
- Vudang

## 🚀 Server Features
- Login, Register, Forgot Password, ResetPassword with JWT Flow. 
- CRUD Products, Users, Carts, Whislist, Order...
- Fetch Products, Carts, Orders...
- Products url query (http://codingwithvudang-bookserver.herokuapp.com/api/v1/product?limit=2&page=1)
- Send email to user.
- Push notification to user's devices.
- Payment via Stripe
- Upload and resize photo 


## Technical details
- Nodejs, Express.
- Mongodb, Mongoose.
- Nodemailer.
- Multer, Sharp.
- Hapi/joi validation.
- Expo notification.
- Stripe Payment.
  
  

## 🚀 ERD - System Analysis - Database Design 🚀

### **ERD**
<img src="https://res.cloudinary.com/chemthan2202/image/upload/v1622463667/erd_cnpmnc_uj6eah.png" />

### 🚀 System Analysis and Database Design 🚀 

#### Database Design 🚀
- **PRODUCT** contains : ID, Name, Author, Category, Publisher, Provider, Price, ImageUrl, ThumbImageUrl and Stocks
   - A Product has one to many Category and a Category belongs to one or many Product . 
      - Each of the Categories will be identified by ID & Name & Code 
   - A Product has one to many Author and a Author belongs to one or many Product . 
      - Each of the Authors will be identified by ID & Name  
   - A Product has one to many Publisher and a Publisher belongs to one or many Product . 
      - Each of the Publishers will be identified by ID & Name 
   - A Product has one to many Provider and a Provider belongs to one or many Product . 
      - Each of the Providers will be identified by ID & Name 
   - A Product belongs to one or many Order_Detail and an Order_Detail has one to many product . 
      - Each of the Order_Detail will be identified by ID 
   - The Stocks by Product will be decreased per stocks in User's Order when user create new order successfully.
   - The products can be searched by Name and turn them into list.

- **ORDER** contains : ID, userID, Name, Address, Phone, Date, PaymentMethod, Status and Total Amount
   - An Order has one to many Order_Detail and an Order_Detail belongs to one ORDER
   - Customer who want to buy Product (createOrder) must Login. 
   - PookBook also accept Customer register new account for being new User.
   - User can buy any products if these's stocks are greater than zero ( stocks > 0 ).
   - The Order will be updated automatically ( tracking status )
 
- **ORDER_DETAIL** contains : ID, OrderID, Quantity and ProductID

- **USER** contains : ID, Name, Email, Password, Address(opt), Phone(opt), ImageUrl(opt) and PushTokens ( for technical implementation )
   - A User has one to many Order and an order belongs to one User
   - Users can reset their password
   - Customer(dont have an account) can login, register to become User


- **CART** contains : ID, userID, productID,Quantity
   - A Cart has one to many Product and a Product belongs to one or many Cart 
   - Each of the Products will be identified by ID & Title
   - Users can add any products to cart

- **FAVORITE** contains : ID, userID, productID
   - A Favorite has one to many Product and a Product belongs to one or many Favorite 
   - Each of the Products will be identified by ID & Title
   - User can add any products to favorite

#### System Analysis 🚀
 - Authentication
  - Allow any customer can register to become a member.
  - Allow user request to get a new password ( forgot password )
  - Auto sends email when customers register, order successfully, or request to get a new password.
  - Users (both customers and the admin ) will be logged out if inactive for 20 minutes. 
  - Allow customers and admins to log in as FaceID, TouchID
- Profile 
  - Allow customers to update their information.
  - Allow customers to upload their profile picture.
- Product
  - Show a listing of available products 
  - Products are to be displayed in ascending alphabetical order by title (default).
  - Each product will list the following from top to bottom
  - Allow user view product detail, add to cart or wish lish if they want.
  - Allow customer search product with given term keyword
  - Product detail will show title, image, description , author and price ...
- Shopping Cart
  - Anyone can add one or more products to the shopping cart.
- Wish List
  - Anyone can add one or more products to the wishlist.
- Checkout
  - Checkout is only available to logged-in customers. A user that is not logged in as a customer is given a chance to log in
  - Member customers may pick a promotion code to apply (in progress ).
  - Only one promotion code may be used per purchase (in progress ).
  - The promotion is a fixed value discount that is to be applied to an entire order (in progress ).
  - The discount is specified by the admin at the time of the promotion’s creation or most recent update/edit (in progress ).
- Payment
  - Users can choose two payment methods between COD (Cash On Delivery ) and Online Payment ( Mastercard, Visa, American Express ) via Stripe.
  - Log / record / tracking the transaction.
  - Push notification when the transaction successful.
- Tracking
  - Users can track their orders
  - Orders will be displayed by list
  - Each order contain ID,Date,List products and Order Status
- Contact
  - Users can intertract with Pook Book via Phone Call,Instagram,Facebook Messenger.
  - Users can follow PookBook via Facebook, Youtube, Skype.

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







