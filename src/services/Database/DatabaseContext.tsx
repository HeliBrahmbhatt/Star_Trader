import React, {createContext, useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';

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
  const db = openDatabase({name: 'StarTrader.db'});

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
    const filePath =
      // RNFS.DocumentDirectoryPath + '/NFLPlayerValueCalcs.json'; // Adjust the path as needed
      '/Users/apple/Heli/indianic/Demo/SQLiteJson/NFLPlayerValueCalcs.json';
    const result = await RNFS.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(result);
    db.transaction(tx => {
      jsonData.forEach(player => {
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
        return NFLPlayerValueCalcs;
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
