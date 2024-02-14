import documento from './documenti.js';

class gestioneDocumenti {

    constructor(){
        this.docs = [];
    }

 /**
     * Get the list of docs for prog ID
     */
 async getDocByID(ID) {
    let response = await fetch(`/api/documenti/${ID}`);
    const docsJson = await response.json();

    if (response.ok) {
        this.docs = docsJson.map((d) =>  {return documento.from(d);});
      
        this.docs=this.ordinati(this.docs);
        return this.docs;
    } else {
        throw docsJson;  // an object with the error coming from the server
    }
}

async getDocs() {
    let response = await fetch(`/api/documenti`);
    const docsJson = await response.json();

    if (response.ok) {
        this.docs = docsJson.map((d) =>  {return documento.from(d);});
      
        return this.docs;

    } else {
        throw docsJson;  // an object with the error coming from the server
    }
}
ordinati(docs)
        {
            docs.sort((x,y)=>x.data - y.data);
            return docs.reverse();
        }
    /**
     * Add a new doc to the list
     * @param {documento} documento 
     */
async addDoc(documento) {
    let response = await fetch('/api/documenti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(documento),});
            if(response.ok) {
                const ID = await response.json();
                documento.ID = ID['ID'];
                console.log('received id: ', ID);
                this.docs.push (documento);
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

        getHtmlNode(doc, path){
            const outerDiv = document.createElement('div');
            outerDiv.className ='d-flex w-100 justify-content-between';
            const buttonsDiv = document.createElement('div');
            const innerDiv = document.createElement('div');
            innerDiv.className='form-check';
    
    
    
            //add button to edit
            const editLink = document.createElement('a');
            editLink.href = `/documenti/${doc.ID}/edit`;
            const imgEdit = document.createElement('img');
            imgEdit.width = 50;
            imgEdit.height = 50;
            imgEdit.classList = 'img-button mr-1';
            imgEdit.src = '/svg/edit.svg';
    
            editLink.appendChild(imgEdit);
            buttonsDiv.appendChild(editLink);
    
    
            // create delete button
            const deleteLink = document.createElement('a');
            deleteLink.href =  `/documenti/${doc.ID}/delete`;
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
        getHtmlDonazioni(doc, path){
            const outerDiv = document.createElement('div');
            outerDiv.className ='d-flex w-100 justify-content-between';
            const buttonsDiv = document.createElement('div');
            const innerDiv = document.createElement('div');
            innerDiv.className='form-check';
            const donationLink = document.createElement('a');
            
            donationLink.href=`/documenti/${doc.ID}/acquista`;
            const imgDonation = document.createElement('img');
            imgDonation.width = 50;
            imgDonation.height = 50
            imgDonation.classList = 'img-button mr-1';
            imgDonation.src='/svg/dollaro.svg';
    
            donationLink.appendChild(imgDonation);
            buttonsDiv.appendChild(donationLink);

            //add button to donate
            const commentLink = document.createElement('a');
            commentLink.href = `/commenti/${doc.ID}`;
            const imgComment = document.createElement('img');
            imgComment.width = 50;
            imgComment.height = 50;
            imgComment.classList = 'img-button mr-1';
            imgComment.src = '/svg/comment.svg';
    
            commentLink.appendChild(imgComment);
            buttonsDiv.appendChild(commentLink);
    
            outerDiv.className="svg";
            outerDiv.appendChild(buttonsDiv);
    
            return outerDiv;
        }
        getHtmlCommenti(doc, path){
            const outerDiv = document.createElement('div');
            outerDiv.className ='d-flex w-100 justify-content-between';
            const buttonsDiv = document.createElement('div');
            const innerDiv = document.createElement('div');
            innerDiv.className='form-check';
            //add button to comment
            const commentLink = document.createElement('a');
            commentLink.href = `/commenti/${doc.ID}`;
            const imgComment = document.createElement('img');
            imgComment.width = 50;
            imgComment.height = 50;
            imgComment.classList = 'img-button mr-1';
            imgComment.src = '/svg/comment.svg';
    
            commentLink.appendChild(imgComment);
            buttonsDiv.appendChild(commentLink);
    
            outerDiv.className="svg";
            outerDiv.appendChild(buttonsDiv);
    
            return outerDiv;
        }

        async updatedoc(doc) {        
            let response = await fetch(`/api/documenti/${doc.ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(doc),
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
        async deleteDoc(ID) {
            let response = await fetch(`/api/documenti/${ID}`, {
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
        getDocsAcquisti(acquisti,n){
            let m=this.docs.length;
            const temp=[];
            for(let i=0;i<m;i++){
                for(let y=0;y<n;y++){
                    if(this.docs[i].ID==acquisti[y].ID_DOC){
                        temp.push(this.docs[i])
                    }
                }
            }
                return this.docs=temp;
            } 
    
}
export default gestioneDocumenti;