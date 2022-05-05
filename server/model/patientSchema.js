const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const patientSchema = new mongoose.Schema({
    pname:{
        type:String,
        required:true,

    },
    pemail:{
        type:String,
        required:true
    },
    pmobile:{
        type:Number,
        required:true
    },
    pseekness: {
        type: String,
        required: true
    },
    ppassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

patientSchema.methods.generateAuthToken = async function(){
    const secreteKey = "hellopawanthisissecretekeyokkkk";
    try{
        let ptoken = jwt.sign({_id:this._id},secreteKey);
        this.tokens = this.tokens.concat({token:ptoken});
        await this.save();
        return ptoken;
    }catch(err){
        console.log("token not generated")
    }
}

const Patient = mongoose.model('Patient',patientSchema);

module.exports = Patient;