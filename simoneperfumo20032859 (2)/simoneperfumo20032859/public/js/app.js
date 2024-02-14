import gestisciProg from './gestioneProgetti.js';
import Filter from './filter.js';
import progetto from './PROGETTI.js';
import page from '//unpkg.com/page/page.mjs';
import userPage from './templates/user-template.js';
import index from './templates/progetti-template.js';
import {createLogin, createUser} from './templates/nav-template.js';
import Api from './api.js';
import createAlert from './templates/alert-template.js';
import {createAddForm,createAddDocForm,donationForm,purchaseForm,createLoginForm,createRegisterForm,createAddCommentForm,Commform,docform} from './templates/form-template.js';
import finanziatore from './finanziatore.js';
import gestioneDocumenti from './gestioneDocumenti.js'
import documento from './documenti.js';
import donazione from './donazioni.js';
import gestioneCommenti from './gestioneCommenti.js';
import commento from './commenti.js'
import {infoForm,listDon} from './templates/info-template.js'
import footerr from './templates/footer-template.js';
import gestioneDonazioni from './gestioneDonazioni.js';
import acquisto from './acquisto.js';
import segui from './segui.js';




class App {
    constructor(appContainer,navbarUser,footer) {
        this.appContainer = appContainer;
        this.navbarUser = navbarUser;
        this.gestisciProg = new gestisciProg();
        this.Api=new Api();
        this.gestioneDocumenti=new gestioneDocumenti();
        this.gestioneCommenti=new gestioneCommenti();
        this.footer=footer;
        this.footer.innerHTML=footerr();
        this.gestioneDonazioni=new gestioneDonazioni();
        

          // routing
          page('/',  async() => {
            page('/progetti');
        });
        page('/logout', async()=>{
            this.loggedIn=0;
            await Api.doLogout();
            this.navbarUser.innerHTML = createLogin();
            sessionStorage.clear('userID');
            page.redirect('/');
        });
        page('/progetti', async(ctx) => {
            if(sessionStorage.getItem('userID')!=null){
                this.navbarUser.innerHTML = createUser();
            }
            else{
                this.navbarUser.innerHTML = createLogin();
            }
            await this.showAllProgetti(ctx.path);
        });
        page('/progetti/:ID/delete', (ctx) => {
            this.deleteProg(ctx.params.ID);
        });
        page('/progetti/:filter', (ctx) => {
            this.showFilteredProgs(ctx.params.filter, ctx.path);
        });
        page('/progetti/:ID/edit', (ctx) => {
            this.showAddEditForm(ctx.params.ID);
        });
        page('/progetti/:ID/segui', (ctx) => {
            sessionStorage.setItem('progID',ctx.params.ID);
            this.seguiProg(ctx.params.ID);
        });
        page('/documenti/:ID', (ctx) => {
            sessionStorage.setItem('progID',ctx.params.ID)
            this.showProgDoc(ctx.params.ID,ctx.path);
        });
        page('/documenti/:ID/edit', (ctx) => {
            this.showAddEditFormDoc(ctx.params.ID);
        });
        page('/documenti/:ID/delete', (ctx) => {
            this.deleteDoc(ctx.params.ID);
        });
        page('/documenti/:ID/acquista', (ctx) => {
            sessionStorage.setItem('docID',ctx.params.ID);
            this.showPurchaseForm(ctx.params.ID,ctx.path);
        });
        page('/progetti/:ID/dona', (ctx) => {
            sessionStorage.setItem('progID',ctx.params.ID)
            this.showDonationForm(ctx.params.ID,ctx.path);
        });
        page('/login', () => {
            this.navbarUser.innerHTML = createLogin();
            this.appContainer.innerHTML = '';
            this.appContainer.insertAdjacentHTML('beforeend', createLoginForm());
            document.getElementById('login-form').addEventListener('submit', this.onLoginSubmitted);
        });
        page('/register', () => {
            this.appContainer.innerHTML = '';
            this.appContainer.insertAdjacentHTML('beforeend', createRegisterForm());
            document.getElementById('register-form').addEventListener('submit', this.onRegisterSubmitted);
        });
        page('/profile', (ctx) => 
        {
            this.appContainer.innerHTML = '';
            this.appContainer.insertAdjacentHTML('beforeend', userPage());
            this.showUser();
        }); 
        page('/profile/:filter', (ctx) => 
        {
            this.showFilteredUser(ctx.params.filter, ctx.path);
        });
        page('/commenti/:ID', (ctx) => {
            sessionStorage.setItem('docID',ctx.params.ID)
            this.showAllComments(ctx.params.ID);
        });
        page('/commenti/:ID/edit', (ctx) => {
            this.showAddEditFormComment(ctx.params.ID);
        });
        page('/commenti/:ID/delete', (ctx) => {
            this.deleteComment(ctx.params.ID);
        });
        page('/info', (ctx) => {
            this.appContainer.innerHTML = infoForm();
        });
        page('/listDonazioni/:ID', (ctx) => {
            this.showListDon(ctx.params.ID,ctx.path);
        });
        page();
    }

    /**
     * Inizializza la lista dei donatori
     * 
     * @param {*} ID ID del progetto a cui appartengono le donazioni
     */
    /*async initFormDoc(ID){
        this.appContainer.innerHTML = '';
        this.appContainer.innerHTML = listDon();
        await this.gestioneDonazioni.getDonByID(ID);
        console.log(this.gestioneDonazioni.donations);
        this.donContainer=document.getElementById('listdon');
  }/*
 /**
     * Inizializza add form del commento 
     * 
     * @param {*} ID ID del progetto a cui appartengono i documento
     */
    async initFormDoc(ID){
        const UID=sessionStorage.getItem("userID");
        this.appContainer.innerHTML = '';
        this.appContainer.innerHTML = docform();
        if(UID==ID){
            document.getElementById("nuovoDocumento").hidden=false;
        }
        await this.gestioneDocumenti.getDocByID(ID);
        console.log(this.gestioneDocumenti.docs);
        this.docContainer=document.getElementById('my-docs');
        document.getElementById('add-form1').addEventListener('submit', this.onFormDocSubmitted);
  }
 /**
     * Inizializza add form del commento 
     * 
     * @param {*} ID ID del documento a cui appartengono i commenti
     */
  async initFormCom(ID){
    this.appContainer.innerHTML = '';
    this.appContainer.innerHTML = Commform();
    await this.gestioneCommenti.getComments(ID);
    this.comContainer=document.getElementById('comments');
    document.getElementById('add-form3').addEventListener('submit', this.onFormCommentSubmitted);
}

    /**
     * Inizializza add form del progetto 
     * 
     * 
     */
    async initForm(){
        this.appContainer.innerHTML = index();
        await this.Api.getAcquisti();
        await this.gestisciProg.getprog();
        await this.gestisciProg.getSeguiti();
        await this.gestioneDocumenti.getDocs();
        this.progContainer=document.getElementById('my-progs');
        document.getElementById('add-form').addEventListener('submit', this.onFormSubmitted)
        document.getElementById('add-formi').addEventListener('submit', this.searchForm)
        this.progSidebar = document.querySelector("#prog-side-bar");    
        this.titleContainer = document.querySelector("#title");
  }
    /**
     * Init the "user" Page
     * 
     * @param {*} form the HTML element representing the form
     */
    async initUser(){
        await this.Api.getAcquisti();
        await this.gestisciProg.getprog();
        await this.gestisciProg.getSeguiti();
        await this.gestioneDocumenti.getDocs();
  }

/**
     * passa i dati alla funzione di ricerca 
     * @param {*} event quando viene inviata la ricerca
     * @param {*} path il path corrente (URL)
     */
  searchForm= async(event,path) =>{
    this.appContainer.innerHTML = index();
    this.progContainer=document.getElementById('my-progs');
    event.preventDefault();
    const addForm = document.getElementById('add-formi');
    const ID = addForm.elements['myInput'].value;
    const progs=this.gestisciProg.filterByInput(ID)    
    console.log(progs); 
    this.showProgetti(progs, path);
}

     /**
     * rimuove tutti i filtri dai progetti
     */
     resetFilters(){
         
        // reset the selection sidebar to the first element for consistency
        this.progSidebar.querySelector('a.active').classList.remove('active');
        this.progSidebar.querySelector('a').classList.add('active');
        // reset the title
        this.titleContainer.innerText="Tutti";
    }

    /**
     * mostra i progetti filtrati
     * @param {*} filter il filtro corrente
     * @param {*} path il path corrente (URL)
     */
    showFilteredProgs = async (filter, path) => {
        await this.initForm();
        let filterSideBar = document.getElementById('prog-side-bar');

        const filters = new Filter(filterSideBar, this.gestisciProg);
        
        const {progs, title} = filters.onFilterSelected(filter);

        // set the page title
        const pageTitle = document.getElementById('filter-title');
        pageTitle.innerText = title;

        // show all the progs again!
        this.showProgetti(progs, path);
    }

    /**
     * mostra i campi dell'utente filtrati
     * @param {*} filter il filtro corrente
     */
    showFilteredUser = async (filter) => {
        document.getElementById("progetti1").hidden=false;
        document.getElementById("documenti1").hidden=false;
        document.getElementById("seguiti").hidden=false;
        let filterTitle = '';
        switch(filter){
            case('documenti'):
            document.getElementById("progetti1").hidden=true;
            document.getElementById("documenti1").hidden=false;
            document.getElementById("seguiti").hidden=true;
            filterTitle = 'I Tuoi Documenti';
            break;
            case('progetti'):
            document.getElementById("progetti1").hidden=false;
            document.getElementById("documenti1").hidden=true;
            document.getElementById("seguiti").hidden=true;
            filterTitle = 'I Tuoi Progetti';
            break;
            case('seguiti'):
            document.getElementById("progetti1").hidden=true;
            document.getElementById("documenti1").hidden=true;
            document.getElementById("seguiti").hidden=false;
            filterTitle = 'Progetti Seguiti';
            break;
        }
        console.log(filterTitle);
        const pageTitle = document.getElementById('filter-title');
        pageTitle.innerText = filterTitle;
    }

    /**
     * genera il form per modificare un progetto inserendo i dati negli input
     *  @param {*} ID è lID del progetto da modificare
     */
    showAddEditForm = async(ID) => {
        if(sessionStorage.getItem('userID')!==null){
            this.appContainer.innerHTML = createAddForm();
            document.getElementById('error-messages').innerHTML = createAlert('success', `benvenuto nella modifica progetto`);
            setTimeout(() => {
                document.getElementById('error-messages').innerHTML = '';
            }, 3000);
         }
    if(ID !== undefined) {
        if(this.gestisciProg.progs.length === 0)
            await this.gestisciProg.getprog();

        // find the task with the same id     
        const progetti = this.gestisciProg.progs.filter((t) => (t.ID == ID));
        const prog = progetti[0];
        const addForm = document.getElementById('add-form');
        addForm.elements['form-ID'].value = prog.ID;
        addForm.elements['form-titolo'].value=prog.titolo;
        addForm.elements['form-categoria'].value=prog.categoria;
        addForm.elements['form-immagine'].value=prog.immagine;
        addForm.elements['form-descrizione'].value=prog.descrizione;
        }
   
   // set up form callback
        document.getElementById('add-form').addEventListener('submit', this.onFormSubmitted);
    }
   
    /**
     * prende i dati dal form per modificare o agigungere un progetto
     * @param {*} event 
     */
    onFormSubmitted = async (event) => { 
        event.preventDefault();
        const addForm = document.getElementById('add-form');
        const dat = new Date();
        var datt = dat.getFullYear()+'/'+(dat.getMonth()+1)+'/'+(dat.getDate()+1);
        const don=0;
        const ID = addForm.elements['form-ID'].value;
        const progs = this.gestisciProg.progs.filter((q) => (q.ID == ID));
             const progett = progs[0];

                if(addForm.elements['form-ID'].value && addForm.elements['form-ID'].value !== ""){
                    document.getElementById('add-form').addEventListener('submit', this.onFormSubmitted);
                    const titolo = addForm.elements['form-titolo'].value;
                    const categoria = addForm.elements['form-categoria'].value;
                    const immagine = addForm.elements['form-immagine'].value;
                    const descrizione = addForm.elements['form-descrizione'].value;
                    const data = progett.data.format('YYYY-MM-DD');
                    const donazione = progett.donazioni;
                    const IDP =progett.ID_creatore;
                    //there is a task id -> update
                    const id = addForm.elements['form-ID'].value;
                    const proghy =new progetto(id,IDP, titolo, data,categoria,immagine,descrizione,donazione);
                    this.gestisciProg.updateprog(proghy).then(() => {     
                        //reset the form and go back to the home
                        
                        addForm.reset();
                        page('/profile');
                        document.getElementById('error-messages').innerHTML = createAlert('success', `Progetto modificato con successo`);
                         setTimeout(() => {
                         document.getElementById('error-messages').innerHTML = '';
                         }, 3000);
                    })
                    .catch((error) => {
                        // add an alert message in DOM
                        document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                        }
                    );
                }
                else {  
                    const titolo = addForm.elements['form-titolo'].value;
                    const categoria = addForm.elements['form-categoria'].value;
                    const immagine = addForm.elements['form-immagine'].value;
                    const descrizione = addForm.elements['form-descrizione'].value;
                    
                    //the id is empty -> add
                    const prog = new progetto(undefined,undefined, titolo, datt,categoria,immagine,descrizione,don);
                    
                    await this.gestisciProg.addProg(prog).then(() => {
                        document.getElementById('error-messages').innerHTML = createAlert('success', `progetto aggiunto con successo`);
                        setTimeout(() => {
                        document.getElementById('error-messages').innerHTML = '';
                        }, 3000);
                        }).catch((error) => {
                            // add an alert message in DOM
                            document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                            }
                        );
                        document.getElementById('close-modal').click();
                        addForm.reset();
                        page('/');
                        
                    };     
            }   
 /**
     * genera il form per modificare un documento inserendo i dati negli input
     *  @param {*} ID è ID del documento da modificare
     */
    showAddEditFormDoc = async(ID) => {
        if(sessionStorage.getItem('userID')!=null){
            this.appContainer.innerHTML = createAddDocForm();
            document.getElementById('error-messages').innerHTML = createAlert('success', 'benvenuto nella modifica documento');
            setTimeout(() => {
                document.getElementById('error-messages').innerHTML = '';
            }, 3000);
         }
    if(ID !== undefined) {
        if(this.gestioneDocumenti.docs.length === 0)
            await this.gestioneDocumenti.getDoc();

        // find the task with the same id
        const documenti = this.gestioneDocumenti.docs.filter((t) => (t.ID == ID));
        const doc = documenti[0];
        const addForm = document.getElementById('add-form1');
        addForm.elements['form-ID1'].value = doc.ID;
        addForm.elements['form-titolo1'].value=doc.titolo;
        addForm.elements['form-descrizione1'].value=doc.descrizione;
        addForm.elements['form-prezzo1'].value=doc.prezzo;
        }

   // set up form callback
   document.getElementById('add-form1').addEventListener('submit', this.onFormDocSubmitted);
}
/**
     * prende i dati dal form per modificare o aggiungere un documento
     * @param {*} event 
     */
    onFormDocSubmitted= async (event) => {
        const IDP=sessionStorage.getItem('progID');
        const UID=sessionStorage.getItem('userID');
        event.preventDefault();
        const addForm = document.getElementById('add-form1');
        const dat = new Date();
        const datt= dat.getFullYear()+ "/" + (dat.getMonth()+1)+'/'+(dat.getDate()+1); 
        const ID = addForm.elements['form-ID1'].value;
        const docs = this.gestioneDocumenti.docs.filter((q) => (q.ID == ID));
        const docum = docs[0];
        if(addForm.elements['form-ID1'].value && addForm.elements['form-ID1'].value !== ""){
            document.getElementById('add-form1').addEventListener('submit', this.onFormDocSubmitted);
            const titolo = addForm.elements['form-titolo1'].value;
            const descrizione = addForm.elements['form-descrizione1'].value;
            const prezzo = addForm.elements['form-prezzo1'].value;
            const data = docum.data.format('YYYY-MM-DD');
            //there is a task id -> update
            const id = addForm.elements['form-ID1'].value;
            const dochy =new documento(id,IDP, titolo,descrizione, data,prezzo,UID);
            this.gestioneDocumenti.updatedoc(dochy).then(() => {     
                //reset the form and go back to the home
                
                addForm.reset();
                page(`/documenti/${IDP}`);
                document.getElementById('error-messages').innerHTML = createAlert('success', `documento modificato con successo`);
                 setTimeout(() => {
                 document.getElementById('error-messages').innerHTML = '';
                 }, 3000);
            })
            .catch((error) => {
                // add an alert message in DOM
                document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                }
            );
        }
        else{
        const titolo = addForm.elements['form-titolo1'].value;
        const descrizione = addForm.elements['form-descrizione1'].value;
        const prezzo = addForm.elements['form-prezzo1'].value;
        const dochy =new documento(undefined,IDP, titolo,descrizione, datt,prezzo,UID);
        console.log(dochy);
        this.gestioneDocumenti.addDoc(dochy).then(() => {     
        //reset the form and go back to the home
        addForm.reset();
        document.getElementById('error-messages').innerHTML = createAlert('success', `documento aggiunto con successo`);
        setTimeout(() => {
        document.getElementById('error-messages').innerHTML = '';
        }, 3000);
        document.getElementById('close-modal1').click();
        page(`/documenti/${IDP}`); 
        })
        .catch((error) => {
        // add an alert message in DOM
        document.getElementById('error-messages').innerHTML = createAlert('danger', error);
            });
        }
    }

    showAddEditFormComment = async(ID) => {
        if(sessionStorage.getItem('userID')!=null){
            this.appContainer.innerHTML = createAddCommentForm();
            document.getElementById('error-messages').innerHTML = createAlert('success', 'benvenuto nella modifica commento');
            setTimeout(() => {
                document.getElementById('error-messages').innerHTML = '';
            }, 3000);
         }
    if(ID !== undefined) {
        if(this.gestioneCommenti.comments.length === 0)
            await this.gestioneCommenti.getComments();

        // find the task with the same id
        const commenti = this.gestioneCommenti.comments.filter((t) => (t.ID == ID));
        const comment = commenti[0];
        const addForm = document.getElementById('add-form3');
        addForm.elements['form-ID3'].value = comment.ID;
        addForm.elements['form-testo'].value=comment.testo;
        }
   // set up form callback
   document.getElementById('add-form3').addEventListener('submit', this.onFormCommentSubmitted);
}
    
    onFormCommentSubmitted= async (event) => {
        const IDD=sessionStorage.getItem('docID')
        console.log(IDD);
        event.preventDefault();
        const addForm = document.getElementById('add-form3');
        const dat = new Date();
        const datt= dat.getFullYear()+ "/" + (dat.getMonth()+1)+'/'+(dat.getDate()+1);
        if(addForm.elements['form-ID3'].value && addForm.elements['form-ID3'].value !== ""){
            document.getElementById('add-form3').addEventListener('submit', this.onFormCommentSubmitted);
            const id = addForm.elements['form-ID3'].value;
            const testo = addForm.elements['form-testo'].value;
            const commy =new commento(id,undefined,IDD,testo, datt);
            this.gestioneCommenti.updateComment(commy).then(() => {     
                //reset the form and go back to the home
                
                addForm.reset();
                page(`/commenti/${IDD}`);
                document.getElementById('error-messages').innerHTML = createAlert('success', `commento modificato con successo`);
                 setTimeout(() => {
                 document.getElementById('error-messages').innerHTML = '';
                 }, 3000);
                 document.getElementById('close-modal3').click();
            })
            .catch((error) => {
                // add an alert message in DOM
                document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                }
            );
        }
        else{
        const testo = addForm.elements['form-testo'].value;
        const commy =new commento(undefined,undefined,IDD,testo, datt);
        console.log(commy);
        this.gestioneCommenti.addComment(commy).then(() => {    
        //reset the form and go back to the home
        document.getElementById('close-modal3').click();
        addForm.reset();
        document.getElementById('error-messages').innerHTML = createAlert('success', `commento aggiunto con successo`);
        setTimeout(() => {
        document.getElementById('error-messages').innerHTML = '';
        }, 3000);
        page(`/commenti/${IDD}`); 
        })
        .catch((error) => {
        // add an alert message in DOM
        document.getElementById('error-messages').innerHTML = createAlert('danger', error);
            });
        }
    }


  /**
     * Cancella un Progetto
     * @param {*} ID ID del progetto da cancellare
     * @param {*} path il path corrente (URL)
     */
    deleteProg = async (ID,path) => {
        await this.gestisciProg.deleteProg(ID);
        page('/progetti');
    }    
    /**
     * Cancella un Progetto
     * @param {*} ID ID del progetto da cancellare
     * @param {*} path il path corrente (URL)
     */
    deleteFollow = async (ID,path) => {
        await this.gestisciProg.removeFollow(ID);
        page('/profile');
    }   

    async showUser(path){
        await this.initUser();
        this.progContainer=document.getElementById('myprogetti');
        this.docContainer=document.getElementById('mydocumenti');
        this.seguiti=document.getElementById('pSeguiti');
        let counter=0;
        const IDF=sessionStorage.getItem("userID");
        const segui=this.gestisciProg.SeguitiUtente(IDF);
        const Pseguiti=this.gestisciProg.getProgSeguiti(segui,segui.length);
        await this.gestisciProg.getprogById(IDF);
        const progs=this.gestisciProg.progs;
        const acqui=this.Api.acquistiUtente(IDF);
        const docs=this.gestioneDocumenti.getDocsAcquisti(acqui, acqui.length);
            for(const prog of progs) {
                counter++;
                
                const divp=document.createElement('div');
                const a=document.createElement('a');
                const aIDC=document.createElement('a');
                a.href=`/documenti/${prog.ID}`;
    
                const pTitolo = document.createElement('h3');
                pTitolo.innerText = prog.titolo;
    
                const pDate = document.createElement('div');
                pDate.innerText = prog.data.format('YYYY/MM/DD');
    
                const pCategoria = document.createElement('i');
                pCategoria.innerText = prog.categoria;
    
                const pDescrizione = document.createElement('h4');
                pDescrizione.innerText = prog.descrizione;
    
                const pDonazioni = document.createElement('div');
                pDonazioni.innerText = prog.donazioni;
                
                // const tdSVG= this.gestisciProg.getHtmlNode(prog);
                const pSVG= this.gestisciProg.getHtmlNode(prog);
                

                a.appendChild(pTitolo);
                a.appendChild(pDescrizione);
                divp.appendChild(aIDC);
                divp.appendChild(a);
                divp.appendChild(pDate);
                divp.appendChild(pDonazioni);
                divp.appendChild(pSVG);
                divp.className=`flexbox-item IM flexbox-item${counter}`;
                this.progContainer.appendChild(divp);
        }
        let counter2=0;
        for(const doc of docs) {
                counter2++;
                const divd=document.createElement('div');
    
                const dTitolo = document.createElement('h3');
                dTitolo.innerText = doc.titolo;
    
                const dDescrizione = document.createElement('h3');
                dDescrizione.innerText = doc.descrizione;
    
                const dDate = document.createElement('div');
                dDate.innerText = doc.data.format('YYYY/MM/DD');
    
                const dprezzo = document.createElement('div');
                dprezzo.innerText = doc.prezzo;
                
                const dollaro= this.gestioneDocumenti.getHtmlCommenti(doc);
    
                divd.appendChild(dTitolo);
                divd.appendChild(dDescrizione);
                divd.appendChild(dDate);
                divd.appendChild(dprezzo);
                divd.appendChild(dollaro);
                divd.className=`flexbox-item flexbox-item${counter}`;
                this.docContainer.appendChild(divd);
            }
            for(const seguito of Pseguiti) {
                counter++;
                
                const divs=document.createElement('div');
                const a=document.createElement('a');
                const aIDC=document.createElement('a');
                a.href=`/progetti/${seguito.ID}/info`;
    
                const pTitolo = document.createElement('h3');
                pTitolo.innerText = seguito.titolo;
    
                const pDate = document.createElement('div');
                pDate.innerText = seguito.data.format('YYYY/MM/DD');
    
                const pCategoria = document.createElement('i');
                pCategoria.innerText = seguito.categoria;
    
                const pDescrizione = document.createElement('h4');
                pDescrizione.innerText = seguito.descrizione;
    
                const pDonazioni = document.createElement('div');
                pDonazioni.innerText = seguito.donazioni;
                
                // const tdSVG= this.gestisciProg.getHtmlNode(seguito);
                const pSVG= this.gestisciProg.getHtmlGSeguito(seguito);
                

                a.appendChild(pTitolo);
                a.appendChild(pDescrizione);
                divs.appendChild(aIDC);
                divs.appendChild(a);
                divs.appendChild(pDate);
                divs.appendChild(pDonazioni);
                divs.appendChild(pSVG);
                divs.className=`flexbox-item IM flexbox-item${counter}`;
                this.seguiti.appendChild(divs);
        }
        }

    deleteDoc= async (ID,path) => {
        const IDP=sessionStorage.getItem('progID')
        await this.gestioneDocumenti.deleteDoc(ID);
        page(`/documenti/${IDP}`);
    }  
    
    deleteComment= async (ID,path) => {
        const IDD=sessionStorage.getItem('docID')
        await this.gestioneCommenti.deleteComment(ID);
        page(`/commenti/${IDD}`);
    }  

    showProgDoc= async (ID,path) => {
        await this.initFormDoc(ID);
        this.showDocumenti(this.gestioneDocumenti.docs, path);
    }

    showListDon= async (ID,path) => {
        this.appContainer.innerHTML = '';
        this.appContainer.innerHTML = listDon();
        await this.gestioneDonazioni.getDonByID(ID);
        console.log(this.gestioneDonazioni.donations);
        this.donContainer=document.getElementById('listdon');
        this.showDonation(this.gestioneDonazioni.donations, path);
    }

     /**
     * mostra le donazioni
     * @param {*} don lista delle donazioni da mostrare
     */
     showDonation(don){
        let counter=0;
        const UID=sessionStorage.getItem("userID");
        console.log(don.length);
        if(don.length==0){
            const divv=document.createElement('h2');
            divv.innerText="Non sono ancora state fatte donazioni per questo progetto :/"
            divv.className="testoF"
            this.donContainer.appendChild(divv);
        }
        for(const donation of don) {
            counter++;
            
            const div=document.createElement('div');

            const tdTitolo = document.createElement('h3');
            tdTitolo.innerText = donation.quantità;

            const tdDate = document.createElement('div');
            tdDate.innerText = donation.data.format('YYYY/MM/DD');

           

            div.appendChild(tdTitolo);
            div.appendChild(tdDate);
            div.className=`flexbox-item flexbox-item${counter}`;
            this.donContainer.appendChild(div);
            
        }
       
        
    }

    /**
     * mostra i documenti
     * @param {*} docs lista dei documenti mostrati
     */
    showDocumenti(docs){
        let counter=0;
        const UID=sessionStorage.getItem("userID");
        if(docs.length==0){
            const divv=document.createElement('h2');
            divv.innerText="Non sono ancora stati creati documenti per questo progetto :/"
            divv.className="testoF"
            this.docContainer.appendChild(divv);
        }
        for(const doc of docs) {
            counter++;
            
            const div=document.createElement('div');

            const tdTitolo = document.createElement('h3');
            tdTitolo.innerText = doc.titolo;

            const tdDescrizione = document.createElement('h3');
            tdDescrizione.innerText = doc.descrizione;

            const tdDate = document.createElement('div');
            tdDate.innerText = doc.data.format('YYYY/MM/DD');

            const tdprezzo = document.createElement('div');
            if(doc.prezzo==0){
                tdprezzo.innerText="gratis"
            }
            else tdprezzo.innerText = doc.prezzo;
            
            const dollaro= this.gestioneDocumenti.getHtmlDonazioni(doc);

            div.appendChild(tdTitolo);
            div.appendChild(tdDescrizione);
            div.appendChild(tdDate);
            div.appendChild(tdprezzo);
            div.appendChild(dollaro);
            if(UID==doc.ID_creatore){
                const svg=this.gestioneDocumenti.getHtmlNode(doc);
                div.appendChild(svg);
            }
            div.className=`flexbox-item flexbox-item${counter}`;
            this.docContainer.appendChild(div);
            
        }
       
        
    }

    /**
     * mostra i progetti
     * @param {*} progs la lista dei progetti a schermo
     */
    showProgetti(progs){
        let counter=0;
        const u = sessionStorage.getItem('userName');
        for(const prog of progs) {
            counter++;
            
            const div=document.createElement('div');
            const a=document.createElement('a');
            const listdon=document.createElement('a');
            const immagine=document.createElement('div');
            a.href=`/documenti/${prog.ID}`;
            listdon.href=`/listDonazioni/${prog.ID}`;

            const tdTitolo = document.createElement('h3');
            tdTitolo.innerText = prog.titolo;

            const tdDate = document.createElement('div');
            tdDate.innerText = prog.data.format('YYYY/MM/DD');

            const tdCategoria = document.createElement('p');
            tdCategoria.innerText = prog.categoria;

            const tdImaggine = document.createElement('img');
            tdImaggine.src = prog.immagine;

            const tdDescrizione = document.createElement('h4');
            tdDescrizione.innerText = prog.descrizione;

            const tdDonazioni = document.createElement('div');
            tdDonazioni.innerText = prog.donazioni;
            tdDonazioni.style.fontSize="2rem"
            listdon.appendChild(tdDonazioni)

            const dollaro= this.gestisciProg.getHtmlDonazioni(prog);
  
            tdImaggine.width = 375;
            tdImaggine.height = 200;
            immagine.className="cetriolo";
            tdTitolo.id="titolo"+counter;

            immagine.appendChild(tdImaggine)
            a.appendChild(immagine);
            a.appendChild(tdTitolo);
            a.appendChild(tdDescrizione);
            div.appendChild(a);
            div.appendChild(tdCategoria)
            div.appendChild(tdDate);
            div.appendChild(listdon);
            div.appendChild(dollaro);
            div.className=`flexbox-item flexbox-item${counter}`;
            this.progContainer.appendChild(div);
        }
    }



    showAllProgetti= async (path) => {      
        await this.initForm();
        this.showProgetti(this.gestisciProg.progs, path);
    }

    showAllComments=async (ID,path) => {      
        await this.initFormCom(ID);
        this.showComments(this.gestioneCommenti.comments, path);
    }

    showComments = async (comments) => {
        let counter=0;
    const u = sessionStorage.getItem('userName');
    for(const comment of comments) {
        counter++;
        
        const div=document.createElement('div');
        const testo = document.createElement('div');
        testo.innerText = comment.testo;

        const data = document.createElement('div');
        data.innerText = comment.data.format('YYYY/MM/DD');

        if(comment.ID_commentatore==sessionStorage.getItem("userID")){
            const tdSVG= this.gestioneCommenti.getHtmlNode(comment);
            div.appendChild(tdSVG);
        }
        


        div.appendChild(testo);
        div.appendChild(data);
        
        div.className=`flexbox-itemC flexbox-item${counter}`;
        this.comContainer.appendChild(div);
    }
    }
        

    /**
     * funzione gestisce il login 
     * @param {*} event 
     */
    onLoginSubmitted = async (event) => {
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('error-messages');

        if(form.checkValidity()) {
             try {
                const user = await Api.doLogin(form.email.value, form.password.value); 
                sessionStorage.setItem('userName', user.nome);
                sessionStorage.setItem('userCoName', user.cognome);
                sessionStorage.setItem('userC', user.creatore);
                sessionStorage.setItem('userID', user.ID);
                sessionStorage.setItem('userEmail', user.email);
                this.loggedIn=1;
                const u = sessionStorage.getItem('userName');
                if(u !== null) {
                page.redirect('/progetti')
            }
            }
                 catch(error) {
                console.log(error);
                if (error) {
                    const errorMsg = error;
                    // add an alert message in DOM
                    alertMessage.innerHTML = createAlert('danger', errorMsg);
                    // automatically remove the flash message after 3 sec
                    setTimeout(() => {
                        alertMessage.innerHTML = '';
                    }, 3000);
                }
            }
        }
    }

    showDonationForm = async(ID) => {
        if(sessionStorage.getItem('userID')==null){
            document.getElementById('error-messages').innerHTML = createAlert('success', 'Devi prima loggarti per poter donare');
            setTimeout(() => {
                document.getElementById('error-messages').innerHTML = '';
            }, 3000);
            page('/login');
         }
         else{
            this.appContainer.innerHTML = '';
            this.appContainer.innerHTML = donationForm();
            document.getElementById('donation-form').addEventListener('submit', this.onFormDonSubmitted);
         }
    }

    showPurchaseForm = async(ID) => {
        if(sessionStorage.getItem('userID')==null){
            document.getElementById('error-messages').innerHTML = createAlert('success', 'Devi prima loggarti per poter fare un acquisto');
            setTimeout(() => {
                document.getElementById('error-messages').innerHTML = '';
            }, 3000);
            page('/login');
         }
         else{
            const IDP=sessionStorage.getItem("progID");
            console.log(IDP)
            if(ID !== undefined) {
                if(this.gestioneDocumenti.docs.length === 0)
                    await this.gestioneDocumenti.getDoc(IDP);
            }
            if(IDP)
            this.appContainer.innerHTML = '';
            this.appContainer.innerHTML = purchaseForm();
            const IDD=sessionStorage.getItem("docID")
            const documenti = this.gestioneDocumenti.docs.filter((t) => (t.ID == IDD));
            const doc = documenti[0];
            console.log(doc);
            const addForm = document.getElementById('purchase-form')
            if(doc.prezzo==0){
            const UID=sessionStorage.getItem("userID")
            const IDD=sessionStorage.getItem("docID")
            const dat = new Date();
            const datt = dat.getFullYear()+'/'+(dat.getMonth()+1)+'/'+(dat.getDate()+1); 
            const acquy = new acquisto(undefined,UID, IDD,datt);
            this.Api.addAcquisto(acquy).then(() => {
                //reset the form and go back to the home
                addForm.reset();
                document.getElementById('error-messages').innerHTML = createAlert('success', "Acquisto avvenuto con successo, Troverai il documento nell'area personale");
                setTimeout(() => {
                document.getElementById('error-messages').innerHTML = '';
                }, 3000);
            })
            .catch((error) => {
            // add an alert message in DOM
            document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                });
                page("/profile")
                }
            else{
            addForm.elements['form-importo'].value = doc.prezzo;
            console.log(addForm);
            document.getElementById('purchase-form').addEventListener('submit', this.onFormPurchaseSubmitted);
            }
            
         }
    }
    
    seguiProg= async(ID) => {
        await this.Api.getAcquisti();
        await this.gestisciProg.getprog();
        await this.gestisciProg.getSeguiti();
        const UID=sessionStorage.getItem('userID');
        if(UID==null){
            document.getElementById('error-messages').innerHTML = createAlert('success', 'Devi prima loggarti');
            setTimeout(() => {
                document.getElementById('error-messages').innerHTML = '';
            }, 3000);
            page('/login');
         }
         const userID=sessionStorage.getItem("userID")
        const seguiti=this.gestisciProg.SeguitiUtente(UID);
        console.log(seguiti);
        var booly=false;
        var IID=0;
         for(let y=0;y<seguiti.length;y++){
            console.log("seguit.lenght")
         if(ID==seguiti[y].ID_PROGETTO){
            if(userID==seguiti[y].ID_FIN)
            booly=true;
            IID=seguiti[y].ID;
         }
        else{
            booly =false;
        }
    }
    if(booly==true){
        console.log(IID);
        this.deleteFollow(IID).then(() => {
            //reset the form and go back to the home
            document.getElementById('error-messages').innerHTML = createAlert('success', "Hai smesso di seguire il progetto");
            setTimeout(() => {
            document.getElementById('error-messages').innerHTML = '';
            }, 3000);
        })
        .catch((error) => {
        // add an alert message in DOM
        document.getElementById('error-messages').innerHTML = createAlert('danger', error);
            });
    }
    else{
        const follow = new segui(undefined,UID, ID);
            this.gestisciProg.addFollow(follow,booly).then(() => {
                //reset the form and go back to the home
                document.getElementById('error-messages').innerHTML = createAlert('success', "Hai seguito un nuovo progetto");
                setTimeout(() => {
                document.getElementById('error-messages').innerHTML = '';
                }, 3000);
            })
            .catch((error) => {
            // add an alert message in DOM
            document.getElementById('error-messages').innerHTML = createAlert('danger', error);
                });
        }
    }

    onFormPurchaseSubmitted  = async (event) => {
        event.preventDefault();
        const addForm = document.getElementById('purchase-form');
        const UID=sessionStorage.getItem("userID")
        const IDD=sessionStorage.getItem("docID")
        const dat = new Date();
        const datt = dat.getFullYear()+'/'+(dat.getMonth()+1)+'/'+(dat.getDate()+1); 
        console.log(addForm.elements['form-importo'].value);
        const acquy = new acquisto(undefined,UID, IDD,datt);
        this.Api.addAcquisto(acquy).then(() => {
            //reset the form and go back to the home
            addForm.reset();
            document.getElementById('error-messages').innerHTML = createAlert('success', "Acquisto avvenuto con successo, Troverai il documento nell'area personale");
            setTimeout(() => {
            document.getElementById('error-messages').innerHTML = '';
            }, 3000);
        })
        .catch((error) => {
        // add an alert message in DOM
        document.getElementById('error-messages').innerHTML = createAlert('danger', error);
            });
            page("/profile")
        } 

    onRegisterSubmitted = async (event) => {
    event.preventDefault();
    const addForm = event.target;
    const alertMessage = document.getElementById('error-messages');
        var creatore = addForm.elements['form-Creatore'].checked;
        const nome = addForm.elements['nome'].value;
        const cognome = addForm.elements['cognome'].value;
        const email = addForm.elements['email'].value;
        const password = addForm.elements['password'].value;
        if(creatore==false) creatore=0;
        else creatore=1;
        const utente = new finanziatore(undefined,creatore, nome, cognome,email,password);
        console.log(utente);

        if(addForm.checkValidity()) {
            try {
                await this.Api.doRegister(utente).then(() => {
                    addForm.reset();
                    page('/login');
                });     
            } catch(error) {
                console.log(error);
                if (error) {
                    const errorMsg = error;
                    // add an alert message in DOM
                    alertMessage.innerHTML = createAlert('danger', errorMsg);
                    // automatically remove the flash message after 3 sec
                    setTimeout(() => {
                        alertMessage.innerHTML = '';
                    }, 3000);
                }
            }
        }
    }

    onFormDonSubmitted  = async (event) => {
        event.preventDefault();
        const addForm = document.getElementById('donation-form');
        const IDP=sessionStorage.getItem("progID")
        const dat = new Date();
        const datt = dat.getFullYear()+'/'+(dat.getMonth()+1)+'/'+(dat.getDate()+1);
        const importo = addForm.elements['form-importo'].value;
        let i=parseInt(importo);
        const donation=new donazione(undefined,IDP,undefined,importo,datt)
        this.gestioneDonazioni.addDonation(donation).then(() => {
            const progs = this.gestisciProg.progs.filter((q) => (q.ID == IDP));
            const progett = progs[0];
            const titolo = progett.titolo;
            const categoria = progett.categoria;
            const immagine = progett.immagine;
            const descrizione = progett.descrizione;
            const data = progett.data.format('YYYY-MM-DD');
            const IDC=progett.ID_creatore;
            const donazione=(progett.donazioni+i);
            const proghy =new progetto(IDP,IDC, titolo, data,categoria,immagine,descrizione,donazione);
            console.log(proghy);
            this.gestisciProg.updateprog(proghy)
            //reset the form and go back to the home
            addForm.reset();
            document.getElementById('error-messages').innerHTML = createAlert('success', 'donazione avvenuta con successo');
            setTimeout(() => {
            document.getElementById('error-messages').innerHTML = '';
            }, 3000);
            page('/progetti'); 
        })
        .catch((error) => {
        // add an alert message in DOM
        document.getElementById('error-messages').innerHTML = createAlert('danger', error);
            });
    } 


}


export default App;
