import { useState, useEffect } from 'react';

export default function UseJsonFetch(url, refresh) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => { 

    const fetchData = async (url, opts) => {  
      setData(null);
      setError(false);
      setLoading(true);
      try {         
        const response = await fetch(url, opts);
        if (!response.ok) {            
          throw new Error(response.statusText);
        }         
        const data = await response.json();              
        setData(data);
      } catch(e) {          
        setError('Ошибка загрузки данных: ' + e);
      } finally {
        setLoading(false);
      }
    } 
    
    if (url) {
      fetchData(url, []);    
    }   
  }, [url, refresh]);

  return  [data, loading, error];
};

