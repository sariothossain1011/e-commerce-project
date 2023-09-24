

const express =  require("express");
const morgan = require("morgan")
const app = express();

// MIDDLEWARE 

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/hello",(req,res)=>{
    res.send("hello")
})










module.exports = app