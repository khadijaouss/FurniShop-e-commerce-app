const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const PaiementSchema = new Schema({
    commandes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Commande',
          required: true
        }
      ],
    montant:{
        type:Number,
        required:true
    },
    numeroCarte:{
        type:Number,
        default:2113448900709
    },
});

module.exports = Paiement = mongoose.model('paiement', PaiementSchema);