'use strict';

const moment = require('moment');
const sqlite = require('sqlite3').verbose();
const progetto = require('./progetti');
const documento = require('./documento');
const commento = require('./commento');
const acquisto = require('./acquisto');
const seguito = require('./segui');
const donazione = require('./donazioni');
const db = new sqlite.Database('dbprogetto.db', (err) => {
  if (err) {
    console.err(err.message);
    throw err;
  }
});



exports.getAllProgetti = function(filter) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM PROGETTI';
    db.all (sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      else{
        if (rows === undefined)
             resolve({error: 'No prog found.'});
        else{
          const progs =  rows.map((rows) => {return createProgDB(rows)});
          

          resolve(progs);
        } 
          
        }
      });
    });
}
exports.getAllAcquisti = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM ACQUISTIDOC';
    db.all (sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      else{
        if (rows === undefined)
             resolve({error: 'No purchase found.'});
        else{
          const acquisto =  rows.map((rows) => {return createAcquistoDB(rows)});
          

          resolve(acquisto);
        } 
          
        }
      });
    });
}
exports.getAllSeguiti = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM PROGETTISEGUITI';
    db.all (sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      else{
        if (rows === undefined)
             resolve({error: 'No follower found.'});
        else{
          const seguito =  rows.map((rows) => {return createSeguitoDB(rows)});
          

          resolve(seguito);
        } 
          
        }
      });
    });
}

exports.getDocumentiID = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM DOCUMENTI WHERE ID_progetto=?';
    db.all (sql, [id],(err, rows) => {
      if (err) {
        reject(err);
      }
      else{
        if (rows === undefined)
             resolve({error: 'No doc found.'});
        else{
          const docs =  rows.map((rows) => {return createDocDB(rows)});

          resolve(docs);
        } 
          
        }
      });
    });
}

exports.getDonazioniID = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM DONAZIONI WHERE ID_progetto=?';
    db.all (sql, [id],(err, rows) => {
      if (err) {
        reject(err);
      }
      else{
        if (rows === undefined)
             resolve({error: 'No donation found.'});
        else{
          const don =  rows.map((rows) => {return createDonDB(rows)});

          resolve(don);
        } 
          
        }
      });
    });
}

exports.getAllDocumenti = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM DOCUMENTI';
    db.all (sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      else{
        if (rows === undefined)
             resolve({error: 'No doc found.'});
        else{
          const docs =  rows.map((rows) => {return createDocDB(rows)});

          resolve(docs);
        } 
          
        }
      });
    });
}

exports.getAllCommenti = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM COMMENTI WHERE ID_documento=?';
    db.all (sql, [id],(err, rows) => {
      if (err) {
        reject(err);
      }
      else{
        if (rows === undefined)
             resolve({error: 'No comment found.'});
        else{
          const docs =  rows.map((rows) => {return createCommentDB(rows)});

          resolve(docs);
        } 
          
        }
      });
    });
}
// crea la lista di progetti prendendoli dal db
exports.getProgetto = function(ID, userId){
  return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Task WHERE ID=? AND ID_creatore=?";

      db.get(sql, [ID, userId], (err, row) =>{
          if (err)
            reject(err);
          else {
              if (row === undefined)
                  resolve({error: 'prog not found.'});
              else 
                  resolve (createProgDB(row));

          }



      });                        
  });
} 
// crea un object progetto passandogli le righe del db
const createProgDB = function (dbProg) {
  const prog =  new progetto(
    dbProg.ID, 
    dbProg.ID_creatore, 
    dbProg.titolo,
    dbProg.data,
    dbProg.categoria,
    dbProg.immagine,
    dbProg.descrizione,
    dbProg.donazioni,);
  return prog;
}

const createDocDB = function (dbDoc) {
  const doc =  new documento(
    dbDoc.ID, 
    dbDoc.ID_progetto, 
    dbDoc.titolo,
    dbDoc.descrizione,
    dbDoc.data,
    dbDoc.prezzo,
    dbDoc.ID_creatore,);
  return doc;
}

const createDonDB = function (dbDon) {
  const don =  new donazione(
    dbDon.ID, 
    dbDon.ID_progetto, 
    dbDon.ID_finanziatore,
    dbDon.quantità,
    dbDon.data,);
  return don;
}

const createCommentDB = function (dbComment) {
  const comm =  new commento(
    dbComment.ID, 
    dbComment.ID_commentatore, 
    dbComment.ID_documento,
    dbComment.testo,
    dbComment.data,);
  return comm;
}

const createAcquistoDB = function (dbAcquisto) {
  const acqui =  new acquisto(
    dbAcquisto.ID, 
    dbAcquisto.ID_FIN, 
    dbAcquisto.ID_DOC,
    dbAcquisto.data,);
  return acqui;
}


const createSeguitoDB = function (dbSeguito) {
  const segui =  new seguito(
    dbSeguito.ID, 
    dbSeguito.ID_FIN, 
    dbSeguito.ID_PROGETTO,);
  return segui;
}

//inserisce un progetto nel db
exports.createProgetto = function(PROGETTI) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO PROGETTI(ID_creatore,titolo,data,categoria,immagine,descrizione,donazioni) VALUES (?, ?, DATE(?), ?, ?, ?,?)';
    db.run(sql, [PROGETTI.ID_creatore,
       PROGETTI.titolo,
       PROGETTI.data,
       PROGETTI.categoria,
       PROGETTI.immagine,
       PROGETTI.descrizione,
       PROGETTI.donazioni
      ], (err)=>{
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); 
      }
    });
  });
};
exports.createDocumento = function(DOCUMENTI) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO DOCUMENTI(ID_progetto,titolo,descrizione,data,prezzo,ID_creatore) VALUES (?, ?, ?,DATE(?), ?,?)';
    db.run(sql, [DOCUMENTI.ID_progetto,
      DOCUMENTI.titolo,
      DOCUMENTI.descrizione,
      DOCUMENTI.data,
      DOCUMENTI.prezzo,
      DOCUMENTI.ID_creatore,
      ], (err)=>{
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); 
      }
    });
  });
};

exports.createCommento = function(COMMENTI) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO COMMENTI(ID_commentatore,ID_documento,testo,data) VALUES (?, ?, ?,DATE(?))';
    db.run(sql, [COMMENTI.ID_commentatore,
      COMMENTI.ID_documento,
      COMMENTI.testo,
      COMMENTI.data
      ], (err)=>{
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); 
      }
    });
  });
};
exports.createDonazione = function(DONAZIONE) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO DONAZIONI(ID_progetto,ID_finanziatore,quantità,data) VALUES (?, ?, ?,DATE(?))';
    db.run(sql, [DONAZIONE.ID_progetto,
      DONAZIONE.ID_finanziatore,
      DONAZIONE.quantità,
      DONAZIONE.data
      ], (err)=>{
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); 
      }
    });
  });
};
exports.createAcquisto = function(ACQUISTO) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO ACQUISTIDOC(ID_FIN,ID_DOC,data) VALUES (?, ?,?)';
    db.run(sql, [ACQUISTO.ID_FIN,
      ACQUISTO.ID_DOC,
      ACQUISTO.data,
      ], (err)=>{
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); 
      }
    });
  });
};

exports.createSeguito = function(SEGUITO) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO PROGETTISEGUITI(ID_FIN,ID_PROGETTO) VALUES (?, ?)';
    db.run(sql, [SEGUITO.ID_FIN,
      SEGUITO.ID_PROGETTO,
      ], (err)=>{
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); 
      }
    });
  });
};


  // delete an existing prog
  exports.deletePROGETTO = function(ID,IDC){
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM PROGETTI WHERE ID = ? AND ID_creatore = ?';
      db.run(sql, [ID,IDC], (err) => {
        if (err) {
          reject(err);
        } else
          resolve();
      });
    });
  }
    // delete an existing doc
    exports.deleteDocumento = function(ID){
      return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM DOCUMENTI WHERE ID = ?';
        db.run(sql, [ID], (err) => {
          if (err) {
            reject(err);
          } else
            resolve();
        });
      });
    }
    exports.deleteDOCProgetti = function(ID){
      return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM DOCUMENTI WHERE ID_progetto = ?';
        db.run(sql, [ID], (err) => {
          if (err) {
            reject(err);
          } else
            resolve();
        });
      });
    }
    exports.deleteCommento = function(ID){
      return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM COMMENTI WHERE ID = ?';
        db.run(sql, [ID], (err) => {
          if (err) {
            reject(err);
          } else
            resolve();
        });
      });
    }
    exports.removeFollow = function(ID){
      return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM PROGETTISEGUITI WHERE ID = ?';
        db.run(sql, [ID], (err) => {
          if (err) {
            reject(err);
          } else
            resolve();
        });
      });
    }
// update an existing prog
  exports.updateProg = function(ID,prog){
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE PROGETTI SET titolo = ?, data =DATE(?), categoria = ?, immagine = ?, descrizione = ?, donazioni = ? WHERE ID = ? AND  ID_creatore=?';
        db.run(sql,  [prog.titolo,
          prog.data,
          prog.categoria,
          prog.immagine,
          prog.descrizione,
          prog.donazioni,
          ID,
          prog.ID_creatore], 
        function (err) {
            if(err){
                console.log(err);
                reject(err);
            } else { 
                // if the update is successfully, this.changes should be equal to 1
                if (this.changes === 0)
                    resolve({error: 'prog not found.'});
                else {
                    resolve();
                }
            }
        })
    });
  }
  // update an existing doc
  exports.updateDoc = function(ID,doc){
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE DOCUMENTI SET titolo = ?, data =DATE(?), descrizione = ?, prezzo = ?,ID_creatore=? WHERE ID = ? and ID_progetto=?';
        db.run(sql,  [doc.titolo,
          doc.data,
          doc.descrizione,
          doc.prezzo,
          doc.ID_creatore,
          ID,
          doc.ID_progetto
        ], 
        function (err) {
            if(err){
                console.log(err);
                reject(err);
            } else { 
                // if the update is successfully, this.changes should be equal to 1
                if (this.changes === 0)
                    resolve({error: 'doc not found.'});
                else {
                    resolve();
                }
            }
        })
    });
  }

  exports.updateComment = function(ID,comment){
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE COMMENTI SET testo = ?, data =DATE(?) WHERE ID = ? and  ID_commentatore=? and ID_documento =? ';
        db.run(sql,  [comment.testo,
          comment.data,
          ID,
          comment.ID_commentatore,
          comment.ID_documento
          ], 
        function (err) {
            if(err){
                console.log(err);
                reject(err);
            } else { 
                // if the update is successfully, this.changes should be equal to 1
                if (this.changes === 0)
                    resolve({error: 'comment not found.'});
                else {
                    resolve();
                }
            }
        })
    });
  }
//ottiene tutti i progetti di un utente per lo show user
  exports.getProgettoByUser = function(ID){
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM PROGETTI WHERE ID_creatore=?';
    db.all(sql, [ID], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      else{
      if (rows === undefined)
          resolve({error: 'prog not found.'});
      else{
        const progs =  rows.map((rows) => {return createProgDB(rows)});
        resolve(progs);
      }
      }
    });
  });
};




  


 

  