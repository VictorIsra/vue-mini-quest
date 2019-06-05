const express = require('express');
const app = express();
const testexd = require('./teste');

const error_msg = "Erro 404: Página não existe. Página requisitada: "
const port = 3000;

app.get('/bd',(req,res) => {
    res.send(testexd);
});
app.get('*',(req,res) => {
    res.send(error_msg + req.url);
});


app.listen(port, () => console.log("server escutando na porta: " + port));