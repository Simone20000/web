'use strict';

function userPage()
 { return  `<main>
     <div id="error-messages"></div> 
            <table class="table table-bordered table-striped">
                      <section id="my-users">
                        <!-- JS will fill it -->
                      </section>
                </table>
                <aside class="progSide" id="prog-side-bar">
      <div class="list-group list-group-flush">
            <a href="/profile/documenti" class="item">I Tuoi Documenti</a>
            <a href="/profile/progetti" class="item">I Tuoi Progetti</a>
            <a href="/profile/seguiti" class="item">Progetti Seguiti</a>
        </div>
  </aside> 
  <h1 class="filter-title" id="filter-title">I Tuoi Progetti</h1>
                <div class="progetti1" id="progetti1">
        <section class="shop" id="shop">
                <div class="flexbox-container" id="myprogetti">
                          <!-- JS will fill it -->
                        </div>
                        </div>
                        </section>
                    </div>
                    <div class="documenti1" id="documenti1" hidden>
              <section class="shop" id="shop">
                <div class="flexbox-container" id="mydocumenti">
                          <!-- JS will fill it -->
                        </div>
                    </div>
                    </section>
                  </div>
              <div class="seguiti" id="seguiti" hidden>
        <section class="shop" id="shop">
                <div class="flexbox-container" id="pSeguiti">
                          <!-- JS will fill it -->
                        </div>
                        </div>
                        </section>
                    </div>
        </div>
      </main>`;
}





export default userPage;
