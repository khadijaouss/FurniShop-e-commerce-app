const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const CommandeSchema = new Schema({
    itemId:{
        type:Object,
        required:true
    },
    dateCommande:{
        type:Date,
        default:Date.now
    },
    quantity:{
        type:Number,
        required:true
    },
    commandePayee:{
        type:Boolean,
        default:false
    }

});

module.exports = Commande = mongoose.model('commande', CommandeSchema);