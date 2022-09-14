const path = require('path');
const express = require('express');
const session = require('express-session')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const sequelize = require('./config/connection');
const SequelizeStore =require('connect-session-sequelize')(session.Store);

const app = express();

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

dotenv.config();

let PORT = process.env.PORT || 4001;


app.get('/',(req,res)=>{
    res.send('Hello world!')
})



app.post('/user/generateToken',(req,res)=>{
    let jwtSecretKey=process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }

    const token = jwt.sign(data,jwtSecretKey)

    res.send(token);
});

app.get('/user/validateToken',(req,res)=>{
    let tokenHeaderKey=process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try{
        const token = req.header(tokenHeaderKey)
        const verified =jwt.verify(token,jwtSecretKey);
        if(verified){
            return res.send('Token Verified');
        }
        else{
            return res.status(401).send(error)
        }
    }
    catch(error){
        return res.status(401).send(error)
    }
});








sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening at ${PORT}`));
  });