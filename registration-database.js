module.exports = function RegistrationDatabase(db){


    async function addREgInDB(reg){
        await db.none('INSERT INTO regTest (reg) values ($1);',[reg])
    }

    async function checkAll(){
        const allTowns = await db.manyOrNone('Select * from reg_cities;')
        return allTowns
    }

    // all from test table
    async function allTests(){
        const allReg = await db.manyOrNone('Select * from regTest;')
        return allReg;
    }


    return{
        checkAll,
        addREgInDB,
        allTests
    }
}