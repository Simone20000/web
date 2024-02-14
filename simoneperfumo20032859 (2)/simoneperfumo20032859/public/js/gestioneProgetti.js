

import progetto from './PROGETTI.js';
import seguito from './segui.js';

class gestioneProgetti {

    constructor(){
        this.progs = [];
        this.seguiti=[];
    }

    async getSeguiti () {
        let response = await fetch('/api/progetti/segui');
        const purchaseJson = await response.json();
        if (response.ok)
        {
            this.seguiti = purchaseJson.map((s) =>  {return seguito.from(s);});
              
            return this.seguiti;
        }
        else
        {
            throw purchaseJson;
        }    
    }  

     /**
     * Get the list of my progs
     */
     async getprog() {
        let response = await fetch('/api/progetti');
        const progsJson = await response.json();
        if (response.ok) {
            this.progs = progsJson.map((p) =>  {return progetto.from(p);});
          
            return this.progs;
        } else {
            throw progsJson;  // an object with the error coming from the server
        }
    }


    async updateprog(prog) {        
        let response = await fetch(`/api/progetti/${prog.ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prog),
        });
        if(response.ok) {
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

    /**
     * Add a new prog to the list
     * @param {progetto} progetto 
     */
    async addProg(progetto) {
        let response = await fetch('/api/progetti', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(progetto),
            });
                if(response.ok) {
                    const ID = await response.json();
                    progetto.ID = ID['ID'];
                    console.log('received id: ', ID);
                    this.progs.push (progetto);
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

        getHtmlGSeguito(prog, path){
            const outerDiv = document.createElement('div');
            outerDiv.className ='d-flex w-100 justify-content-between';
            const buttonsDiv = document.createElement('div');
            const innerDiv = document.createElement('div');
            innerDiv.className='form-check';
            //add button to follow a prog
            const FollowLink = document.createElement('a');
            const span = document.createElement('span');
            FollowLink.href = `/progetti/${prog.ID}/segui`;
            const imgFollow = document.createElement('img');
            span.innerHTML="smetti di seguire";
            imgFollow.width = 50;
            imgFollow.height = 50;
            imgFollow.classList = 'img-button mr-1 Fol Hprog '+prog.ID;
            imgFollow.src = '/svg/seguiti.svg';
        
            FollowLink.appendChild(imgFollow);
            buttonsDiv.appendChild(FollowLink);
        
            outerDiv.className="svg";
            outerDiv.appendChild(buttonsDiv);
        
            return outerDiv;
            }



    getHtmlDonazioni(prog, path){
            const outerDiv = document.createElement('div');
            outerDiv.className ='d-flex w-100 justify-content-between';
            const buttonsDiv = document.createElement('div');
            const innerDiv = document.createElement('div');
            innerDiv.className='form-check';
            const donationLink = document.createElement('a');
            donationLink.href=`/progetti/${prog.ID}/dona`;
            const imgDonation = document.createElement('img');
            imgDonation.width = 50;
            imgDonation.height = 50
            imgDonation.classList = 'img-button mr-1 Don Hprog '+prog.ID;
            imgDonation.src='/svg/dollaro.svg';
    
            donationLink.appendChild(imgDonation);
            buttonsDiv.appendChild(donationLink);

             //add button to donate/follow a prog
            const FollowLink = document.createElement('a');
            FollowLink.href = `/progetti/${prog.ID}/segui`;
            const imgFollow = document.createElement('img');
            imgFollow.width = 50;
            imgFollow.height = 50;
            imgFollow.classList = 'img-button mr-1 Fol Hprog '+prog.ID;
            imgFollow.src = '/svg/segui.svg';

            FollowLink.appendChild(imgFollow);
            buttonsDiv.appendChild(FollowLink);
    
            outerDiv.className="svg";
            outerDiv.appendChild(buttonsDiv);
    
            return outerDiv;
        }
    /**
         * returns the representation for the current task as a snippet of HTML code
         * @param {*} task the task object
         * @param {*} path the current path (URL)
         */  
    getHtmlNode(prog, path){
        const outerDiv = document.createElement('div');
        outerDiv.className ='d-flex w-100 justify-content-between';
        const buttonsDiv = document.createElement('div');
        const innerDiv = document.createElement('div');
        innerDiv.className='form-check';



        //add button to edit
        const editLink = document.createElement('a');
        editLink.href = `/progetti/${prog.ID}/edit`;
        const imgEdit = document.createElement('img');
        imgEdit.width = 50;
        imgEdit.height = 50;
        imgEdit.classList = 'img-button mr-1';
        imgEdit.src = '/svg/edit.svg';

        editLink.appendChild(imgEdit);
        buttonsDiv.appendChild(editLink);


        // create delete button
        const deleteLink = document.createElement('a');
        deleteLink.href =  `/progetti/${prog.ID}/delete`;
        const imgDelete = document.createElement('img');
        imgDelete.width = 50;
        imgDelete.height = 50;
        imgDelete.src = '/svg/delete.svg';
        imgDelete.classList = 'img-button';

        deleteLink.appendChild(imgDelete);
        buttonsDiv.appendChild(deleteLink);

        outerDiv.className="svg";
        outerDiv.appendChild(buttonsDiv);

        return outerDiv;
    }

    /**
     * Delete a prog
     * 
     * @param {*} id the id of the prog to be deleted
     */
    async deleteProg(ID) {
        let response = await fetch(`/api/progetti/${ID}`, {
            method: 'DELETE',
        });
        if(response.ok) {
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

    async getprogById(id) {
        let response = await fetch(`/api/progetti/${id}`);
        const progsJson = await response.json();
        if (response.ok) {
            this.progs = progsJson.map((p) =>  {return progetto.from(p);});
        }
        else
        {
            throw progsJson;
        }
    }



         /**
     * Return a filtered array, with only the progs done in a specific year
     * @param {*} year 
     */
    getByYear(year) {
        // OPTION 1: filtering the existing progs list, which should be updated periodically
        return this.progs.filter(p => p.data.isBetween(year+'-01-01', year+'-12-31', undefined, []));

        // OPTION 2: calling an API, so that you are sure to have the most updated information
    }

    getTop(){
    this.progs=this.TOP(this.progs);
    console.log(this.progs);
    return this.progs;
    }
    TOP(progs) {
        progs.sort((x,y)=>x.donazioni - y.donazioni);
        progs.reverse();
        var temp=[];
        for(let i=0;i<3;i++){
            temp[i]=progs[i];
        }
        return temp;
    }


    filterByInput(Input){
        return this.progs.filter(p => (p.titolo.includes(Input, undefined, []) || p.descrizione.includes(Input, undefined, [])) );
    } 
       
    /**
     * Ottieni tutti i progetti ordinati per finanziamenti
     */
    filterImportant(){
    this.progs=this.qs(this.progs);
    return this.progs;    
    }
    filterRecenti(){
        this.progs=this.recenti(this.progs);
        console.log(this.progs);
        return this.progs;    
        }

        async addFollow(seguito) {
            let response = await fetch('/api/progetti/segui', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(seguito),});
                    if(response.ok) {
                        const ID = await response.json();
                        seguito.ID = ID['ID'];
                        console.log('received id: ', ID);
                        this.seguiti.push (seguito);
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

        recenti(progs)
        {
            progs.sort((x,y)=>x.data - y.data);
            return progs.reverse();
        }

qs(progs)
{
    progs.sort((x,y)=>x.donazioni - y.donazioni);
    return progs.reverse();
}

getProgSeguiti(seguiti,n){
    let m=this.progs.length;
    console.log(m);
    const temp=[];
    for(let i=0;i<m;i++){
        for(let y=0;y<n;y++){
            if(this.progs[i].ID==seguiti[y].ID_PROGETTO){
                temp.push(this.progs[i])
            }
        }
    }
        return this.progs=temp;
    } 

    SeguitiUtente(IDF){
        return this.seguiti.filter(s => s.ID_FIN==IDF);
    }

    async removeFollow(ID) {
        let response = await fetch(`/api/progetti/segui/${ID}`, {
            method: 'DELETE',
        });
        if(response.ok) {
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
    
}

export default gestioneProgetti;