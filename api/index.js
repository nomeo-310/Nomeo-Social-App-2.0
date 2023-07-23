const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const path = require('path')

dotenv.config();

app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

//middlewares
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors({credentials: true, origin: 'http://localhost:3005'}));


app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

//routes

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log("Connected to Mongo Successfully!")})
.catch((error) => console.log(`${error} did not connect`));

app.get('/test', (req,res) => {
    res.json('test working');
});

app.listen(8000, () => console.log('backend server is running'));