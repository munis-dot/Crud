import express from 'express'
import mongoose from 'mongoose'
import Item from './model/item.js'
import cors from 'cors'

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors());

mongoose
  .connect('mongodb://127.0.0.1:27017/item')
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log("it has an error", err));

app.get('/', (req, res) => {
  res.send("server started")
})

app.get('/getAllItems', async(req, res) => {
    try{
      let response = await Item.find();
      res.send(response)
    }
    catch(e){
      throw e;
    }
})

app.post('/createItem',async(req,res)=>{
    try{
      console.log(req.body);
      let data = await Item.create(req.body);
      res.send(data)
    }
    catch(e){
      throw e;
    }
})

app.put('/updateItem',async(req,res)=>{
  try{
    let query={id:req.body.id};
    let response= await Item.updateOne(query,req.body)
    res.send(response)
  }
  catch(e){
    throw e;
  }
})

app.delete('/deleteItem',async(req,res)=>{
  try{
    let query = {id:req.query.id};
    let response = await Item.deleteOne(query);
    res.send(response);
  }
  catch(e){
    throw e;
  }
})

app.get('/getItemByID',async(req,res)=>{
  try{
    let query = {id:req.query.id};
    let response = await Item.find(query);
    res.send(response)
  }
  catch(e){
    throw e;
  }
})



export default app
