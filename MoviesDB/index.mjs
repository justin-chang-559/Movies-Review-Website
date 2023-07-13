import app from "./server.mjs";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.mjs"
import dotenv from 'dotenv';
dotenv.config();

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env.USERNAME;
const mongo_password = process.env.PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.ayesq56.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err =>{
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on ${port}`)
        })
    })
