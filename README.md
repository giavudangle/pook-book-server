

 
## 🚀 PookBook Server 

[![](https://img.shields.io/badge/Facebook-CodingwithVudang-blue)](https://www.facebook.com/codingwithvudang)
[![](https://img.shields.io/badge/Gmail-codingwithvudang@gmail.com-red)](mailto:codingwithvudang@gmail@gmail.com)

<div >
<img width="400px" height="400px" src="https://res.cloudinary.com/codingwithvudang/image/upload/v1618561426/SplashScreen_2x_s5hpib.png" >
<img width="400px" height="400px" src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/151284066_207254161142817_5812038792384707893_n.png?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=KAVSahpcm04AX_lEqGb&_nc_ht=scontent.fsgn2-1.fna&oh=f8f95fca5dcb99c3592f41127391cf3c&oe=609E2BB1" >
</div>


## 🚀 Contributors
- Vudang

## 🚀 ERD - System Analysis - Database Design 🚀

### **ERD**
<img src="https://res.cloudinary.com/codingwithvudang/image/upload/v1619083716/image_1_qxchty.png" />

### 🚀 System Analysis and Database Design 🚀 

- **PRODUCT** contains : ID, Name, Author, Category, Publisher, Provider, Price, ImageUrl, ThumbImageUrl and Stocks
   - A Product has one to many Category and a Category belongs to one or many Product . 
      - Each of the Categories will be identified by ID & Name  
   - A Product has one to many Author and a Author belongs to one or many Product . 
      - Each of the Authors will be identified by ID & Name  
   - A Product has one to many Publisher and a Publisher belongs to one or many Product . 
      - Each of the Publishers will be identified by ID & Name & Code 
   - A Product has one to many Provider and a Provider belongs to one or many Product . 
      - Each of the Providers will be identified by ID & Name & Code 
   - A Product has one to many Order_Detail and an Order_Detail belongs to one Product . 
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
   - Users can add any products to cart
   - Users can reset their password


- **CART** contains : ID, userID, productID,Quantity
   - A Cart has one to many Product and a Product belongs to one or many Cart 
   - Each of the Products will be identified by ID & Title
 
- **FAVORITE** contains : ID, userID, productID
   - A Favorite has one to many Product and a Product belongs to one or many Favorite 
   - Each of the Products will be identified by ID & Title
   - User can add any products to favorite



## 🚀 API DOCS
ROOT API ENDPOINT : http://codingwithvudang-bookserver.herokuapp.com ( havent upgraded yet )

```bash

- api/v1/users
  - /login
  - /register
- api/v1/products
- api/v1/favorites
- api/v1/carts
- api/v1/categories : CATEGORIES API ENDPOINT
- api/v1/authors : AUTHORS API ENDPOINT
- api/v1/publishers : PUBLISHER API ENDPOINT
- api/v1/providers : PROVIDERS API ENDPOINT


```

## 🚀 Example Request
**Please provider auth-token (JWT) in Headers of Request**

**CREATE NEW ORDER**
- POST localhost:8080/api/v1/orders
- Test on local :  Headers : auth-token (JWT token) Body (JSON form )
- Request Body : 

```json
{
"orderInfo": {
    "totalAmount": 5000,
    "userId" : "607ec5f6e3a5d0091ff78025",
    "items":[
        {
            "item":"60796508f7359b10225c5daa",
            "quantity":10
        },
        {
            "item":"607f074e3ca27f92d39fcf20",
            "quantity":10
        }
    ],
    "name": "Vudang",
    "address" : "67 Huynh Thien Loc",
    "phone":"09667881234",
    "paymentMethod":"Master Card",
    "status":"Waitting"
},
    "token":"TestToken"
}

```

**LOGIN**
- POST localhost:8080/api/v1/user/login
- Request Body : 
```json
{
    "email":"admin@gmail.com",
    "password":"admin",
    "pushTokens" :[]
}
```

**REGISTER**
- POST localhost:8080/api/v1/user/register
- Request Body : 
```json
{
    "name":"Admin",
    "email":"admin@test.com",
    "password":"admin"
}
```

**ADD TO CART**
- POST localhost:8080/api/v1/carts
- Test on local :  Headers : auth-token (JWT token) Body (JSON form )
- Request Body : 

```json
{
    "userId": "605048dbcafa1206c221d275",
    "items": [
        {
            "item":"605449411d6e5b1185c9d2de",          
            "quantity": "20"
        }
    ]
}
```


## 🚀 Samples JSON Response
**Please provider auth-token (JWT) in Headers of Request**

- GET : Get User's Cart
```json
{
    "status": "OK",
    "message": "Get Users Carts Successfully",
    "data": [
        {
            "_id": "60544b3b61d79712005f47de",
            "userId": "605048dbcafa1206c221d275",
            "items": [
                {
                    "item": {
                        "url": "https://res.cloudinary.com/codingwithvudang/image/upload/v1618937677/gnzlpmsl2t1usc9ye2fj.png",
                        "thumb": "https://res.cloudinary.com/codingwithvudang/image/upload/v1618937678/aqlydl4e6wdlx62ktszf.jpg",
                        "_id": "607f074e3ca27f92d39fcf20",
                        "filename": "imageUrl-1618937674747.jpg",
                        "title": "Đừng Để Mất Bò - 7 Bước Quản Lý Cửa Hàng Hiệu Quả Và Chống Thất Thoát",
                        "price": 149000,
                        "description": "Bạn đang quản lý hay làm chủ một cửa hàng nhưng công việc kinh doanh lại không được suôn sẻ. Bạn luôn phải đau đầu vì những vấn đề như: \nTháng nào cũng có một lượng ngân quỹ “không cánh mà bay”.\nKhó tuyển người, nhân viên “đến rồi đi” mà không ai gắn bó.\nNhân viên đi làm trễ, vi phạm nội quy, nói hoài cũng không thay đổi.\n Hay dạy mãi nhưng nhân viên vẫn không làm được việc.\nĐừng đi tìm cách gỡ rối ở đâu xa xôi, quyển sách này sẽ giúp bạn giải quyết TẤT CẢ những vấn đề trên theo một cách khoa học và hiệu quả nhất. ",
                        "author": "607962fd3b28280f84053110",
                        "category": "6079636a3b28280f84053113",
                        "provider": "607963393b28280f84053111",
                        "publisher": "60795ce2773c2a0e524b52c5",
                        "createdAt": "2021-04-20T16:54:39.002Z",
                        "updatedAt": "2021-04-20T16:54:39.002Z",
                        "__v": 0
                    },
                    "quantity": 20
                }
            ],
            "__v": 0
        }
    ]
}
```


- POST : Register
```json
{
    "status": "Success",
    "message": "Register account successfully",
    "data": {
        "phone": "",
        "address": "",
        "pushTokens": [],
        "_id": "607ff760cc5cc8870797ba78",
        "name": "Gia Vu",
        "email": "giavu@gmail.com",
        "password": "$2a$10$RmIeB9T6S0t2wEHGeA2zB.h/mfgeYUjJwWEYicyHiIr.2cDYm3W42",
        "profilePicture": "",
        "createdAt": "2021-04-21T09:58:56.687Z",
        "updatedAt": "2021-04-21T09:58:56.687Z",
        "__v": 0
    }
}
```



- POST : Login
```json
{
    "userid": "607ec5f6e3a5d0091ff78025",
    "name": "Vudang",
    "password": "$2a$10$3Ho6C5HO3ypPL4YWw.Tx5OzpvxjgaT/zNV8pHMpJUoGfDpHdAXG0e",
    "email": "admin@gmail.com",
    "phone": "",
    "address": "",
    "profilePicture": "",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDdlYzVmNmUzYTVkMDA5MWZmNzgwMjUiLCJpYXQiOjE2MTg5OTkwMjUsImV4cCI6MTYxOTYwMzgyNX0.uMerTNgPq3CtMoWc3oQb3Oz4tXDCa-mAUBvCB2IADWA",
    "loginAt": 1618999025039,
    "expireTime": 1619603825039
}
```

- GET : List Products
```json
{
    "total": 2,
    "page": 0,
    "pageSize": 2,
    "data": [
        {
            "url": "https://res.cloudinary.com/codingwithvudang/image/upload/v1619108762/ugvvlnf1gin7lq4yjiom.jpg",
            "thumb": "https://res.cloudinary.com/codingwithvudang/image/upload/v1619108763/mfnfxyleu9z6pk3gzj32.jpg",
            "stocks": 1000,
            "_id": "6081a39c13f3e21db7724b38",
            "filename": "imageUrl-1619108760206.jpg",
            "title": "Đừng Làm Việc Chăm Chỉ Hãy Làm Việc Thông Minh",
            "price": 106700,
            "description": "Thành công là học cách làm việc THÔNG MINH hơn chứ không phải CHĂM CHỈ hơn! Những người thành công thường chỉ tập trung thời gian của họ vào một vài ưu tiên và luôn nghĩ làm thế nào để mọi việc diễn ra suôn sẻ.\n\nMỗi người đều có 96 khối năng lượng mỗi ngày để làm những gì chúng ta muốn. Bạn luôn cần đảm bảo mình đang sử dụng mỗi khối năng lượng một cách khôn ngoan để đạt được tiến bộ nhanh nhất trên các mục tiêu quan trọng của bản thân. Đừng Làm Việc Chăm Chỉ Hãy Làm Việc Thông Minh để luôn duy trì nguồn năng lượng tích cực là cuốn sách Bizbooks xin trân trọng gửi đến quý độc giả.\n\nNhững kiến thức trong cuốn sách đưa ra những nghiên cứu về bộ não để giúp chúng ta quản trị trí não, cảm xúc và thói quen với những bước hành động hết sức giản đơn nhờ đó thiết lập những kế hoạch phù hợp với nhịp độ sinh học của bản thân. Ví dụ như:\n\nNếu bạn đợi đến phút cuối mới bắt đầu làm việc, thì việc đó sẽ chỉ mất một vài phút để hoàn thành. Đó chính là định luật Parkinson mà chúng ta đều từng trải qua. Chúng ta đều vật lộn trong suốt một tháng để thực hiện một dự án, và rồi thật kỳ diệu, chúng ta hoàn tất dự án đó chỉ trong tuần cuối cùng.\n\nĐịnh luật này cung cấp một đòn bẩy tuyệt vời để làm việc năng suất hơn: Áp dụng những deadlines ngắn hơn cho một công việc nào đó, hay sắp xếp một cuộc gặp mặt sớm hơn. Tìm khoảng thời gian mà bạn năng suất nhất để làm những việc đó thay vì dàn trải trong ngày dài.\n\nChìa khoá để đạt được kết quả tốt không phải là làm việc siêng năng hơn. Hầu hết chúng ta đã làm việc nhiều giờ ở công ty. Chúng ta đem công việc về nhà, luôn luôn sẵn sàng cho công việc, giải quyết tất cả mọi thứ mà chúng ta được giao. Chúng ta làm việc đó một cách tốt nhất trong khả năng của mình. Dường như cho dù chúng ta có làm việc rất nhiều giờ đi chăng nữa; hiệu suất của chúng ta dường như không cải thiện.\n\nTrong khi chúng ta luôn nghĩ rằng những người thành công là bởi vì họ tài năng hơn chúng ta. Tuy nhiên, càng nhìn xung quanh, tôi càng thấy không phải vậy. Một trong những lý do chúng ta nghĩ rằng họ thành công nhờ tài năng là bởi nó giúp chúng ta bỏ qua lý do thực sự. Chúng tôi không tài năng như những người siêu thành công này nên tất nhiên chúng tôi không được như họ. Giải thích như vậy là sai. Tài năng rất quan trọng, điều đó là tất nhiên, nhưng nó không quan trọng nhiều như bạn nghĩ.",
            "author": {
                "_id": "60819feb13f3e21db7724b2c",
                "name": "Tony Schwartz",
                "createdAt": "2021-04-22T16:10:19.310Z",
                "updatedAt": "2021-04-22T16:10:19.310Z",
                "__v": 0
            },
            "category": {
                "code": "KNS",
                "_id": "6081a33b13f3e21db7724b37",
                "name": "Sách kỹ năng sống",
                "createdAt": "2021-04-22T16:24:27.466Z",
                "updatedAt": "2021-04-22T16:24:27.466Z",
                "__v": 0
            },
            "provider": {
                "_id": "60819f3913f3e21db7724b2a",
                "name": "BIZBOOKS",
                "createdAt": "2021-04-22T16:07:21.692Z",
                "updatedAt": "2021-04-22T16:07:21.692Z",
                "__v": 0
            },
            "publisher": {
                "_id": "60819fab13f3e21db7724b2b",
                "name": "Nhà Xuất Bản Hồng Đức",
                "createdAt": "2021-04-22T16:09:15.277Z",
                "updatedAt": "2021-04-22T16:09:15.277Z",
                "__v": 0
            },
            "createdAt": "2021-04-22T16:26:04.275Z",
            "updatedAt": "2021-04-22T16:26:04.275Z",
            "__v": 0
        },
        {
            "url": "https://res.cloudinary.com/codingwithvudang/image/upload/v1619109029/nkpmh215lksoqomjgnwd.jpg",
            "thumb": "https://res.cloudinary.com/codingwithvudang/image/upload/v1619109031/st9cbmlrf2kewhrftwdx.jpg",
            "stocks": 9000,
            "_id": "6081a4a713f3e21db7724b39",
            "filename": "imageUrl-1619109027793.jpg",
            "title": "Payback Time - Ngày Đòi Nợ",
            "price": 299000,
            "description": "NGÀY ĐÒI NỢ – Payback Time là cuốn sách bán chạy nhất New York Time được tác giả Phil Town sử dụng những ngôn ngữ đơn giản, dễ hiểu và lồng ghép những ví dụ thực tế giúp cho người đọc tiếp cận với những kiến thức về đầu tư chứng khoán một cách dễ dàng. Bên cạnh đó với những kiến thức và trải nghiệm của bản thân, chúng tôi đã đưa cuốn sách gần gũi hơn với bạn đọc Việt Nam.\n\nCuốn sách sẽ hướng dẫn bạn từ cách thức lựa chọn, đánh giá cổ phiếu, cho đến xây dựng cho mình một danh mục các cổ phiếu sẽ mua, mức giá mua–bán nào là hợp lý, cùng với những nguyên tắc mà bạn phải tuân theo… và cứ thực hành như vậy cho tới khi bạn trở nên giàu có.\n\n“Một cuộc sống hạnh phúc được bắt đầu từ những quyết định đầu tư khôn ngoan”. Ngay ngày hôm nay, hãy bắt đầu quyết định đầu tư khôn ngoan của bạn bằng việc trang bị một hệ thống và phương pháp đầu tư hoàn chỉnh đã được chứng minh hiệu quả tuyệt đối qua thời gian được trình bày trong cuốn sách này. Bởi vì: Kiếm một số tiền lớn từ đầu tư chứng khoán chính là cách “trả thù” tốt nhất cho tương lai tài chính của bạn vốn đã bị cướp đi trước đây.",
            "author": {
                "_id": "6081a01e13f3e21db7724b2d",
                "name": "Phill Town",
                "createdAt": "2021-04-22T16:11:10.931Z",
                "updatedAt": "2021-04-22T16:11:10.931Z",
                "__v": 0
            },
            "category": {
                "code": "KT",
                "_id": "6081a0f013f3e21db7724b30",
                "name": "Sách kinh tế ",
                "createdAt": "2021-04-22T16:14:40.940Z",
                "updatedAt": "2021-04-22T16:14:40.940Z",
                "__v": 0
            },
            "provider": {
                "_id": "60819f3913f3e21db7724b2a",
                "name": "BIZBOOKS",
                "createdAt": "2021-04-22T16:07:21.692Z",
                "updatedAt": "2021-04-22T16:07:21.692Z",
                "__v": 0
            },
            "publisher": {
                "_id": "6081a512af21a8abbed83f24",
                "name": "Happy Live",
                "createdAt": "2021-04-22T16:09:15.277Z",
                "updatedAt": "2021-04-22T16:09:15.277Z",
                "__v": 0
            },
            "createdAt": "2021-04-22T16:30:31.468Z",
            "updatedAt": "2021-04-22T16:30:31.468Z",
            "__v": 0
        }
    ],
    "status": "SUCCESS"
}
```


- GET : Orders by UserID
```json
{
    "status": "OK",
    "message": "Added Order Successfully",
    "data": {
        "_id": "607ff667cc5cc8870797ba77",
        "totalAmount": 5000,
        "userId": "607ec5f6e3a5d0091ff78025",
        "items": [
            {
                "item": "607f074e3ca27f92d39fcf20",
                "quantity": 10
            }
        ],
        "name": "Vudang",
        "address": "67 Huynh Thien Loc",
        "phone": "09667881234",
        "paymentMethod": "607fe47b4ebfda44935ff96b",
        "status": "607fe50d4ebfda44935ff971",
        "createdAt": "2021-04-21T09:54:47.780Z",
        "updatedAt": "2021-04-21T09:54:47.780Z",
        "__v": 0
    }
}
  
```


- GET : Favorite by UserID
``` json
{
    "status": "OK",
    "message": "Get Users Favorite List Successfully",
    "data": [
        {
            "_id": "607ff2794d7afe7bf95507ac",
            "userId": "607ec5f6e3a5d0091ff78025",
            "items": [
                {
                    "item": {
                        "url": "https://res.cloudinary.com/codingwithvudang/image/upload/v1618937677/gnzlpmsl2t1usc9ye2fj.png",
                        "thumb": "https://res.cloudinary.com/codingwithvudang/image/upload/v1618937678/aqlydl4e6wdlx62ktszf.jpg",
                        "_id": "607f074e3ca27f92d39fcf20",
                        "filename": "imageUrl-1618937674747.jpg",
                        "title": "Đừng Để Mất Bò - 7 Bước Quản Lý Cửa Hàng Hiệu Quả Và Chống Thất Thoát",
                        "price": 149000,
                        "description": "Bạn đang quản lý hay làm chủ một cửa hàng nhưng công việc kinh doanh lại không được suôn sẻ. Bạn luôn phải đau đầu vì những vấn đề như: \nTháng nào cũng có một lượng ngân quỹ “không cánh mà bay”.\nKhó tuyển người, nhân viên “đến rồi đi” mà không ai gắn bó.\nNhân viên đi làm trễ, vi phạm nội quy, nói hoài cũng không thay đổi.\n Hay dạy mãi nhưng nhân viên vẫn không làm được việc.\nĐừng đi tìm cách gỡ rối ở đâu xa xôi, quyển sách này sẽ giúp bạn giải quyết TẤT CẢ những vấn đề trên theo một cách khoa học và hiệu quả nhất. ",
                        "author": {
                            "_id": "607962fd3b28280f84053110",
                            "name": "Trần Thanh Phong ",
                            "createdAt": "2021-04-16T10:12:13.816Z",
                            "updatedAt": "2021-04-16T10:12:13.816Z",
                            "__v": 0
                        },
                        "category": {
                            "code": "KD ",
                            "_id": "6079636a3b28280f84053113",
                            "name": "Sách kinh doanh ",
                            "createdAt": "2021-04-16T10:14:02.823Z",
                            "updatedAt": "2021-04-16T10:14:02.823Z",
                            "__v": 0
                        },
                        "provider": {
                            "_id": "607963393b28280f84053111",
                            "name": "NXB Đà Nẵng ",
                            "createdAt": "2021-04-16T10:13:13.582Z",
                            "updatedAt": "2021-04-16T10:13:13.582Z",
                            "__v": 0
                        },
                        "publisher": {
                            "_id": "60795ce2773c2a0e524b52c5",
                            "name": "Alpha Book",
                            "createdAt": "2021-04-16T09:46:10.817Z",
                            "updatedAt": "2021-04-16T09:46:10.817Z",
                            "__v": 0
                        },
                        "createdAt": "2021-04-20T16:54:39.002Z",
                        "updatedAt": "2021-04-20T16:54:39.002Z",
                        "__v": 0
                    }
                }
            ],
            "createdAt": "2021-04-21T09:38:01.291Z",
            "updatedAt": "2021-04-21T09:38:01.291Z",
            "__v": 0
        }
    ]
}
```

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
  
  





