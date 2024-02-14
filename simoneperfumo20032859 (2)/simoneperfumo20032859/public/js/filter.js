class filter {

    constructor(sidebar, progManager){
        // the reference to the sidebar HTML element
        this.sidebar = sidebar;

        // reference to the prog manager
        this.progManager = progManager;
    }

    /**
     * The 'click' event handler
     * @param {*} event
     */
    onYearSelected = (event) => {
        // the HTML element that was clicked
        const el = event.target;
        const filterType = el.dataset.id;
        // removing and adding the 'active' class
        this.sidebarContainer.querySelector('a.active').classList.remove('active');
        el.classList.add('active');

        let progs = [];
        if(filterType === 'all') {
            progs = this.progManager.progs;
        }
        else {
            progs = this.progManager.getByYear(filterType);
        }

        // generate a new (custom) event to warn App.js of the change
        document.dispatchEvent(new CustomEvent('filter-selected', {detail: progs}));
    }

    onFilterSelected(filterType){
        
        
        // rimuove l'attributo active dalla casse
        this.sidebar.querySelector('a.active').classList.remove('active');
        const el = document.querySelector(`a[href='/progetti/${filterType}']`);
        el.classList.add('active');
        this.TESTOF=document.getElementById('testoF');
        const div=document.createElement('h3');
        div.innerText="Queste sono le grandi Start-up del domani inizia subito a investire"
        
        
        let progs = [];
        let filterTitle = '';


        switch(filterType){
            case('recenti'):
            progs = this.progManager.filterRecenti();
                filterTitle = 'Recenti';
                break;
            case('importanti'):
            progs = this.progManager.filterImportant();
                filterTitle = 'Importanti';
                break;
            case('top'):
            this.TESTOF.appendChild(div);
            progs = this.progManager.getTop();
                filterTitle = 'TOP 3';
                break;  
                
            case('2023'):
            progs = this.progManager.getByYear("2023");
                    filterTitle = '2023';
                    break; 
            case('2022'):
            progs = this.progManager.getByYear("2022");
                        filterTitle = '2022';
                        break;            

            default:
                progs =  this.progManager.getByProject(filterType);
                filterTitle = filterType + ' - Tutti';
                break;



        }
         
        return {progs: progs, title: filterTitle};
   }

}

export default filter;