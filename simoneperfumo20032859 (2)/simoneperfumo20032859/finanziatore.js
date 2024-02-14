class finanziatore{

    constructor(ID,creatore,nome,cognome,email,password) {
        this.ID = ID;
        this.creatore = creatore;
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.password = password;
        
    }

    
      static from(json) {
        const f = Object.assign(new finanziatore(), json);
        return f;
    }

}

module.exports = finanziatore;