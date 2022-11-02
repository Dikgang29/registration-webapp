module.exports = function RegistrationDatabase(db){


    async function insertReg(reg){
        
        const townCode = await db.oneOrNone('select * from reg_cities where reg_code =$1;',[reg.slice(0,2)])
        

        await db.none('insert into reg_numbers (registrations,town_id) values($1,$2);',[reg,townCode.id])
    }

    async function setTownCode(){

        const allCodes = await db.manyOrNone('Select reg_code from reg_cities;');
        return allCodes;
    }

    // async function ifExist(reg){
    //     const existCode = await db.manyOrNone(`SELECT reg_code
    //     FROM reg_cities
    //     WHERE EXISTS
    //     (SELECT * FROM reg_cities WHERE reg_cities.reg_code = $1);`,[reg.slice(0,2)])
    //     console.log(existCode);
    //     // return existCode;
    // }
    
    // all from test table

    async function townFilter(regTownID){
        const fromTown = await db.any('select * from reg_numbers where town_id = $1;',[regTownID]);
        return fromTown;
    }

    // filtering

//     async function getAllReg(){
//      const allReg = await db.manyOrNone('Select * from reg_numbers;')
//      return allReg;
//  }

 async function getAllReg(){
    const allReg = await db.manyOrNone('SELECT DISTINCT registrations FROM reg_numbers;')
    return allReg;
}

    async function deleteAllREg(){
        await db.none('Delete FROM reg_numbers;')
   }


    // //finding duplicates
    // async function checkingDuplictes(reg){
    //     const checkCount = await db.oneOrNone('SELECT COUNT(*) from reg_numbers where registrations = $1;',[reg])
    //     return checkCount.count;
    // }

    async function checkingDuplictes(reg){
        const checkCount = await db.oneOrNone(`SELECT registrations, COUNT(*)
        FROM reg_numbers
        GROUP BY registrations
        HAVING COUNT(*) > 1;`,[reg])
        return checkCount;
    }



    return{
        // getAllTowns,
        getAllReg,
        deleteAllREg,
        insertReg,
        townFilter,
        // checkReg,
        checkingDuplictes,
        setTownCode,
        // ifExist
    }
}