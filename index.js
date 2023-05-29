const connectToMongo = require('./config');
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const path = require('path');

const auth = require('./routes/auth');
const cart = require('./routes/cart')
const wishlist = require('./routes/wishlist')
const product = require('./routes/product')
const review = require('./routes/review')
const paymentRoute = require('./routes/paymentRoute')
const forgotPassword = require('./routes/forgotPassword')
const AdminRoute = require('./routes/Admin/AdminAuth')
const dotenv = require('dotenv');
dotenv.config()

connectToMongo();

const port = 5000||process.env.NODE_ENV;

const app = express()

// create application/json parser
app.use(bodyParser.json())
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))



app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

if(process.env.NODE_ENV==='Production'){
    //set static folder
    app.use(express.static(path.join(__dirname,'build')));

     app.get('/', function (req, res) {
     res.sendFile(path.join(__dirname, '../SUFIshop-Frontend/build', 'index.html'));
     });


}


// Available Routes
app.use('/', auth)

app.use('/', product)

app.use('/', cart)

app.use('/', wishlist)

app.use('/', review)
app.use('/admin', AdminRoute)
// payment route
app.use('/api', paymentRoute)

// forgot Password route
app.use('/api/password', forgotPassword)

app.listen(port, () => {
    console.log(`E-commerce backend listening at http://localhost:${port}`)
})
