// =====================================
// AirDraw Enterprise Server
// =====================================


const express = require("express");

const app = express();


app.use(
express.json()
);



app.get("/",(req,res)=>{


res.json({

status:"AirDraw AI Online",

version:"Enterprise"

});


});



app.listen(3000,()=>{


console.log(
"Server çalışıyor"
);


});