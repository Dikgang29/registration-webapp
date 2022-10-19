module.exports = function RegistrationDatabase(db){


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

    async function checkAll(){
        const allTowns = await db.manyOrNone('Select * from reg_cities;')
        return allTowns;
    }

    // all from test table
    async function allTests(){
        const allReg = await db.manyOrNone('Select * from regTest;')
        return allReg;
    }

    // filtering

    async function fromOneTown(townValue){
        if(townValue === 'NB'){
            const fromBergVille = await db.manyOrNone(`Select * from regTest where reg LIKE 'NB%';`);
            return fromBergVille;
        } else if(townValue === 'ND'){
            const fromDurban = await db.manyOrNone(`Select * from regTest where reg LIKE 'ND%';`);
            return fromDurban;
        }else if(townValue === 'NA'){
            const fromHarding = await db.manyOrNone(`Select * from regTest where reg LIKE 'NA%';`);
            return fromHarding;
        }else if(townValue === 'NN'){
            const fromNewcastle = await db.manyOrNone(`Select * from regTest where reg LIKE 'NN%';`);
            return fromNewcastle;
        }
    }


    return{
        checkAll,
        addREgInDB,
        allTests,
        fromOneTown
    }
}