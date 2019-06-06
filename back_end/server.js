const express = require('express');
const bodyParser = require('body-parser')//ESSENCIAL, NÃO ESQUECER!
const cors = require('cors');//ESSENCIAL, NÃO ESQUECER!
const bd = require('./bd');
const msg = require('./msgs.js');
let db = {};
const app = express();
const port = 3000;

//abrindo conexão com o banco:
bd.mongoClient.connect(bd.connectionURL,{ useNewUrlParser: true }, (error, client) => {
    if(error)
        console.log(msg.connection_failed);
    else{
        console.log(msg.connection_established);
        //somente se eu conseguir me conectar, que irei escutar por requisições:
        db = client.db(bd.databaseName);
        
        app.listen(port, () => console.log(msg.sever_listening + port));
    }   
})
//const UserRouter = express.Router(); //tutorial botou mas n precisei
app.use(bodyParser.json());//mesmo o tutorial nao botando, isso foi essencial no meu codigo, nao esquecer.
app.use(bodyParser.urlencoded({ extended: true }));//passagem principal, nao esquecer
app.use(cors());

app.get('/fetch',(req,res) => {
     db.collection(bd.collection).find({}).toArray(
         (error,data) => {
             if(!error)
                 res.send(data);
             else
                console.log(msg.fetch_error, error);
         }
     );
});

app.post('/insert',(req,res) => {
    if(req.body.task != ''){
        db.collection(bd.collection).insertOne(req.body)
        .then(data => {
            console.log(msg.item_inserted, data.ops);
            res.send('');
        })
        .catch((error) => console.log(error));
    }    
    else
        console.log(msg.invalid_request);    
});

app.post('/remove',(req,res) => {
    if(req.body._id != ''){
        db.collection(bd.collection).deleteOne({_id: bd.objectID(req.body._id)})
        .then(data => {
            console.log(msg.item_removed, data.ops);
            res.send('');
        })
        .catch((error) => console.log(error));
    }    
    else
        console.log(msg.invalid_request);    
});

app.post('/drop',(req,res) => {
    //serio que precisa dessa putaria toda pra saber se o objeto é vazio?
    if(Object.entries(req.body).length === 0 && req.body.constructor === Object){
        db.collection(bd.collection).deleteMany({})
        .then(data => {
            console.log(msg.documents_dropped);
            res.send('');
        })
        .catch((error) => console.log(error));
    }    
    else
        console.log(msg.invalid_request);     
});

app.post('/update',(req,res) => {
    if(req.body._id != ''){
        db.collection(bd.collection).updateOne({
            _id: bd.objectID(req.body._id)
        },{
            $set:{
                checked: req.body.checked
            }
        })
        .then(data => {
            console.log(msg.item_atualized, data.ops);
            res.send('');
        })
        .catch((error) => console.log(error));
    }    
    else
        console.log(msg.invalid_request);        
});

app.post('*',(req,res) => res.send(msg.error_404)); 
app.get('*',(req,res) => res.send(msg.error_404)); 
