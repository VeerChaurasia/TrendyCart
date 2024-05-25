const port =4000;
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const multer = require('multer')
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://veerchaurasia2005:mongolearner@cluster0.drn8utb.mongodb.net/e-commerce')

app.get("/",(req,res)=>{
    res.send("Lesss gooo")
})

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage:storage
})
app.use("/images",express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for creating mongoose

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    
    },
    category:{
        type: String,
        required: true
    },
    new_price:{
        type: Number,
        required: true
    },
    old_price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    available:{
        type: Boolean,
        required: true
    },
})
app.post('/addproduct',async(req,res)=>{ //async because we dont have to wait for process to complete           
    const product =new Product({
        id:req.body.id,
        name:req.body.name,
        image:image.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price, 
    });
    console.log(product);
    await product.save(); //saving the product
    console.log("Saved");
    res.json({
        success:1,
        name:req.body.name,
    })

})

app.listen(port,(error)=>{
    if(!error){
        console.log("server running on Port" +port)
    }
    else{
        console.log(+error)
    }
})