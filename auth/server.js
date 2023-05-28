const express = require('express');
const mongoose = require('mongoose');
const commandes = require('./routes/api/users');



const app = express();

app.use(express.json());
var cors = require('cors')

app.use(cors())
const db = require('./config/keys').mongoURI

mongoose.connect(db)
        .then( ()=>console.log('MongoDB connected ...') )
        .catch( err=>console.log(err));


app.use('/api/users' , users);

const port = process.env.PORT || 3000 ;

app.listen(port , ()=>console.log(`Server started on port ${port}`) ) ;