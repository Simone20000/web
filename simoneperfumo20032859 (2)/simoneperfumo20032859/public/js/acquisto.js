class acquisto{


    constructor(ID,ID_FIN,ID_DOC,data) {
        this.ID = ID;
        this.ID_FIN=ID_FIN;
        this.ID_DOC=ID_DOC;
        this.data=moment(data);
        
    }
       /**
     * costruisce un acquisto da un object
     * @param {*} json 
     * @return {acquisto} l'acquisto più recente creato
     */
       static from(json) {
        const a = Object.assign(new acquisto(), json);
        a.data = moment(a.data);
        return a;
    }
}
export default acquisto;
