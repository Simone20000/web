'use strict';

function infoForm() {
    return `<!-- Main content -->
    <main class="col-8 mx-auto below-nav">
    <div class="background">
    <div class="container-fluid">
    <div class="row align-items-stretch">
    <div class="col-xl-8 col-lg-7 order-lg-2">
    <div class="overflow-box right bg-light align-items-center d-flex">
    <div class="guidetext">
    <div class="overflow-box-content"><h2>Il mercato immobiliare in Italia è una grande opportunità...alla tua portata.</h2> <p>Basta guardare al contesto economico e finanziario attuale per rendersi conto di come il fatto di finanziare in immobili possa fare la differenza. Non solo si tratta di finanziamenti a basso rischio, ma di opportunità che garantiscono rendimenti più elevati rispetto alla maggior parte dei prodotti finanziari.</p> <p>Se pensiamo al livello dei tassi di interesse in questo momento, i finanziamenti immobiliari sono oggi una delle poche alternative in grado di minimizzare il rischio e generare comunque redditi interessanti, che ormai i titoli governativi e il mercato obbligazionario in genere non sono più in grado di offrire.</p> <p>Grazie al crowdfunding immobiliare, Trusters ha creato una nuova opportunità per chiunque voglia finanziare in questo interessante settore, anche senza una grande disponibilità finanziaria. Da oggi, anche tu puoi partecipare a importanti progetti di riqualificazione urbana, realizzando profitti e contribuendo a creare valore per la comunità.</p> 
    <p>Come? Semplicemente investendo la somma che hai a disposizione. Con Trusters raccogliamo i fondi di tanti finanziatori come te per finanziare le nostre operazioni immobiliari. In questo modo, puoi decidere quanto finanziare e in quali progetti, cominciando anche con un piccolo capitale e diversificando al meglio il tuo portafoglio.</p></div></div></div> <div class="col-xl-4 col-lg-5 order-lg-1">
    <div class= "contim">
    <img width="700" height="700"src="https://www.startup-news.it/wp-content/uploads/2021/12/equity-crowdfunding-startup-news.jpg">
    </div>
    </div>
    
</div>
</main>`
}

function listDon() {
    return `<!-- Main content -->
    <main class="col-8 mx-auto below-nav">
<h3 class="MuiTypography-root MuiTypography-h3 css-1na68et">Lista dei donatori</h3>
<div class="flexbox-containerCom" id="listdon">
                          <!-- JS will fill it -->
                        </div>
</main>`
}
export {infoForm,listDon};