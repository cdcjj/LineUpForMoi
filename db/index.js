const mysql = require('mysql');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'q',
  password: '',
});

connection.connect();

// queries to the database
module.exports = {
  deleteQ(params, callback) {
    const queryString = `DELETE FROM events WHERE name=${params.name} && date=${params.date} && contactEmail=${params.contactEmail};`;
    connection.query(queryString, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
  insertQ(values, callback) {
    const queryString = `INSERT INTO events (user_id, name, amount, address, city, state, date, time, duration, contactEmail, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    connection.query(queryString, values, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  getAll(callback) {
    connection.query('SELECT * FROM events ORDER BY id DESC', (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  createUser(values, callback) {
    const password = values[1];
    const vals = values.slice();
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        callback(err, console.log('Password cannot be hashed'));
      } else {
        vals[1] = hash;
        const queryString = `INSERT INTO users (username, password, city, state, contactEmail, user_id)
        VALUES (?, ?, ?, ?, ?, ?);`;

        connection.query(queryString, vals, (error, results) => {
          if (error) {
            callback(error, null);
          } else {
            callback(null, results);
          }
        });
      }
    });
  },

  findUser(username, callback) {
    connection.query(`SELECT * FROM users WHERE username=${username};`, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
};
