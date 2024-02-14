class segui{


    constructor(ID,ID_FIN,ID_PROGETTO) {
        this.ID = ID;
        this.ID_FIN=ID_FIN;
        this.ID_PROGETTO=ID_PROGETTO;
        
    }
     
       static from(json) {
        const s = Object.assign(new segui(), json);
        return s;
    }
}
export default segui;
