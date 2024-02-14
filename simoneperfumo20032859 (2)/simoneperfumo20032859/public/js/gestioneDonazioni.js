import donazione from './donazioni.js';

class gestioneDonazioni {

    constructor(){
        this.donations = [];
    }

    /**
     * Get the list of docs for prog ID
     */
 async getDonByID(ID) {
    let response = await fetch(`/api/donazioni/${ID}`);
    const donJson = await response.json();

    if (response.ok) {
        this.donations = donJson.map((d) =>  {return donazione.from(d);});
      
        this.donations=this.ordinati(this.donations);
        return this.donations;
    } else {
        throw donJson;  // an object with the error coming from the server
    }
}

    async addDonation(donazione) {
        let response = await fetch('/api/donazioni', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donazione),});
                if(response.ok) {
                    const ID = await response.json();
                    donazione.ID = ID['ID'];
                    console.log('received id: ', ID);
                    this.donations.push (donazione);
                    return;
                } 
                else {
                    try {
                        const errDetail = await response.json();
                        throw errDetail.errors;
                    }
                    catch(err) {
                        if(Array.isArray(err)) {
                            let errors = '';
                            err.forEach((e, i) => errors += `${i}. ${e.msg} for '${e.param}', `);
                            throw `Error: ${errors}`;
                        }
                        else
                            throw 'Error: cannot parse server response';
                    }
                }
            }



ordinati(don)
        {
            don.sort((x,y)=>x.data - y.data);
            return don.reverse();
        }
    }


        export default gestioneDonazioni;