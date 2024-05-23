// types.ts

interface Player {
  ID: number;
  Name: string;
  Team: string;
  Position: string;
  Age: string | number;
  YrCalc: number;
  ExpectedWeekFantasyPoints: number;
  ExpectedSeasonFantasyPoints: number;
  MktCAP: string;
  McapSize: string;
  SharesOutstanding: string;
  BuyoutPrice: number;
  SharePriceInStarCoins: number;
  TodaysHigh: number;
  TodaysLow: number;
  PERatio: string;
  Volume: string;
  AVGVolume: string;
  WeekHigh52: number;
  WeekLow52: number;
}

interface DbProvider {
  initDb: () => Promise<{
    executeSql: (sql: string, params?: any[]) => Promise<any>;
    close: () => void;
  }>;
  createTable: (db: {
    executeSql: (sql: string, params?: any[]) => Promise<any>;
    close: () => void;
  }) => Promise<void>;
  addPlayer: (
    db: {
      executeSql: (sql: string, params?: any[]) => Promise<any>;
      close: () => void;
    },
    player: Partial<Player>,
  ) => Promise<void>;
  fetchPlayers: (db: {
    executeSql: (sql: string, params?: any[]) => Promise<any>;
    close: () => void;
  }) => Promise<Player[]>;
}
