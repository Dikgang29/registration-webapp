const bodyParser = require('body-parser');
const express = require('express');
const exphb = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const pgp = require('pg-promise')();

//factory function
const RegistrationDatabase = require('./registration-database')
const RegistrationRoutes = require('./routes/registration-routes');

const app = express();
//database connection
const DATABASE_URL =  process.env.DATABASE_URL || `postgresql://reg_admin:registration@localhost:5432/reg_app`

const config = {
    connectionString: DATABASE_URL
}
if(process.env.NODE_ENV == 'production'){
    config.ssl ={
        rejectUnauthorized: false
    }
}
const db = pgp(config);
const regBD = RegistrationDatabase(db)
const regRoutes = RegistrationRoutes(regBD);

//setting up handlebars
app.engine('handlebars', exphb.engine({defaultLayout : false}));
app.set('view engine', 'handlebars');
//setting up body-parser
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(session({
    secret: 'Dikgang',
    resave: false,
    saveUninitialized: true, 
    cookie: {maxAge: 60000}
  }));
app.use(flash());

app.use(express.static('public'));

// routes
app.get('/',regRoutes.index)
app.post('/reg_number',regRoutes.postRegNumber);
app.post('/town_based', regRoutes.filter)
app.post('/clear', regRoutes.deleteReg);

const PORT = process.env.PORT || 3010
app.listen(PORT, ()=>{
    console.log('the server started at port:', PORT)
})
