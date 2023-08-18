const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const ItemSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});
module.exports = Item = mongoose.model('item', ItemSchema);