const express = require('express');
const router = express.Router();

const Paiement = require('../../models/paiement');

router.get('/' , (req,res)=>{
    Paiement.find()
        .then( paiements=>res.json(paiements) )
});

router.post('/' , (req,res)=>{
    const newPaiement = new Paiement({
        commandeId:req.body.commandeId,
        montant : req.body.montant,
        numeroCarte : req.body.numeroCarte,
    });
    newPaiement.save()
           .then( paiement => res.json(paiement) )
});

router.put('/:id', (req, res, next) => {
    Paiement.findByIdAndUpdate(req.params.id, req.body)
      .then(() => Paiement.findById(req.params.id))
      .then((paiement) => res.send(paiement))
      .catch(next);
  });

  router.delete('/:id' , (req,res)=>{
    Paiement.findByIdAndRemove(req.params.id)
        .then( () => res.json( {success:true} ) )
        .catch(err => res.status(404).json( {success:false} ) )
});


module.exports = router ;