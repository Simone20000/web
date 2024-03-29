'use strict';
/* Data Access Object (DAO) module for accessing users */


const bcrypt = require('bcrypt');
const moment = require('moment');
const sqlite = require('sqlite3');
const finanziatore = require('./finanziatore');
const db = new sqlite.Database('dbprogetto.db', (err) => {
  if (err) throw err;
});
//ottiene un utente passandogli ID
exports.getUserById = (ID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM FINANZIATORI WHERE ID = ?';
      db.get(sql, [ID], (err, row) => {
        if (err) 
          reject(err);
        else if (row === undefined)
          resolve({error: 'User not found.'});
        else {
          resolve(createUserDB(row));
        }
    });
  });
};


//inserisci un finanziatore nel db
exports.createUser = function(user) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO FINANZIATORI(creatore,nome,cognome,email,password) VALUES (?, ?,?, ?,?)';
    // create the hash as an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
    bcrypt.hash(user.password, 10).then((hash => {
      db.run(sql, [user.creatore,
        user.nome,
        user.cognome,
        user.email,
        hash,], 
        function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    }));
  });
}

exports.getAllusers = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM FINANZIATORI';
    db.all (sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      else{
        if (rows === undefined)
             resolve({error: 'No user found.'});
        else{
          const users =  rows.map((rows) => {return  db(rows)});
          

          resolve(users);
        } 
          
        }
      });
    });
}

const createUserDB = function (dbUser) {
  const user =  new finanziatore(
    dbUser.ID, 
    dbUser.creatore, 
    dbUser.nome,
    dbUser.cognome,
    dbUser.email,
    dbUser.password,);
  return user;
}

exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM FINANZIATORI WHERE email = ?';
      db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else if (row === undefined) {
          resolve({error: 'User not found.'});
        }
        else {
          const user = {ID: row.ID, email:row.email, nome: row.nome, cognome:row.cognome,creatore:row.creatore};
                let check = false;
                
                if(bcrypt.compareSync(password, row.password))
                check = true;

                resolve({user, check});
              }
        });
      })
  }

//controllo per non far registare persone con la stessa email
exports.checkUser = function(email) {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT count(*) as count FROM FINANZIATORI WHERE email = ?';
      db.get(sql, [email], (err, row) => {
          if (err) 
              reject(err);
          else if (row === undefined)
              resolve({error: 'User not found.'});
          else {

            if(row.count > 0)
            {
              reject("Email already used")
            }
            else
            {
              resolve({email});
            }
          }
      });
  });
};

  