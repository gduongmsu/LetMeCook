const express = require('express');
const mysql = require('mysql');
const cors = require(cors);

const app = express();
app.use(cors());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password:'passroot',
        database: 'recipelookup'
    }
)

app.get('/', (re, res) =>
{
    return res.json("From SignInService");
})

app.listen(8080, () => 
{
    console.log("Listening");
})
