class documento{


    constructor(ID,ID_progetto,titolo,descrizione,data,prezzo,ID_creatore) {
        this.ID = ID;
        this.ID_progetto=ID_progetto;
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.data=moment(data);
        this.prezzo = prezzo;
        this.ID_creatore=ID_creatore
    }
      /**
     * costruisce un documento da un object
     * @param {*} json 
     * @return {documento} il documento più recente creato
     */
       static from(json) {
        const d = Object.assign(new documento(), json);
        d.data = moment(d.data);
        return d;
    }
}
export default documento;
