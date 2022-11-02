const bodyParser = require('body-parser');
const express = require('express');
const exphb = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const pgp = require('pg-promise')();

//factory function
const Registration = require('./reg-function');
const RegistrationDatabase = require('./registration-database')



const app = express();

const registration = Registration();
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

app.get('/',  async (req,res)=>{

    const showAllReg = await regBD.getAllReg();
    res.render('index',{
        showAllReg
    })
})

// app.post('/reg_number', async (req,res)=>{
//     const {regInput} =  req.body;

//     const townRegNumber = regInput.toUpperCase();
//     const getTownCode = townRegNumber.slice(0,2)


//     // reg code array
//     const test = await regBD.setTownCode();
//     if(!regInput){
//         req.flash('error', 'Please enter the town registration and then select the ADD button');
//     } 
//     else if(regInput){
//         // testing 
//         // const testing1 = await regBD.checkingDuplictes(regInput);
//         // if(testing1 != 0){
//         //     req.flash('error', 'Registration already exists');
//         // //     res.redirect('/')
//         // }
        
        
//         for (let i = 0; i < test.length; i++) {
//             // console.log(test[i].reg_code)
//             const getEachCode = test[i].reg_code;
//             if (getEachCode === getTownCode){
//                 req.flash('success', 'Registration added succefully');
//                 await regBD.insertReg(townRegNumber);
//             }else if(getEachCode !== getTownCode){
//                 req.flash('error', 'Invalid town code');
//             }
//           }
//             // req.flash('success', 'Registration added succefully');
//             // await regBD.insertReg(townRegNumber);

        
//     } 
//     res.redirect('/')
// });
app.post('/reg_number', async (req,res)=>{
    const {regInput} =  req.body;
    const townRegNumber = regInput.toUpperCase();

    if(!/^[A-Z]{2}\s[0-9]{3}(\s|\-)?[0-9]{3}$/.test(townRegNumber)){
        req.flash('error','Please enter a valid reistration')
    } else if(townRegNumber){
        regBD.insertReg(townRegNumber);
        req.flash('success','Registration number added successfully')
    } else{
        req.flash('error','Please enter a registration and press the add button')
    }
    res.redirect('/')
});




// radio buttom post form 
app.post('/town_based', async (req,res)=>{
    const {reg_number} = req.body;

    if(!reg_number){
        req.flash('error','Please check a town you want to filter for')
        res.redirect('/')
    }
    const filtereReg =await regBD.townFilter(reg_number);
    res.render('index',{
        filtereReg
    })
});

//deleting all regisrations
app.post('/clear', (req,res)=>{
    req.flash('success', 'All the registrations have been cleared successfully');
    regBD.deleteAllREg();
    res.redirect('/')
})

const PORT = process.env.PORT || 3010
app.listen(PORT, ()=>{
    console.log('the server started at port:', PORT)
})
