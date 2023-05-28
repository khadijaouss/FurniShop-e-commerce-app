const express = require('express');
const router = express.Router();

const Commande = require('../../models/commande');

router.get('/' , (req,res)=>{
    Commande.find()
        .then( commandes=>res.json(commandes) )
});

router.post('/' , (req,res)=>{
    const newCommande = new Commande({
        itemId:req.body.itemId,
        quantity : req.body.quantity,
    });
    newCommande.save()
           .then( commande => res.json(commande) )
});

router.put('/:id', (req, res, next) => {
    Commande.findByIdAndUpdate(req.params.id, req.body)
      .then(() => Commande.findById(req.params.id))
      .then((commande) => res.send(commande))
      .catch(next);
  });

  router.delete('/:id' , (req,res)=>{
    Commande.findByIdAndRemove(req.params.id)
        .then( () => res.json( {success:true} ) )
        .catch(err => res.status(404).json( {success:false} ) )
});


module.exports = router ;