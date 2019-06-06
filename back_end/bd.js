const mongodb = require('mongodb');
const mongoClient =  mongodb.MongoClient;//objeto que permite se conectar a um banco e afins    
const connectionURL = 'mongodb://127.0.0.1:27017'; //digitar localhost:27017 deixa mais lento, melhor deixar assim
const databaseName = 'todo-list';//pode ser qqr nome.

module.exports = {
    mongoClient,
    connectionURL,
    databaseName
}