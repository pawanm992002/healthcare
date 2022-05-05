const mongoose = require('mongoose');

const DB = `mongodb+srv://pawan992002:mishra@cluster0.fuc5i.mongodb.net/healthCare?retryWrites=true&w=majority`;

mongoose.connect(DB).then(()=>{
    console.log("connection successful to mongo");
}).catch((err)=>{
    console.log("connection failed",err);
})