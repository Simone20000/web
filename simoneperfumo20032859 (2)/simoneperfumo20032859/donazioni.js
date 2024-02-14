'use strict';
const moment = require('moment');
class donazioni{


    constructor(ID,ID_progetto,ID_finanziatore,quantità,data) {
        this.ID = ID;
        this.ID_progetto=ID_progetto;
        this.ID_finanziatore = ID_finanziatore;
        this.quantità = quantità;
        this.data=moment(data);
    }
     
       static from(json) {
        const d = Object.assign(new donazioni(), json);
        d.data = moment(d.data);
        return d;
    }
}
module.exports = donazioni;
