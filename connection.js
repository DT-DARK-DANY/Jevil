const express=require('express');
var nodemailer = require('nodemailer');

const app=express();
var bodyparser=require('body-parser');
// let alert = require('alert'); 
var urlencodedparser=bodyparser.urlencoded({ extended: false });
const port=3000;
app.use(express.static('DANY'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/images',express.static(__dirname+'public/img'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'goldenjokers9@gmail.com',
      pass: 'goodlucky123$'
    }
  });
 
function connect(name,email,phonenumber,Message,Address){
    const {createPool}= require('mysql');
const pool=createPool({
    host:"localhost",    
    user:"root",
    password:"",
    database:"Jesters"
})
// "INSERT INTO `plan`(`ID`, `kind_of_class`, `Date_of_start`, `Date_of_End`, `Price`) VALUES ('$ID',' $kind','$date_of_start','$date_of_end',' $price');";
pool.query(`INSERT INTO contact_us(Name, Email, Telephone, Area_Of_Experties,Address) VALUES ('${name}','${email}','${phonenumber}','${Message}','${Address}');`,(err,res,fields)=>{
    if(err){
        alert("data failed to sent");
        return console.log(err);
    }else{
        var mailOptions = {
            from: 'goldenjokers9@gmail.com',
            to: `${email}`,
            subject: 'this is a confirm Email from JEVIL',
            text: `Thanks for contacting us Mr/s ${name}, we will contact with you as soon as possible.`
          };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              // alert("data has been sent");
            }
          });
        

       }
})}

app.post('/connect',urlencodedparser,(req,res)=>{
        connect(req.body.username,req.body.email,req.body.phone,req.body.message,req.body.Address);
    return res.redirect('/');

})

app.listen(port,()=>console.info(`Listening on port ${port}`));

