if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
  }
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const express = require('express')
const app = express()
const fs = require('fs')
const mysql = require('mysql')
const bodyParser = require('body-parser');

app.use( express.static( "public" ) );
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({ extended: false})); 


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root', 
    password: 'root123',
    database: 'test'
});

 connection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed.');
});

app.set('view engine','ejs')
app.use(express.static('frontend'))

app.post("/detail", function(req, res) {


    var sql = `INSERT INTO content 
    (
          price,title,userid
    )
    VALUES
    (
        ?,?,25
    )`;
connection.query(sql, [req.body.price,req.body.title], function (err, data) {
if (err) {
    console.log("some error occured");
} else {
    console.log("record inserted");
}
});

});

app.get('/index', function(req,res){
    fs.readFile('items.json', function(error, data) {
        if (error){
            res.status(500).end()
        } else{
            res.render('index.ejs', {
                stripePublicKey: stripePublicKey,
            items: JSON.parse(data)
            })
        }
    })
    })
app.listen(3000)


