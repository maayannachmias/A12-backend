require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')

// clear    To clear the terminal
// cancle process in terminal : ctrl + c

// npm install dotenv
// npm install -g nodemon     *ONLY ONCE*
// in shell : Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
//  nodemon server.js            ---- dynamic node change

// cd backend
// OR just do (after installing nodemon) : npm run dev


// fire up the express app
const app = express()

// middleware
app.use(express.json()) // parse and attach to the req object

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes

const allowedOrigins = ['https://tictactask-app.onrender.com', 'http://localhost:4000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

app.use('/api/tasks', taskRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) =>{
        console.log(error)
    })


// get the .env file
process.env