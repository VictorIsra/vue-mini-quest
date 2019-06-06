const express = require('express');
const bodyParser = require('body-parser')//ESSENCIAL, NÃO ESQUECER!
const cors = require('cors');//ESSENCIAL, NÃO ESQUECER!
const bd = require('./bd');
let db = {};
const app = express();
const port = 3000;

//abrindo conexão com o banco:
bd.mongoClient.connect(bd.connectionURL,{ useNewUrlParser: true }, (error, client) => {
    if(error)
        console.log("não rolou a conexão com o bd");
    else{
        console.log("conexão estabelecida com sucesso :) ");
        //somente se eu conseguir me conectar, que irei escutar por requisições:
        db = client.db(bd.databaseName);
        
        app.listen(port, () => console.log("server escutando na porta: " + port));
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
                console.log("erro ao tentar fetch td ", error);
         }
     );
});
app.post('/insert',(req,res) => {
    if(req.body.task != ''){
        console.log("recebi do cliet xd ", req.body.task);
        db.collection(bd.collection).insertOne(req.body)
        .then(data => {
            console.log("item removido com sucesso ", data.ops);
            res.send('');
        })
        .catch((error) => console.log(error));
    }    
    else
        console.log("requisição recebida contém estrutura/valor inválidos");    
});
app.post('/remove',(req,res) => {
    if(req.body._id != ''){
        console.log("recebi do cliet xd ", req.body);
        db.collection(bd.collection).deleteOne({_id: bd.objectID(req.body._id)})
        .then(data => {
            console.log("item removido com sucesso ", data.ops);
            res.send('');
        })
        .catch((error) => console.log(error));
    }    
    else
        console.log("requisição recebida contém estrutura/valor inválidos");    
});
app.post('/drop',(req,res) => {
    //serio que precisa dessa putaria toda pra saber se o objeto é vazio?
    if(Object.entries(req.body).length === 0 && req.body.constructor === Object){
        console.log("recebi do cliet drop ", req.body);
        db.collection(bd.collection).deleteMany({})
        .then(data => {
            console.log("documentos dropados ", data.ops);
            res.send('');
        })
        .catch((error) => console.log(error));
    }    
    else
        console.log("requisição recebida contém estrutura/valor inválidos");    
});
app.post('/update',(req,res) => {
    if(req.body._id != ''){
        //console.log("recebi do cliet xd ", req.body._id, req.body.checked);
        db.collection(bd.collection).updateOne({
            _id: bd.objectID(req.body._id)
        },{
            $set:{
                checked: req.body.checked
            }
        })
        .then(data => {
            console.log("item atualizado ", data.ops);
            res.send('');
        })
        .catch((error) => console.log(error));
    }    
    else
        console.log("requisição recebida contém estrutura/valor inválidos");    
});

app.post('*',(req,res) => res.send("pag n existe")); 
app.get('*',(req,res) => res.send("pag n existe")); 

