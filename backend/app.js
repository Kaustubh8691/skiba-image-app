const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const jwt=require("jsonwebtoken")
const dotenv = require("dotenv");
const fs = require("fs");
const {OAuth2Client} =require("google-auth-library")
const imageModel = require("./model/model");
const User =require("./model/user")

dotenv.config();
app.use(cors());


const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connecdb=require("./connectDb/connectdb");


connecdb(process.env.url);

const client=new OAuth2Client("884472437498-dprsrbrjj8h45gvi85gkasm24tp7oku5.apps.googleusercontent.com")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSufffix=Date.now()+"-"+Math.round(Math.random(100))
    cb(null, file.originalname+"-"+uniqueSufffix);
  },
});

const upload = multer({ storage: storage });

app.post("/login",(req,res)=>{
        const {tokenId}=req.body;

        client.verifyIdToken({idToken:tokenId, audience: "884472437498-dprsrbrjj8h45gvi85gkasm24tp7oku5.apps.googleusercontent.com"}).then(response=>{
            const {email_verified, name,email}=response.payload;
            console.log(response.payload);
            if(email_verified){
                User.findOne({email}).exec((err,user)=>{
                    if(err){
                        return res.status(400).json({
                            error:"Something went erong..."
                        })
                    }else{
                        if(user){
                            const token=jwt.sign({_id:user._id},process.env.JWT_SIGNIN_KEY,{expiresIn:"1d"})
                            const {_id,name,email}=user;

                            res.json({
                                token,
                                user:{_id,name,email}
                            })
                        }else{
                            let newUser=new User({name,email});
                            newUser.save((err,data)=>{
                                if(err){
                                    return res.status(400).json({
                                        error:"something went wrong..."
                                    })
                                } 
                                const token=jwt.sign({_id:data._id},process.env.JWT_SIGNIN_KEY,{expiresIn:"1d"})
                                const {_id,name,email}=newUser;
    
                                res.json({
                                    token,
                                    user:{_id,name,email}
                                })
                            })
                        }
                    }
                })
            }
        })
})
app.post("/", upload.single("testImage"), (req, res) => {
  const saveImage =  imageModel({
    name: req.body.name,
    userID: req.body.userID,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
    res.send('image is saved')
});


app.get('/:id',async (req,res)=>{
    const id=req.params.id;
  const allData = await imageModel.find({userID:id})
  res.json(
    allData)
})

app.listen(port, () => {
  console.log("server running successfully "+port);
});