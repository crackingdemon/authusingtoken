const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false,
    useUnifiedTopology:true,}).then(()=>{
    console.log('connected');
}).catch((err)=>console.log('not'));