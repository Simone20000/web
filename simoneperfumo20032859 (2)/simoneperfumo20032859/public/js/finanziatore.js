class finanziatore{

    constructor(ID,creatore,nome,cognome,email,password) {
        this.ID = ID;
        this.creatore = creatore;
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.password = password;
        
    }

      /**
     * costruisce un finanziatore da un object
     * @param {*} json 
     * @return {finanziatore} il finanziatore più recente creato
     */
      static from(json) {
        const f = Object.assign(new finanziatore(), json);
        return f;
    }
}

export default finanziatore;