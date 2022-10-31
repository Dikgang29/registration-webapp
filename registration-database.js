module.exports = function RegistrationDatabase(db){


    async function insertReg(reg){
        
        const townCode = await db.oneOrNone('select * from reg_cities where reg_code =$1;',[reg.slice(0,2)])
        console.log(townReg)

        await db.none('insert into reg_numbers (registrations,town_id) values($1,$2);',[reg,townCode.id])
    }

    // all from test table

    async function townFilter(regTownID){
        const fromTown = await db.any('select * from reg_numbers where town_id = $1;',[regTownID]);
        return fromTown;
    }

    // filtering


    async function deleteAllREg(){
        await db.none('Delete FROM reg_numbers;')
   }

   async function getAllReg(){
    const allReg = await db.manyOrNone('Select * from reg_numbers;')
    return allReg;
}

    // //finding duplicates
    async function checkingDuplictes(reg){
        const checkCount = await db.oneOrNone('SELECT COUNT(*) from reg_numbers where registrations = $1;',[reg])
        return checkCount.count;
    }



    return{
        // getAllTowns,
        getAllReg,
        deleteAllREg,
        insertReg,
        townFilter,
        // checkReg,
        checkingDuplictes
    }
}