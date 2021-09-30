import { useState, useEffect, useCallback } from "react";

export const useFetch = ({ url, init, processData }) => {
  // Response state
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  // Turn objects into strings for useCallback & useEffect dependencies
  const [stringifiedUrl, stringifiedInit] = [JSON.stringify(url), JSON.stringify(init)];

  const processJson = useCallback(processData || ((jsonBody) => jsonBody), []);

  useEffect(() => {
    // Define asynchronous function
    const fetchApi = async () => {
      try {
        // Fetch data from REST API
        if(typeof url === 'object' && Array.isArray(url)) {
            Promise.all(url.map((request) => {
                return fetch(request).then(res => {
                    return res.json();
                
            }).then((data) => {
                return data;
            })
        }) ).then((values) => {
                const processedData = processJson(values);
                setData(processedData);
        }).catch((error) =>{
            setError(error);
        });
        } else {
        const response = await fetch(url, init);
        
        if (response.status === 200) {
          // Extract json
          const rawData = await response.json();
          const processedData = processJson(rawData);
          setData(processedData);
        }
        else {
            setError(response.statusText);
            console.error(`Error ${response.status} ${response.statusText}`);
          }
     } 
      } catch (error) {
        setError(error);
        console.error(`Error ${error}`);
      }
    };

    fetchApi();
  }, [stringifiedUrl, stringifiedInit, processJson]);

  return {data,error};
};