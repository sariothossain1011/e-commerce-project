const app = require("./app")
const mongoose =require("mongoose");


const PORT = 3001 ;
mongoose.connect('mongodb+srv://e-commerce-projects:e-commerce@cluster0.7jdkxqt.mongodb.net/e-commerce-anis').then(()=>{
    console.log(`server connected success`);
}).catch((error)=>{
    console.log(`server connected fail`,error);
})


app.listen(3001,()=>{
    console.log(`E-Commerce Server is Runing http://localhost:${PORT}`)
})
