const path = require('path');
const express = require('express');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
const routes = require('./routes');
const sequelize = require('./config/connection');






const app = express();
let PORT = process.env.PORT || 4001;



const sess = {
  secret: 'Super secret',
  cookie:{
    maxAge: 86400,
  },
  resave:false,
  saveUninitialized:true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
  
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

dotenv.config();

app.use(routes);












sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening at ${PORT}`));
  });