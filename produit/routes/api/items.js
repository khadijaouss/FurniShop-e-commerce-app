const express = require('express');
const router = express.Router();

const Item = require('../../models/item');

router.get('/' , (req,res)=>{
    Item.find()
        .then( items=>res.json(items) )
});

router.post('/' , (req,res)=>{
    const newItem = new Item({
        name : req.body.name
    });
    newItem.save()
           .then( item => res.json(item) )
});

router.put('/:id', (req, res, next) => {
    Item.findByIdAndUpdate(req.params.id, req.body)
      .then(() => Item.findById(req.params.id))
      .then((item) => res.send(item))
      .catch(next);
  });

  router.delete('/:id' , (req,res)=>{
    Item.findByIdAndRemove(req.params.id)
        .then( () => res.json( {success:true} ) )
        .catch(err => res.status(404).json( {success:false} ) )
});


module.exports = router ;