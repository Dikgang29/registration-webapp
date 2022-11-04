const assert = require('assert');
const { count } = require('console');
const { get } = require('http');
// const { types } = require('pg-promise/typescript/pg-subset');
const Registration = require('../registration-database');
const pgp = require('pg-promise')();

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://reg_test_admin:registration@localhost:5432/reg_test';

const db = pgp(connectionString);

describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        try {
            // clean the tables before each test run
            await db.none('TRUNCATE TABLE reg_numbers RESTART IDENTITY CASCADE;');
        } catch (err) {
            console.log(err);
            throw err;
        }
    });
    it('should show all the registrations added', async function(){

        let regInDb  = Registration(db);
        await regInDb.insertReg('NA 123-587');
        await regInDb.insertReg('NA 156-77');
        await regInDb.insertReg('NN 235 897');
        
        let addedReg = await regInDb.getAllReg();
        
    assert.deepEqual([
    {id: 1,registrations: 'NA 123-587' , town_id: 3},
    {id: 2,registrations: 'NA 156-77' , town_id: 3},
    {id: 3,registrations: 'NN 235 897' , town_id: 4}
     ], addedReg);
    });

    it('should filter based on the town reg code (Durban)', async function(){

        let regInDb  = Registration(db);
        await regInDb.insertReg('NA 123-587');
        await regInDb.insertReg('NA 156-77');
        await regInDb.insertReg('ND 175 726');
        await regInDb.insertReg('NB 259 769');
        await regInDb.insertReg('ND 459 717');
        await regInDb.insertReg('NN 259 877');
        
        let filter = await regInDb.townFilter(2);
        
    assert.deepEqual([
    {id: 3,registrations: 'ND 175 726' , town_id: 2},
    {id: 5,registrations: 'ND 459 717' , town_id: 2},
    
     ], filter);

    });

    it('should filter based on the town reg code (Newcastle)', async function(){

        let regInDb  = Registration(db);
        await regInDb.insertReg('NA 123-587');
        await regInDb.insertReg('NA 156-77');
        await regInDb.insertReg('ND 175 726');
        await regInDb.insertReg('NB 259 769');
        await regInDb.insertReg('ND 459 717');
        await regInDb.insertReg('NN 259 877');
        
        let filter = await regInDb.townFilter(4);
        
    assert.deepEqual([
    {id: 6,registrations: 'NN 259 877' , town_id: 4},
    
     ], filter);

    });

    it('should filter based on the town reg code (Durban)', async function(){

        let regInDb  = Registration(db);
        await regInDb.insertReg('NA 123-587');
        await regInDb.insertReg('NA 156-77');
        await regInDb.insertReg('ND 175 726');
        await regInDb.insertReg('NB 259 769');
        await regInDb.insertReg('ND 459 717');
        await regInDb.insertReg('NN 259 877');
        
        let filter = await regInDb.townFilter(2);
        
    assert.deepEqual([
    {id: 3,registrations: 'ND 175 726' , town_id: 2},
    {id: 5,registrations: 'ND 459 717' , town_id: 2},
    
     ], filter);

    });

    it('should filter based on the town reg code (Harding)', async function(){

        let regInDb  = Registration(db);
        await regInDb.insertReg('NA 123-587');
        await regInDb.insertReg('NA 156-77');
        await regInDb.insertReg('ND 175 726');
        await regInDb.insertReg('NB 259 769');
        await regInDb.insertReg('ND 459 717');
        await regInDb.insertReg('NN 259 877');
        
        let filter = await regInDb.townFilter(3);
        
    assert.deepEqual([
    {id: 1,registrations: 'NA 123-587' , town_id: 3},
    {id: 2,registrations: 'NA 156-77' , town_id: 3}
    
     ], filter);

    });

    it('should return an empty list if registration from a certain town was not added', async function(){

        let regInDb  = Registration(db);
        await regInDb.insertReg('NA 123-587');
        await regInDb.insertReg('NA 156-77');
        await regInDb.insertReg('ND 175 726');
        await regInDb.insertReg('ND 459 717');
        await regInDb.insertReg('NN 259 877');
        
        let filter = await regInDb.townFilter(1);
        
    assert.deepEqual([], filter);

    });

    it('should clear the list when the delete button is pressed', async function(){

        let regInDb  = Registration(db);
        await regInDb.insertReg('NA 123-587');
        await regInDb.insertReg('NA 156-77');
        await regInDb.insertReg('ND 175 726');
        await regInDb.insertReg('ND 459 717');
        await regInDb.insertReg('NN 259 877');
        
        
        await regInDb.deleteAllREg();
        let addedReg = await regInDb.getAllReg();
        
    assert.deepEqual([],addedReg);

    });
    after(function(){
        db.$pool.end
    })
});