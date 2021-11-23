var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("contact.hbs",{title: "Contactos"})
});

router.post("/",async (req,res,next) => {
  var name = req.body.name;
  var email = req.body.email;
  var tel = req.body.tel;
  var message = req.body.message;

  console.log(req.body);

 let obj = {
    to: "leoebahaomde@gmail.com",
    subject: "contacto desde la web",
    html:"<b>"+ name +"</b> se contacto, y dejo el siguinte mensaje: <b>" 
        + message + "</b> para contactarse, dejo su correo electronico: <b>"
        + email + "</b> y su telefono <b>" + tel + "</b>."
 }

 var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})



let info = await transporter.sendMail(obj)

res.render("contact.hbs",{
  error:true,
  mensaje: "*Mensaje enviado con exito",
  
}) 


})

module.exports = router;
