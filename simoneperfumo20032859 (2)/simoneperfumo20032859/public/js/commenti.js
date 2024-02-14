class commento{

    constructor(ID,ID_commentatore,ID_documento,testo,data) {
        this.ID = ID;
        this.ID_commentatore=ID_commentatore;
        this.ID_documento=ID_documento;
        this.testo = testo;
        this.data=moment(data);
    }

       /**
     * costruisce un commento da un object
     * @param {*} json 
     * @return {commento} il commento più recente creato
     */
     static from(json) {
        const d = Object.assign(new commento(), json);
        d.data = moment(d.data);
        return d;
    }
    }

    export default commento;