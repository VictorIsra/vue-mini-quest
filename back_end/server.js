const express = require('express');
const bodyParser = require('body-parser')//ESSENCIAL, NÃO ESQUECER!
const cors = require('cors');//ESSENCIAL, NÃO ESQUECER!
const bd = require('./bd');

const app = express();
const port = 3000;

//abrindo conexão com o banco:
bd.mongoClient.connect(bd.connectionURL,{ useNewUrlParser: true }, (error, client) => {
    if(error)
        console.log("não rolou a conexão com o bd");
    else{
        console.log("conexão estabelecida com sucesso :) ");
        const db = client.db(bd.databaseName);
    }   
})

//const UserRouter = express.Router(); //tutorial botou mas n precisei
app.use(bodyParser.json());//tutorial botou mas n me pareceu essencial mas blz
app.use(bodyParser.urlencoded({ extended: true }));//passagem principal
app.use(cors());

// mongoClient.connect(connectionURL,{ useNewUrlParser: true }, (error, client) => {
// });
 //use isso se nao vai implicar dizendo que é um cross-origin e que isso é proibido

// app.post('/insert',(req,res) => {
//     console.log("body q chego no server: ",req.body);
//    // res.send(testexd );
// });


// app.get('/insert',(req,res) => {
//     //console.log("body q chego no server GET: ",req.body);
//     res.send(testexd );
// });
app.listen(port, () => console.log("server escutando na porta: " + port));

app.post('/insert',(req,res) => {
    //console.log("body q chego no server GET: ",req.body);
    console.log("recebi do cliet ", req.body);
    res.send("enviei pro clinte meu piru ")
});
// app.post('/remove',(req,res) => {//podia separar pra um remove_all mas farei em um só metodo    
   
//     res.send(testexd );
// });
// app.get('/show',(req,res) => {
   
//     res.send(testexd );
// });
// app.get('*',(req,res) => {
//     res.send(error_msg + req.url);
// });
// app.post('*',(req,res) => {
//     res.send(error_msg + req.url);
// });




// module.exports = {
//     port
// }

