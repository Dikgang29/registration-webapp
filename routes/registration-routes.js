module.exports = function RegistrationRoutes(regBD){

    async function index(req,res){

        const showAllReg = await regBD.getAllReg();
        res.render('index',{
            showAllReg
        })
    }

    async function postRegNumber (req,res){
        const {regInput} =  req.body;
        const townRegNumber = regInput.toUpperCase();
        const regNumber = await regBD.checkingDuplictes(townRegNumber);
        const regID = await regBD.checkTownCode(townRegNumber);
    
    
        if(!/^[A-Z]{2}\s[0-9]{3}(\s|\-)?[0-9]{3}$/.test(townRegNumber)){
             req.flash('error','Invalid registration input')
        } else if(regInput){
            if(regID != Number(1)){
                req.flash('error','Invalid town code')
            } else {
                if(regNumber > Number(0)){
                    req.flash('error', 'Registration already exists');
                } else{
                    regBD.insertReg(townRegNumber);
                    req.flash('success','Registration number added successfully')
                }
            }
           
        } 
        res.redirect('/')
    }

    async function filter (req,res){
            const {reg_number} = req.body;
        
            if(!reg_number){
                req.flash('error','Please check a town you want to filter for')
            }
            const filtereReg =await regBD.townFilter(reg_number);
            res.render('index',{
                filtereReg
            })
        }

    function deleteReg(req,res){
        req.flash('success', 'All the registrations have been cleared successfully');
        regBD.deleteAllREg();
        res.redirect('/')
    }

    return{
        index,
        postRegNumber,
        filter,
        deleteReg
    }
}