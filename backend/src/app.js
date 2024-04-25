import express from 'express'
import mongoose from 'mongoose'
import Item from './model/item.js'
import Student from './model/students.js'
import Voter from './model/voter.js'
import Candidate from './model/candidate.js'
import cors from 'cors'
import nodemailer from 'nodemailer'


const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

let testAccount = await nodemailer.createTestAccount();
// Create a transporter object using SMTP transport
console.log(testAccount)
let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass, // generated ethereal password
  },
});

mongoose
  .connect('mongodb://127.0.0.1:27017/item')
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log("it has an error", err));

app.get('/', (req, res) => {
  res.send("server started")
})

app.get('/getAllCandidate', async(req, res) => {
    try{
        let response = await Candidate.find({})
        res.send(response)
    }
    catch(e){
      throw e;
    }
})

app.get('/getUser', async(req, res) => {
  try{
    let query = {phone:req.query.phone};
      let response = await Candidate.find(query)
      res.send(response)
  }
  catch(e){
    throw e;
  }
})

app.post('/voterReg',async(req,res)=>{
    try{
      console.log(req.body);
      let data = await Voter.create(req.body);
      res.send(data)
    }
    catch(e){
      throw e;
    }
})

app.post('/candidateReg',async(req,res)=>{
  try{
    console.log(req.body);
    let data = await Candidate.create(req.body);
    res.send(data)
  }
  catch(e){
    throw e;
  }
})

app.put('/vote',async(req,res)=>{
  try{
    let query={symbol:req.body.symbol};
    let response= await Candidate.updateOne(query,{ $inc: { count: 1 } })
    res.send(response)
    await transporter.sendMail({
      from: testAccount.user, // Sender address
      to: req.body.email, // List of recipients
      subject: "Voting Successful",
      text: "Voting Successful"
    });
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
