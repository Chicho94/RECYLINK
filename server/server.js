const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
  .then(() => console.log('Connect to mongodb...'))
  .catch((err) => console.error('could not connect to mongodb...',err))

const { Recy } = require('./models/stock');

app.use(bodyParser.json());

// Create new product //

app.post('/api/newProduct',(req,res)=>{

  const recylink = new Recy(req.body)

  recylink.save((err,doc)=>{
    if(err) return res.status(400).send(err);
    res.status(200).json({
      post:true,
      recyId: doc._id
    })
  })

})

// Read all products //

app.get('/api/products',(req,res)=>{

  Recy.find((err,doc)=>{
    if(err) return res.status(400).send(err);
    res.send(doc);
  })

})

// Update product //

app.post('/api/productUpdate',(req,res)=>{

  Recy.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
    if(err) return res.status(400).send(err);
    res.json({
      success:true,
      doc
    })
  })

})

// DELETE product //

app.delete('/api/productDelete',(req,res)=>{

  let id = req.query.id;

  Recy.findByIdAndRemove(id,(err,doc)=>{
    if(err) return res.status(400).send(err);
    res.json(true)
  })

})

const port = process.env.PORT || 3001;
app.listen(port, ()=>{ console.log(`server running in port: ${port}`) })
