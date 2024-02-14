import finanziatore from './finanziatore.js';
import acquisto from './acquisto.js';

class Api {
    constructor(){
        this.users = [];
        this.acquisti=[];
    }

    static getUserByProjects= async(IDC) =>{
        let response = await fetch('/api/userProg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

            },
            body: JSON.stringify({IDC}),
            
        });
        if(response.ok) {
            const progsJson = await response.json();
            return finanziatore.from(progsJson);
            
        }
        else {
            try {
                const errDetail = await response.json();
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
    }
}

static getUserByID= async(ID) =>{
    let response = await fetch('/api/userID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',

        },
        body: JSON.stringify({IDC}),
        
    });
    if(response.ok) {
        const progsJson = await response.json();
        return finanziatore.from(progsJson);
        
    }
    else {
        try {
            const errDetail = await response.json();
            throw errDetail.message;
        }
        catch(err) {
            throw err;
        }
}
}

async getAcquisti () {
    let response = await fetch('/api/acquisti');
    const purchaseJson = await response.json();
    if (response.ok)
    {
        this.acquisti = purchaseJson.map((a) =>  {return acquisto.from(a);});
          
        return this.acquisti;
    }
    else
    {
        throw purchaseJson;
    }    
}  

    static doLogout = async () => {
        await fetch('api/session/current', {method : 'DELETE'})
    }

  /**
   * Perform the login
   */
  static doLogin= async(username, password) =>{
    let response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    });
    if(response.ok) {
        const username = await response.json();
        return username;
        
    }
    else {
        try {
            const errDetail = await response.json();
            throw errDetail.message;
        }
        catch(err) {
            throw err;
        }
    }
  }
/**
   * ritorna uno specifico utente
   */
  static getUser = async (userId) => {
        let newQuestionJson = {userId: userId}
        let response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newQuestionJson), // stringify removes undefined fields
        });
        if(response.ok) 
        {
            return await response.json();
        }
        else 
        {
            try 
            {
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch(err) 
            {
                if(Array.isArray(err)) 
                {
                    let errors = '';
                    err.forEach((e, i) => errors += `${i}. ${e.msg} for ${e.param}, `);
                    throw `Error: ${errors}`;
                }
                else
                    throw 'Error: cannot parse server response';
            }
        }
    }

    /**
   * Perform the register
   */
async doRegister(finanziatore){
    let response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(finanziatore),
    });
        if(response.ok) {
            const ID = await response.json();
            finanziatore.ID = ID['ID'];
            console.log('received id: ', ID);
            this.users.push (finanziatore);
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

async addAcquisto(acquisto) {
    let response = await fetch('/api/acquisti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(acquisto),});
            if(response.ok) {
                const ID = await response.json();
                acquisto.ID = ID['ID'];
                console.log('received id: ', ID);
                this.acquisti.push (acquisto);
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


 acquistiUtente(IDF){
    return this.acquisti.filter(a => a.ID_FIN==IDF);
 
}
        


    

}


export default Api;