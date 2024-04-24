import express from 'express'
import mongoose from 'mongoose'
import Item from './model/item.js'
import Student from './model/students.js'
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

app.get('/getAllStudents', async(req, res) => {
    try{
      if(req.query.type==='eligible'){
        let response = await Student.find({
          $and: [
            { $expr: { $gt: [ { $toInt: "$tenthMarkInPercentage" }, 60 ] } },
            { $expr: { $gt: [ { $toInt: "$twelthMarkInPercentage" }, 60 ] } },
            { $expr: { $gt: [ { $toInt: "$sem1" }, 60 ] } },
            { $expr: { $gt: [ { $toInt: "$sem2" }, 60 ] } },
            { $expr: { $gt: [ { $toInt: "$sem3" }, 60 ] } },
            { $expr: { $gt: [ { $toInt: "$sem4" }, 60 ] } },
            { $expr: { $gt: [ { $toInt: "$sem5" }, 60 ] } }
          ]
        });
        res.send(response)
      }
      else{
        let response = await Student.find({})
        res.send(response)
      }
      
    }
    catch(e){
      throw e;
    }
})

app.post('/createItem',async(req,res)=>{
    try{
      console.log(req.body);
      let data = await Student.create(req.body);
      res.send(data)
    }
    catch(e){
      throw e;
    }
})

app.put('/updateItem',async(req,res)=>{
  try{
    let query={phone:req.body.phone1};
    console.log(req.body)
    let response= await Student.updateOne(query,req.body)
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

app.get('/getItemByPhone',async(req,res)=>{
  try{
    let query = {phone:req.query.phone};
    let response = await Student.find(query);
    res.send(response)
  }
  catch(e){
    throw e;
  }
})



export default app
