const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs')

require('../db/conn');
const User = require("../models/userSchema");

router.get('/',(req, res) =>{
    res.send('hello world from auth js');
});


// by async await  js
    router.post('http://localhost:6969/register',async (req,res) =>{

        const {name , email , phone, btechBranch , password } = req.body;
    
    
        if(!name || !email || !phone || !btechBranch || !password){
            return res.status(422).json({error:"please fill all form "})
        }
    try {
       const userExist =await User.findOne({email:email});

       if(userExist){
        return res.status(422).json({error:"email is already registered"});
    }

    const user = new User({name:name, email:email  , password:password, });
    // for hashing password 


    const userRegister = await user.save();
    if(userRegister){
        res.status(201).json({message:"user created sucessfully"});
    

    }

       

    }catch(err){console.log(err);


    }

})

//login route with
router.post('/signin',async()=>{
   
    try{
        let token;
        const{ email, password}=req.body;

        if(!email || !password) {
            return res.status(400).json({error:"please fill data"})
        }

        const userLogin = await User.findOne({email:email});
        if(userLogin) {
            const isMatch = await bcrypt.compare(password,userLogin.passowrd);

           token = await userLogin.generateAuthToken();

           res.cookie("jwtoken",token,{
               expires:new Date(Date.now()+25892000000)
           });





        if(!isMatch){
            
        res.json({error:log in sucess});


        }else{ res.json({message:log in sucess});
    }

        }else{ 
            res.status(400).json({error:"invalid credentials"})

        }

        

       
    }catch(err){
        console.log(err);
    }

})


module.exports = router;