module.exports = function RegistrationDatabase(db){


    async function insertReg(reg){
        
        const townCode = await db.oneOrNone('select * from reg_cities where reg_code =$1;',[reg.slice(0,2)])
        

        await db.none('insert into reg_numbers (registrations,town_id) values($1,$2);',[reg,townCode.id])
    }

    async function setTownCode(){

        const allCodes = await db.manyOrNone('Select reg_code from reg_cities;');
        return allCodes;
    }
    
    // all from test table

    async function townFilter(regTownID){
        const fromTown = await db.any('select * from reg_numbers where town_id = $1;',[regTownID]);
        return fromTown;
    }

    // filtering

    async function getAllReg(){
     const allReg = await db.manyOrNone('Select * from reg_numbers;')
     return allReg;
 }

    // //finding duplicates
    async function checkingDuplictes(reg){
        const checkCount = await db.oneOrNone('SELECT count(*) from reg_numbers WHERE registrations = $1;',[reg])
        return checkCount.count;
    }

    async function checkTownCode(reg){
        const townRegCode = await db.oneOrNone('SELECT count(*) from reg_cities WHERE reg_code = $1;',[reg.slice(0,2)])
        return townRegCode.count;
    }
    
    async function deleteAllREg(){
        await db.none('Delete FROM reg_numbers;')
   }


    return{
        getAllReg,
        deleteAllREg,
        insertReg,
        townFilter,
        checkingDuplictes,
        setTownCode,
        checkTownCode
    }
}