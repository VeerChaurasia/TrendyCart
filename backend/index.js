const port =4000;
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const multer = require('multer')
const path = require('path');
const cors = require('cors');

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000']; // Add your frontend domain here

// app.use(cors());
app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Include allowed headers
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json());

mongoose.connect('mongodb+srv://veerchaurasia2005:mongolearner@cluster0.drn8utb.mongodb.net/e-commerce');
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
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    },
})
app.post('/addproduct',async(req,res)=>{ //async because we dont have to wait for process to complete           
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array= products.slice(-1);
        let last_product=last_product_array[0];
        id = last_product.id+1

    }
    else{
        id=1;
    }
    const product =new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
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
//Creating api to delete the products
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({
        id:req.body.id})
    console.log("removed");
    res.json({
        success:true,
        name:req.body.send
    })

})
//creating api for getting all products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({
        // passing an {} empty object we will get all the product
    })
    console.log("All products fetched")
    res.send(products)
})

//Schema  creating for user
const Users= mongoose.model('Users',{
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now
    }
})

//Creating api for user resgistration
app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"Email already exists"})
    }
    else{
        let cart={}
        for(let i=0; i < 300;i++){
            cart[i]=0;
        }
    }
    

    const user= new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        // cartData:cart,
    })

    await user.save();

    const data ={
        user:{
            id:user.id
        }

    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

    
})

//Creating endpoint for user login
app.post('/login', async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare= req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"Wrong Password"})
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"})   
    }
})

app.listen(port,(error)=>{
    if(!error){
        console.log("server running on Port" +port)
    }
    else{
        console.log(+error)
    }
})