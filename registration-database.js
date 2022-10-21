module.exports = function RegistrationDatabase(db){


    let getReg;
    // async function addREgInDB(reg){
    //     await db.none('INSERT INTO regTest (reg) values ($1);',[reg])
    // }
    async function addREgInDB(reg){
        const townReg = reg.toUpperCase();
        if(townReg.startsWith('NB')){
            await db.none('INSERT INTO regTest (reg) values ($1);',[reg]);
        }else if(townReg.startsWith('ND')){
            await db.none('INSERT INTO regTest (reg) values ($1);',[reg]);
        }else if(townReg.startsWith('NA')){
            await db.none('INSERT INTO regTest (reg) values ($1);',[reg]);
        }else if(townReg.startsWith('NN')){
            await db.none('INSERT INTO regTest (reg) values ($1);',[reg]);
        }
    }

    async function insertReg(reg){
        const townReg = reg.toUpperCase();
        if(townReg.startsWith('NB')){
            await db.none('INSERT INTO reg_numbers (registrations,town_id) values ($1,$2);',[reg,1]);
        }else if(townReg.startsWith('ND')){
            await db.none('INSERT INTO reg_numbers (registrations,town_id) values ($1,$2);',[reg,2]);
        }else if(townReg.startsWith('NA')){
            await db.none('INSERT INTO reg_numbers (registrations,town_id) values ($1,$2);',[reg,3]);
        }else if(townReg.startsWith('NN')){
            await db.none('INSERT INTO reg_numbers (registrations,town_id) values ($1,$2);',[reg,4]);
        }
    }

    async function getAllTowns(){
        const allTowns = await db.manyOrNone('Select * from reg_cities;')
        return allTowns;
    }

    // all from test table

    async function townFilter(regTownID){
        const fromTown = await db.any('select * from reg_numbers where town_id = $1;',[regTownID]);
        return fromTown;
    }

    // filtering

    async function deleteAllREg(){
        await db.none('Delete FROM regTest;')
   }

   async function getAllReg(){
    const allReg = await db.manyOrNone('Select * from reg_numbers;')
    return allReg;
}



    return{
        getAllTowns,
        addREgInDB,
        getAllReg,
        // fromOneTown,
        deleteAllREg,
        insertReg,
        townFilter
    }
}