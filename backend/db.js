const mongoose=require('mongoose')
const mongooseURI='mongodb://localhost:27017/inotebook'
const connectTomongoose=()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log('connected to moongoose successful');
    })
}
module.exports=connectTomongoose