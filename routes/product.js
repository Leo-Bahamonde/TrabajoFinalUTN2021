var express = require('express');
var router = express.Router();
var novedadesModel = require("./../models/novedadesModel");
var cloudinary = require("cloudinary").v2;

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  novedades = novedades.splice(0,9);//Seleccionamos los primeros 5 elementos del array
  
  novedades = novedades.map(novedad =>{
    if (novedad.img_id){
      const imagen = cloudinary.url(novedad.img_id,{
        width: 400,
        height:417,
         crop: "fill"
        });
        return{
          ...novedad,
          imagen
        }
      }else{
        return{
          ...novedad,
          imagen: "/images/noimage.jpg"
        }
      }
    })
    
    res.render('product.hbs', { 
      novedades 
    });
  
});

module.exports = router;
