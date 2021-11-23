var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("dotenv").config();
var session = require("express-session")
var fileUpload = require("express-fileupload")

var indexRouter = require('./routes/index');
var contactRouter = require('./routes/contact');
var productRouter = require('./routes/product');
var loginRouter = require ("./routes/admin/login");
var logoutRouter =  require ("./routes/admin/logout");
var adminRouter = require ("./routes/admin/novedades")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use (session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

secured = async (req,res,next) =>{
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    } else {
      res.redirect('/admin/login')
    }
  } catch (error){
    console.log(error);
  }
}

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp/"
}));

//Router

      //INICIO
      app.use('/', indexRouter);
     
      //CONTACTOS
      app.use('/contactos', contactRouter);
      
      //PRODUCTOS
      app.use('/productos', productRouter);

      //Inicio sesion
      app.use("/admin/login", loginRouter);

       //Registrarse
       app.use("/admin/logout", logoutRouter);

       //Novedades
       app.use("/admin/novedades", secured, adminRouter);

      
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//DataBase

/* var pool = require ("./models/bd");
pool.query("select * from empleados").then(function(resultados){
  console.log(resultados);
}) */

module.exports = app;










/*

pegar en el arch .env

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=f166fb88137227
SMTP_PASS=b7b0b25e44d09b */