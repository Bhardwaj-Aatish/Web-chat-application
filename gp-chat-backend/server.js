// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from 'cors';
// we can use this syntax just because we have use type = "node_modules" in package.json file


// app config
const app = express();
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1225518",
    key: "a14802f19e725b820a21",
    secret: "7b8c369d105fc1188594",
    cluster: "ap2",
    useTLS: true
  });

// middlware
// to message nhi dekhne ko nhi milega
app.use(express.json());

app.use(cors());
// app.use((req,res,next) => {
//     res.setHeader("Acess-Control-Allow-Origin" ,"*");
//     res.setHeader("Access-Control-Allow-Headers" ,"*");
//     next();
// })

// inki jagah cores lagaya hai 
// id dikh rhi thi bas 201 to aa rha tha par naam timestamp received ye sab show nhi ho rha tha


// DB config 
// const connection_url = 'mongodb+srv://aatishwhatappclone:9QwkoRa0M3yldb45@cluster0.kcfiu.mongodb.net/whatsappdatabase?retryWrites=true&w=majority'
const connection_url= 'mongodb+srv://aatishwhatappclone:9QwkoRa0M3yldb45@cluster0.kcfiu.mongodb.net/whatsappdatabase?retryWrites=true&w=majority'
// iski vajah se error aayi <password> mei  <> in dono ko  bhi htana hota hai 
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

// ???
// change stream and pusher

const db = mongoose.connection;
db.once('open', ()=> {
    console.log("DB connected");


    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) =>{
        console.log("A change occured", change);
 

    if(change.operationType === "insert")
    {
        const messageDetails = change.fullDocument;
        pusher.trigger("messages" , "inserted" , {
            name:messageDetails.name, 
            message: messageDetails.message,
            timestamp:messageDetails.timestamp,
            received:messageDetails.received,
        });
    }
    else{
        console.log("Error triggering pusher");
    }
});
});

// api routes
app.get('/', (req, res) => res.status(200).send('hello aatish here i am to confuse you '));

app.get('/messages/sync', (req,res)=>{
    
    Messages.find((err,data)=> {
        if(err){
            res.status(500).send(err);
            // 500 meaning internal server error 
            // developer have to work 
        }
        else
        {
            res.status(200).send(data);
            // created okay  201
        }
    })
});

app.post('/messages/new', (req,res)=>{
    const dbMessage = req.body;

    Messages.create(dbMessage,(err,data)=> {
        if(err){
            res.status(500).send(err);
            // 500 meaning internal server error 
            // developer have to work 
        }
        else
        {
            res.status(201).send(data);
            // created okay  201
        }
    })
});

// listen
app.listen(port, () => console.log(`Listening on local host :${port}`));