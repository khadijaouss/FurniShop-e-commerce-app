const express = require('express');
const router = express.Router();
const Paiement = require('../../models/paiement');

router.get('/' , (req,res)=>{
    Paiement.find()
        .then( paiements=>res.json(paiements) )
});

router.post('/' , (req,res)=>{
    const newPaiement = new Paiement({
        commandes:req.body.commandes,
        montant : req.body.montant,
        numeroCarte : req.body.numeroCarte,
    });
    newPaiement.save()
           .then( paiement => res.json(paiement) )
});

module.exports = router ;