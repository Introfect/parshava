"use client"
import React, { useEffect, useState,useRef } from 'react';
import Papa from 'papaparse';
import FormPopup from './FormPopup';
import { Button } from '@mui/material';
import { useToast } from './ui/use-toast';

function CsvUploader() {
  const [supplierData, setSupplierData] = useState([]);
  const [show,setShow]=useState(false)
  const[mata,setMata]=useState([])
  const {toast}=useToast()


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
  const handlePopup=()=>{
    if(mata.length){
      setShow(true)
    }else{
      return toast({
        title:"Please Upload CSV first",
        variant:'destructive'
      })
    }
    
  }
  const fileInputRef = useRef(null);
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className='text-white'>
     
      <div className='flex justify-center space-x-10 my-4'>
      <button
className='text-black p-3 rounded border-2 border-black hover:bg-black hover:text-white'
   onClick={handlePopup}
   >Add Docket</button> 
     <button
        className="bg-black hover:bg-white hover:text-black hover:border-2 hover:border-black text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={handleFileInputClick}
      >
        Upload File
      </button>

      </div>
      <p className=' text-center text-red-500 font-light'>Please upload a file first to be able to create dockets</p>
  
      <input className='text-black hidden'type="file" accept=".csv"  ref={fileInputRef} onChange={handleFileUpload} />
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
