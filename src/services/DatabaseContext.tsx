import React, {createContext, useState, useEffect} from 'react';
import {successCB, fetchData} from './databaseService';

interface DatabaseState {
  data: DatabaseRow[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseState>({
  data: [],
  loading: true,
  error: null,
  fetchData: async () => {},
});

const DatabaseProvider: React.FC = ({children}) => {
  const [data, setData] = useState<DatabaseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeDb = async () => {
      await successCB();
      const results = await fetchData('SELECT * FROM NBAPlayerValueCalcs'); // Modify SQL query
      setData(results);
      setLoading(false);
    };
    initializeDb();
  }, []);

  const handleFetchData = async () => {
    setLoading(true);
    const results = await fetchData('SELECT * FROM NBAPlayerValueCalcs'); // Modify SQL query
    setData(results);
    setLoading(false);
  };

  return (
    <DatabaseContext.Provider
      value={{data, loading, error, fetchData: handleFetchData}}>
      {children}
    </DatabaseContext.Provider>
  );
};

export {DatabaseContext, DatabaseProvider};
