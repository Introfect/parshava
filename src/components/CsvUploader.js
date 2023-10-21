"use client"
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import FormPopup from './FormPopup';
import { Button } from '@mui/material';

function CsvUploader() {
  const [supplierData, setSupplierData] = useState([]);
  const [show,setShow]=useState(false)
  const[mata,setMata]=useState([])


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const text = await file.text();
      const parsedData = Papa.parse(text, { header: true });
      for (const row of parsedData.data) {
        if (!row.Supplier) {
          let prevRow = row;
          let i = parsedData.data.indexOf(row) - 1;
          while (i >= 0) {
            if (parsedData.data[i].Supplier) {
              prevRow = parsedData.data[i];
              break;
            }
            i--;
          }
          row.Supplier = prevRow.Supplier;
        }
      }
    


      const updatedSupplierArray = parsedData.data.map(row => row.Supplier);
      console.log(updatedSupplierArray)
      updatedSupplierArray.length && setSupplierData((prev)=>{
        return ([...updatedSupplierArray])
      })
            supplierData && console.log(supplierData)
            parsedData && setMata((prev)=>{
              return([...parsedData.data])
            })
    }
  };  


  return (
    <div className='text-white'>
   <button
className='text-black'
   onClick={()=>setShow(true)}
   >Add Docket</button>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
 {show?
      <FormPopup
      show={show}
      setShow={setShow}
      supplierData={supplierData}
      mata={mata}
      />

      :null
 }
    </div>
  );
}

export default CsvUploader;
