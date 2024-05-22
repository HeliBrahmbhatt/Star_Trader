import {openDatabase} from 'react-native-sqlite-storage';

interface DatabaseRow {
  // Define the structure of a row in your database table (replace with actual column names and types)
  id: number;
  name: string;
  // ... other columns
}

const db = openDatabase({
  // ... your database configuration (name, location, etc.)
  name: 'StarTrader.db',
  location: 'default',
  successCB,
  errorCB,
});

let errorCB = err => {
  console.log('SQL Error:' + err);
};

let successCB = () => {
  db.transaction(tx => {
    tx.executeSql(`SELECT * FROM NBAPlayerValueCalcs`, [], (tx, results) => {
      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        console.log(row);
        // fetchData();
        return row;
      }
    });
  });
};

const fetchData = async (sql: string): Promise<DatabaseRow[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, results) => {
          resolve(results.rows as DatabaseRow[]); // Cast to typed array
        },
        err => {
          reject(err);
        },
      );
    });
  });
};

export {successCB, fetchData};
