'use strict';

//note how all href, instead of pointing to the current page (#) point to the page which implements the specific functionality
//as such, it is not necessary to resort to many event handlers. 
function index() {
  return `
     <div id="error-messages"> </div> 
  
  <aside class="progSide" id="prog-side-bar">
      <div class="list-group list-group-flush">
          <a href="/" class="item active">Tutti</a>
          <a href="/progetti/importanti" class="item">Importanti</a>
          <a href="/progetti/recenti" class="item">I Più Recenti</a>
          <a href="/progetti/2022" class="item">2022</a>
          <a href="/progetti/2023" class="item">2023</a>
        </div>
  </aside> 
  
  <h1 id="filter-title">Tutti</h1>
  <div id="testoF" class="testoF"></div>
            <div>
              <section class="shop" id="shop">
                        <div class="flexbox-container" id="my-progs">
                          <!-- JS will fill it -->
                        </div>
                    </div>
              </section>

                <!-- Add a new prog -->
                <button type="button" href="/add" id="add-button" class="btn btn1" data-toggle="modal" data-target="#add-modal">Nuovo Progetto</button>
            </div>
        </div>

    
    

    <!-- Modal for the new prog form -->
    <div class="modal" id="add-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Aggiungi un nuovo progetto</h5>
              <button type="button" class="close" id="close-modal" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form role="form" method="POST" action="" id="add-form">
              <div class="modal-body">   
                <div id="error-messages"></div>
                <input type="number" name="id" id="form-ID" hidden/>  

                <div class="form-group">
                    <label for='titolo'>Titolo</label>
                    <input type='string' required name='titolo' class='form-control' id="form-titolo"/>
                  </div>
                  <div class="form-group">
                    <input type='date' name='data' id="form-data" hidden/>
                    </div>

                  <div class="form-group">
                    <label for='categoria'>Categoria</label>
                    <input list="categorie" required name='categoria' class='form-control' id='form-categoria'>
                      <datalist id="categorie">
                          <option value="viaggi" />
                          <option value="tecnologie" />
                          <option value="Food" />
                          <option value="Travel" />
                          <option value="Ambiente" />
                          <option value="Fashion" />
                          <option value="Medical" />
                  </div>
                  </datalist>

                  <div class="form-group">
                    <label for='immagine'>Immagine</label>
                    <input type='string' required name='immagine' class='form-control' id='form-immagine'/>
                  </div>

                  <div class="form-group">
                    <input type='donazione' name='donazione' id="form-donazione" hidden/>
                    </div>

                  <div class="form-group">
                    <label for='descrizione'>Descrizione</label>
                    <input type='string' required name='descrizione' class='form-control' id='form-descrizione'/>
                  </div>
  
            </div>
              <div class="modal-footer">
                <div class="form-group">
                  <div>
                      <button type="submit" class="btn btn-primary">Salva</button>
                  </div>
                </div>
              </div>
  
            </form>
          </div>
        </div>

        <script>
        // Trova tutti gli input nel DOM che sono collegati
// a una datalist attraverso l'attributo list
var inputs = document.querySelectorAll('input[list]');
for (var i = 0; i < inputs.length; i++) {
// Quando il valore del campo cambia...
inputs[i].addEventListener('change', function() {
var optionFound = false,
datalist = this.list;
// Determina se esiste un'opzione con il valore corrente del campo di input.
for (var j = 0; j < datalist.options.length; j++) {
if (this.value == datalist.options[j].value) {
optionFound = true;
break;
}
}
// Usa la funzione setCustomValidity della API di validazione HTML5
// per fornire un feedback all'utente nel caso in cui un valore
// non esista nella datalist
if (optionFound) {
this.setCustomValidity('');
} else {
this.setCustomValidity('Please select a valid value.');
}
});
}
</script>
      `;
}

export default index;