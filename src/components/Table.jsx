
import TableData from './TableData';
import { useState, useEffect } from 'react';
import {useFetch} from '../hooks/use-fetch'
import Loaders from '../shared/Loader'

const requiredKey = ['id','property','user','network','date', 'image','content']
   const requiredUrl = ["https://bcv-fe-interview-api.azapata.io/api/posts",
   "https://bcv-fe-interview-api.azapata.io/api/users", 
     "https://bcv-fe-interview-api.azapata.io/api/properties"]
   const meta = [
    {
      key: 'id',
      text: 'ID',
      sort: true,
    },
    {
      key: 'property_name',
      text: 'Property',
      sort: true,
    },
    {
      key: 'user_name',
      text: 'User',
      sort: true,
    },
    {
      key: 'social_network',
      text: 'Network',
      sort: true,
    },
    {
        key: 'post_date',
        text: 'Date',
        sort: true,
      },
      {
        key: 'post_media',
        text: 'Image',
        sort: false,
      },
      {
        key: 'post_content',
        text: 'Content',
        sort: false,
      },
   ]
   
   const requestedObj = {
       id: "",
       property: "",
       user: '',
       network: "",
       date: "",
       image: "",
       content: ""
   }
   const pageSize = 5;
   
   function normalizeData(data) {
    // return data.map(td => {
    //   const keys = Object.keys(td);
    //   return keys.map(key => ({ key, text: td[key] }));
    // });
    // const modArr = data[0];
    let set = new Set();
    let map = new Map();
    let unionArray = data?.flat(1)?.forEach(item => {
    //   if (!set.has(item.id)) {
    //     set.add(item.id);
    //     return true;
    //   }
    //   return false;
    if(!map.get(item.id)){
        map.set(item.id, item)
    }
    else {
        if(item.type=="property") {
            map.set(item.id, {...map.get(item.id), property_name: item.name})
        }
        if(item.type=="user") {
            map.set(item.id, {...map.get(item.id), user_name: item.name,profile_picture: item.profile_picture})
        }
       
    }
    });
    // return data.map(td=> {
    //    return [...map].map(([key, value]) => ({ value }));
    return [...map].map(item => item[1])
     

    // })
   
   }
   
   
   const compare = {
    '>': (d1, d2) => d1 > d2,
    '<': (d1, d2) => d1 < d2,
   }
   
   const Table = ()=> {
    const [headerMeta, setHeaderMeta] = useState(meta);
    const [tableData, setTableData] = useState([]);
    const [sortBy, setSortBy] = useState({key: null, order: '>' });
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const {data :data1, error}= useFetch({
        url: requiredUrl
      });

      
    useEffect(() => {
      function sortFunc(m) {
        setSortBy({ key: m.key, order: sortBy.order === '>' ? '<' : '>' });
      }
   
    setHeaderMeta(
        (currentHeaderMeta) => currentHeaderMeta.map((m) => m.sort ? { ...m, sortFunc: () => sortFunc(m) } : m)
      );
    }, [sortBy]);
   
    useEffect(() => {
      // normalize data
      console.log(data1)
     if(data1?.length >0)
      setTableData(normalizeData(data1), meta);
    }, [data1]);
   
    useEffect(() => {
      // sort
    //   setTableData(normalizeData(data.sort((d1, d2) => compare[sortBy.order](d1[sortBy.key], d2[sortBy.key]))));
    }, [sortBy])
   
    useEffect(() => {
      // paginate
      const startPointer = currentPage * pageSize;
      const endPointer = startPointer + pageSize
    //   setTableData(normalizeData(data.slice(startPointer, endPointer)));
    }, [sortBy, currentPage]);
    if (!data1) {
        return <div><Loaders></Loaders></div>;
      }
      if(error) {
        return <div>Something went wrong !</div>;
      }
    return (
      <div className="container">
        {/* <TableHeader headers={headerMeta} /> */}
        <TableData data={tableData} meta={meta} />

        {/* <Paginator page={currentPage} setPage={setCurrentPage} size={Math.ceil(tableData.length / pageSize)} /> */}
      </div>
    );
   }

   export default Table;