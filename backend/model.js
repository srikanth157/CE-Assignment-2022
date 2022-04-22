const mongoose=require('mongoose');

const projectSchema=new mongoose.Schema({
    projectName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    skillset:{
        type:String,
        required:true
    },
    NoOfMembers:{
        type:Number,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    
});

module.exports=mongoose.model('project',projectSchema);
