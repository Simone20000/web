'use strict';

function createAddForm() {
    return`<main class="col-8 mx-auto below-nav">
    <form role="form" method="POST" action="" id="add-form">
      <div id="error-messages"></div>
      <input type="text" name="ID" id="form-ID" hidden/>         
      <div class="form-group">
        <label for='titolo'>Titolo</label>
        <input type='text' required name='titolo' class='form-control input-lg' id="form-titolo"/>
      </div>

      <div class="form-group">
        <label for='categoria'>Categoria</label>
        <input type='text' required name='categoria' class='form-control input-lg' id='form-categoria' />
      </div>

      <div class="form-group">
        <label for='immagine'>Immagine</label>
        <input type='img' required name='immagine' class='form-control input-lg' id='form-immagine'/>
      </div>

      <div class="form-group">
        <label for='descrizione'>Descrizione</label>
        <input type='text' required name='descrizione' class='form-control input-lg' id='form-descrizione'/>
      </div>

      <div class="form-group">
        <div>
            <button type="submit" class="btn btn-primary">Salva</button>
        </div>
      </div>
    </form>
  </main>`;
}

function createAddDocForm() {
  return`
  <main class="col-8 mx-auto below-nav">
  <form role="form" method="POST" action="" id="add-form1">
  <div class="modal-body">   
  <div id="error-messages"></div>
  <input type="number" name="id" id="form-ID1" hidden/>  

    <div class="form-group">
        <label for='titolo'>Titolo</label>
        <input type='string' required name='titolo' class='form-control' id="form-titolo1"/>
      </div>
      <div class="form-group">
        <input type='date'  name='data' class='form-control' id="form-data1" hidden/>
      </div>
      <div class="form-group">
        <label for='descrizione'>Descrizione</label>
        <input type='string' required name='descrizione' class='form-control' id="form-descrizione1"/>
      </div>
      <div class="form-group">
        <label for='prezzo'>prezzo</label>
        <input type='number' required name='prezzo' class='form-control' id='form-prezzo1'/>
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
              
</main>`;
}


function createAddCommentForm() {
  return `
  <main class="col-8 mx-auto below-nav">
  <form role="form" method="POST" action="" id="add-form3">
  <div class="modal-body">   
  <div id="error-messages"></div>
  <input type="number" name="id" id="form-ID3" hidden/>  

    <div class="form-group">
        <label for='testo'>testo</label>
        <input type='string' required name='testo' class='form-control' id="form-testo"/>
      </div>
      <div class="form-group">
        <input type='date'  name='data' class='form-control' id="form-data1" hidden/>
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
              
</main>`;
}


function donationForm() {return`
  <main class="col-8 mx-auto below-nav">
  <section id="modulo" class="form-carta">
  <h2>DONA</h2>
  <form role="form" method="POST" action="" id="donation-form">
  <div class="modal-body">
  <div id="error-messages" class="prima"></div>
  <input type="number" name="id" id="form-ID4" hidden/>
  
  
  
  
    <div class="form-group">
    <label for='nomeT'>Nome Titolare</label>
    <input type='text' required name='nomeT' class='form-control' id="form-nomeT" data-val-required="Inserire nome del titolare" />
    </div>
    <div class="form-group">

    </div>
  
    <div class="form-group">
          <label for='numeroC'>Numero carta</label>
          <input type='numeric'  name='numeroC' class='form-numeroC' id="form-numeroC"   minlength="16" maxlength="16" pattern="[0-9]+" required  />
    </div>
    <div class="form-group">
          <label for='cvv' >Codice segreto</label>
          <input type='numeric'  name='cvv' class='form-cvv' id="form-cvv" minlength="3" maxlength="3" pattern="[0-9]+" required  />
    </div>
  
      <div class="form-group">
        <input type='date'  name='data' class='form-control' id="form-data1" hidden/>
      </div>

      <div class="form-group">
        <label for='importo'>importo</label>
        <input type='numeric' required name='importo' class='form-control'  pattern="[0-9]+" id="form-importo" oninvalid="this.setCustomValidity('Inserire un importo valido positivo')" 
        onchange="this.setCustomValidity('')"/>
      </div>
  </div>
  </div>
  <div class="modal-footer">
    <div class="form-group">
      <div>
          <button type="submit" class="btn btn-primary">Dona</button>
      </div>
    </div>
  </section>
  </form>
  
  </main>`
  }


function purchaseForm() {return`
<main class="col-8 mx-auto below-nav">
<section id="modulo" class="form-carta">
<h2>ACQUISTA</h2>
<form role="form" method="POST" action="" id="purchase-form">
<div class="modal-body">   
<div id="error-messages"></div>
<input type="number" name="id" id="form-ID4" hidden/>  
  
    <div class="form-group">
    <label for='nomeT'>Nome Titolare</label>
    <input type='text' required name='nomeT' class='form-control' id="form-nomeT" data-val-required="Inserire nome del titolare" />
    </div>
    <div class="form-group">

    </div>
  
    <div class="form-group">
          <label for='numeroC' >Numero carta</label>
          <input type='numeric'  name='carta' class='form-numeroC' id="form-numeroC" minlength="16" maxlength="16" style="width: 200px;" pattern="[0-9]+" required  />
    </div>
    <div class="form-group">
          <label for='cvv'>CVV</label>
          <input type='numeric'  name='cvv' class='form-cvv' id="form-cvv"   minlength="3" maxlength="3"  style="width: 200px;" pattern="[0-9]+" required />
    </div>
  
      <div class="form-group">
        <input type='date'  name='data' class='form-control' id="form-data1" hidden/>
      </div>

  <div class="form-group">
      <label for='importo'>importo</label>
      <input type='number' required name='importo' class='form-control' id="form-importo" readonly="readonly"/>
    </div>
    <div class="form-group">
      <input type='date'  name='data' class='form-control' id="form-data1" hidden/>
    </div>
</div>
<div class="modal-footer">
  <div class="form-group">
    <div>
        <button type="submit" class="btn btn-primary">Acquista</button>
    </div>
  </div>
</div>

</form>
</section>        
</main>`
}

 function createLoginForm() {
  return`<form method="POST" action="" id="login-form" class="col-6 mx-auto below-nav login">
  <div id="error-messages"></div>
  <div class="imgLogin"></div>
  <h1>Login</h1>
    <div class="form-group">
      <label for="email">Indirizzo mail</label>
      <input type="email" name="email" id="email" class="form-control" required />
    </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" name="password" id="password" class="form-control" required autocomplete/>
  </div>
  <section class="register">
  <div>non sei ancora registrato? <a href="/register" class="btnRegister">CLICCA QUI!</a></div>
  <button type="submit" class="btn btn-primary">Login</button>
</section>
</form>`;
}
 
function createRegisterForm() {
  return`<form method="POST" action="" id="register-form" class="col-6 mx-auto below-nav login">
  <div id="error-messages"></div> 
  <div class="imgLogin"></div>
  <h1>Register</h1>

  <div class="form-group">
  <label for="nome">Nome</label>
  <input type="text" name="nome" id="nome" class="form-control" required />
  </div>

  <div class="form-group">
  <label for="cognome">cognome</label>
  <input type="text" name="cognome" id="cognome" class="form-control" required />
  </div>

  <div class="form-group">
    <label for="email">Indirizzo mail</label>
    <input type="text" name="email" id="email" class="form-control" required />
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" name="password" id="password" onkeyup="validator()" class="form-control" required autocomplete/>
    <input type="checkbox" onclick="showPassword()">Show Password
  </div>
  <div id="ProgressBar">
  <div id="bar">
  </div>

<!-- Area di testo aggiuntiva -->
  <p id="alert">
  </p>
</div> 

  <div class="form-group">
      <div>
        <div for="form-Creatore" class="control-label">Sei un creatore ?</div>
        <input type="checkbox" name="form-Creatore" id="form-control"/>
      </div>
    </div>

  <button type="submit" class="btn btn-primary">Registrati</button>
</form>`;
}

function Commform() {
  return `<!-- Main content -->
  <main>
     <div id="error-messages"></div> 
        <h2 class="center">Commenti</h2>
                        <div class="flexbox-containerCom" id="comments">
                          <!-- JS will fill it -->
                        </div>
              <!-- Add a new comment -->
              <button type="button" href="/add" id="add-button3" class="btn btn-primary" data-toggle="modal" data-target="#add-modal3">Commenta</button>
          </div>
  

  <!-- Modal for the new comment form -->
  <div class="modal" id="add-modal3" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Commento:</h5>
            <button type="button" class="close" id="close-modal3" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form role="form" method="POST" action="" id="add-form3">
            <div class="modal-body">   
            <div id="error-messages"></div>
            <input type="number" name="id" id="form-ID3" hidden/>  
                <div class="form-group">
                  <label for='testo'>testo</label>
                  <textarea type='string' required name='testo' class='form-control' id="form-testo" rows="10" cols="20"></textarea>
                </div>
                <div class="form-group">
                  <input type='date'  name='data' class='form-control' id="form-data3" hidden/>
                </div>
          </div>
            <div class="modal-footer">
              <div class="form-group">
                <div>
                    <button type="submit" class="btn btn-primary">Invia</button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
  </main>`

}

function docform() {
  return `<!-- Main content -->
  <main>
     <div id="error-messages"></div> 
              <section class="shop" id="shop">
                        <div class="flexbox-container" id="my-docs">
                          <!-- JS will fill it -->
                        </div>
              </section>
              </div>
              <!-- Add a new doc -->
              <div id="nuovoDocumento" hidden>
              <button type="button" href="/add" id="add-button1" class="btn btn1" data-toggle="modal" data-target="#add-modal1">Nuovo documento</button>
          </div>
          </div>
      </div>
  

  <!-- Modal for the new prog form -->
  <div class="modal" id="add-modal1" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Aggiungi un nuovo documento</h5>
            <button type="button" class="close" id="close-modal1" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form role="form" method="POST" action="" id="add-form1">
            <div class="modal-body">   
            <div id="error-messages"></div>
            <input type="number" name="id" id="form-ID1" hidden/>  

              <div class="form-group">
                  <label for='titolo'>Titolo</label>
                  <input type='string' required name='titolo' class='form-control' id="form-titolo1"/>
                </div>
                <div class="form-group">
                  <input type='date'  name='data' class='form-control' id="form-data1" hidden/>
                </div>
                <div class="form-group">
                  <label for='descrizione'>Descrizione</label>
                  <input type='string' required name='descrizione' class='form-control' id="form-descrizione1"/>
                </div>
                <div class="form-group">
                  <label for='prezzo'>prezzo</label>
                  <input type='number' required name='prezzo' class='form-control' id='form-prezzo1'/>
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
    </div>
              
              </main>`

}

export {createAddForm,createAddDocForm,donationForm,purchaseForm,createLoginForm,createRegisterForm,createAddCommentForm,Commform,docform};