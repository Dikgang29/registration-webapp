'use strict';

module.exports = function Registrations(){

    function regFromKZN(regNumber){

        const reg = regNumber.toUpperCase()
        if(reg.startsWith('NB')){
            return reg;
        }else if(reg.startsWith('ND')){
            return reg;
        }else if(reg.startsWith('NA')){
            return reg;
        }else if(reg.startsWith('NN')){
            return reg
        }
    }

   
    return{
        regFromKZN
    }
}