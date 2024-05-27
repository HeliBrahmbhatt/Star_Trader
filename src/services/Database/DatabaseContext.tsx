import React, {createContext, useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import json from '../../../assets/NFLPlayerValueCalcs.json';
import RNFS from 'react-native-fs';
import {Alert, Platform} from 'react-native';

interface DatabaseState {
  data: DatabaseRow[];
  // loading: boolean;
  // error: string | null;
  fetchData: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseState>({
  data: [],
  // loading: true,
  // error: null,
  fetchData: async () => {},
});

const DatabaseProvider = ({children}) => {
  const [data, setData] = useState<DatabaseRow[]>([]);
  let db = openDatabase({name: 'StarTrader.db', location: 'default'});

  useEffect(() => {
    createTable();
    insertData();
    getData();
  }, []);

  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS NFLPlayerValueCalcs (
          ID INTEGER PRIMARY KEY,
          Name TEXT,
          Team TEXT,
          Position TEXT,
          Age TEXT,
          YrCalc TEXT,
          ExpectedWeekFantasyPoints REAL,
          ExpectedSeasonFantasyPoints REAL,
          MktCAP TEXT,
          McapSize TEXT,
          SharesOutstanding TEXT,
          BuyoutPrice REAL,
          SharePriceInStarCoins REAL,
          TodaysHigh REAL,
          TodaysLow REAL,
          PERatio TEXT,
          Volume TEXT,
          AVGVolume TEXT,
          WeekHigh52 REAL,
          WeekLow52 REAL
        );`, // Add comma here
        [],
        (tx, res) => {
          console.log('Table created successfully');
        },
        error => {
          console.log('Error on creating table: ' + error.message);
        },
      );

      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS User (
           ID PRIMARY KEY,
          Name TEXT
        );`,
        [],
        (tx, res) => {
          console.log('Table created successfully');
        },
        error => {
          console.log('Error on creating table: ' + error.message);
        },
      );
    });
  };

  const insertData = async () => {
    // const filePath =
    //   // RNFS.DocumentDirectoryPath + '/NFLPlayerValueCalcs.json'; // Adjust the path as needed
    //   '/Users/apple/Heli/indianic/Demo/SQLiteJson/NFLPlayerValueCalcs.json';
    // const result = await RNFS.readFile(filePath, 'utf8');
    // const jsonData = JSON.parse(result);

    db.transaction(tx => {
      json.forEach(player => {
        tx.executeSql(
          `INSERT INTO NFLPlayerValueCalcs (
          ID, Name, Team, Position, Age, YrCalc, ExpectedWeekFantasyPoints, ExpectedSeasonFantasyPoints, MktCAP, McapSize, SharesOutstanding, BuyoutPrice, SharePriceInStarCoins, TodaysHigh, TodaysLow, PERatio, Volume, AVGVolume, WeekHigh52, WeekLow52
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            player.ID,
            player.Name,
            player.Team,
            player.Position,
            player.Age,
            player.YrCalc,
            player.ExpectedWeekFantasyPoints,
            player.ExpectedSeasonFantasyPoints,
            player.MktCAP,
            player.McapSize,
            player.SharesOutstanding,
            player.BuyoutPrice,
            player['SharePrice(in StarCoins)'],
            player["Today'sHigh"],
            player["Today'sLow"],
            player['P/ERatio'],
            player.Volume,
            player.AVGVolume,
            player['52WeekHigh'],
            player['52WeekLow'],
          ],
          (tx, results) => {
            console.log('Inserted row with ID: ' + player.ID);
          },
          error => {
            console.log('Error on inserting row: ' + error.message);
          },
        );
      });
    });
    db.transaction(tx => {
      tx.executeSql(
        // `INSERT INTO User(
        //   ID, Name,
        // ) VALUES (?,?)`,

        `INSERT INTO User(ID, Name) VALUES (?,?)`[(3, 'Heli')],
        (tx, results) => {
          console.log('Inserted row : ');
        },
        error => {
          console.log('Error on inserting row: ' + error.message);
        },
      );
    });
  };
  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM NFLPlayerValueCalcs', [], (tx, results) => {
        const rows = results.rows;
        let NFLPlayerValueCalcs = [];
        for (let i = 0; i < rows.length; i++) {
          NFLPlayerValueCalcs.push(rows.item(i));
        }
        setData(NFLPlayerValueCalcs);
        exportDatabase();
        return NFLPlayerValueCalcs;
      });
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM User', [], (tx, results) => {
        const rows = results.rows;
        console.log('USER =========>', rows);
      });
    });
  };

  const getDatabasePath = () => {
    if (Platform.OS === 'android') {
      console.log(
        'RNFS.DocumentDirectoryPath ====>',
        RNFS.DocumentDirectoryPath,
      );

      return `/data/user/0/com.startrader/databases/StarTrader.db`;
    } else if (Platform.OS === 'ios') {
      return `${RNFS.LibraryDirectoryPath}/LocalDatabase/StarTrader.db`;
    }
    return '';
  };

  const checkDatabaseExists = async () => {
    const dbFilePath = getDatabasePath();
    const fileExists = await RNFS.exists(dbFilePath);
    console.log(`Database exists at path: ${dbFilePath} ? ${fileExists}`);
  };

  checkDatabaseExists();

  const exportDatabase = async () => {
    const dbFilePath = getDatabasePath();
    console.log('dbFilePath =====>', dbFilePath);

    // const exportFilePath = `${RNFS.ExternalDirectoryPath}/StarTrader.db`;
    // const destPath = `${RNFS.DownloadDirectoryPath}/StarTrader.db`;
    const destPath =
      Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}/StarTrader.db`
        : `${RNFS.DownloadDirectoryPath}/StarTrader.db`;

    try {
      // Check if the file exists
      const fileExists = await RNFS.exists(dbFilePath);
      if (!fileExists) {
        throw new Error(`Database file does not exist at path: ${dbFilePath}`);
      }

      // Copy the database file to an external directory
      await RNFS.copyFile(dbFilePath, destPath);

      // Share the file
      const options = {
        type: 'application/octet-stream',
        url: `file://${destPath}`,
        title: 'StarTrader.db',
      };

      // await Share.open(options);
      Alert.alert('Success', 'Database file exported successfully');
      // fetchDB();
    } catch (error) {
      Alert.alert(
        'Error 1',
        `Failed to export database file: ${error.message}`,
      );
      console.error(error);
    }
  };

  const fetchDB = async () => {
    // const destPath = `${RNFS.DocumentDirectoryPath}/StarTrader.db`;
    // const destPath =
    //   Platform.OS === 'ios'
    //     ? `/Users/apple/Library/Developer/CoreSimulator/Devices/2B25D8FA-D9D0-4E54-B776-EA8C122E3E57/data/Containers/Data/Application/D17B3CC6-6097-44B1-825D-93BF964B2C93/Library/LocalDatabase/StarTrader.db`
    //     : `/data/user/0/com.startrader/databases/StarTrader.db`;
    const destPath = getDatabasePath();
    try {
      // Ensure the file exists
      const fileExists = await RNFS.exists(destPath);
      if (!fileExists) {
        Alert.alert('Error', 'Database file not found 1');
        return;
      } else {
        db = openDatabase({name: destPath, location: 'default'});
        getData();

        Alert.alert('Error 1', 'Database file found 1');
      }

      // Open the database
      // const db = await SQLite.openDatabase({
      //   name: 'StarTrader.db',
      //   location: 'default',
      //   createFromLocation: destPath,
      // });

      // // Query the database
      // db.transaction(tx => {
      //   tx.executeSql('SELECT * FROM your_table_name', [], (tx, results) => {
      //     const rows = results.rows.raw(); // Use .raw() to get a plain array
      //     console.log(rows); // Handle your data as needed
      //   });
      // });
    } catch (error) {
      console.error('Error fetching database file:', error);
      Alert.alert('Error', `Failed to fetch database file: ${error.message}`);
    }
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

  const handleFetchData = async () => {
    const results = await fetchData('SELECT * FROM NBAPlayerValueCalcs'); // Modify SQL query
    setData(results);
  };
  return (
    <DatabaseContext.Provider value={{data, fetchData: handleFetchData}}>
      {children}
    </DatabaseContext.Provider>
  );
};

export {DatabaseContext, DatabaseProvider};
