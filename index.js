const bodyParser = require('body-parser');
const express = require('express');
const exphb = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');

//factory function
const Registration = require('./reg-function');


const app = express();

const registration = Registration();

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

app.get('/', (req,res)=>{
    res.render('index')
})

app.post('/reg_number', (req,res)=>{
    const {regInput} =  req.body;
    let checksName = registration.regFromKZN(regInput);
    console.log(checksName);
    if(!regInput){
        req.flash('error', 'Please enter a valid registration');
    }
    res.redirect('/')
})



const PORT = process.env.PORT || 3010
app.listen(PORT, ()=>{
    console.log('the server started at port:', PORT)
})
