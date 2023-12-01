import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
const app = express();

app.use(express.json());  //middleware

//Method 1 for cors
// app.use(cors()); //allows all domains

//Method 2
app.use(
    cors({
        origin: [""],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    })
)

app.get('/', (request, respone) => {
    console.log(request)
    return respone.status(234).send("Welcome to MERN stack")
})

app.use('/books', booksRoute)  //middleware


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App is connected to database")
        
        app.listen(PORT, ()=> {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })