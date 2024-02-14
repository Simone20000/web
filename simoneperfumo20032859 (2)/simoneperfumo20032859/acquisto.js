'use strict';
const moment = require('moment');
class acquisto{


    constructor(ID,ID_FIN,ID_DOC,data) {
        this.ID = ID;
        this.ID_FIN=ID_FIN;
        this.ID_DOC=ID_DOC;
        this.data=moment(data);
    }
      
       static from(json) {
        const a = Object.assign(new acquisto(), json);
        a.data = moment(a.data);
        return a;
       }
}
module.exports = acquisto;