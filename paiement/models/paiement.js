const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const PaiementSchema = new Schema({

    commandeId:{
        type:Object,
        required:true
    },
    montant:{
        type:Number,
        required:true
    },
    numeroCarte:{
        type:Number,
        required:true
    },
    

});

module.exports = Paiement = mongoose.model('paiement', PaiementSchema);