import express from 'express'
import Cors from 'cors'
import mongoose from 'mongoose'
import Cards from './dbCards.js'

// App Cofiguration
const app =express();
const port = process.env.PORT||8001;

// Middlewares
app.use(express.json());
app.use(Cors());

// DB Configuration
//MongoDB Atlas
mongoose.connect('mongodb+srv://admin:Btqsf7ZVEmyexyG@cluster0.y3oue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true});
//Local
//mongoose.connect('mongodb://localhost:27017/tinderdb', {useNewUrlParser: true,useUnifiedTopology: true});


// API End Points
app.get('/',(req,res)=>res.status(200).send("This is Backend Server!!!"));

app.post('/tinder/cards',(req,res)=>{
    const dbCard = req.body;
    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{            
            res.status(200).send(data);
        }
    })
});

//Listener
app.listen(port,()=> console.log(`Backend Server Started at : ${port}`));