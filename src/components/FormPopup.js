'use client'
import React, { useEffect,useState } from 'react'
import SidebarFilter from './FormComponents/SidebarFilter'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { docketGeneration } from '@/state/store'
import { useToast } from './ui/use-toast'

const FormPopup = ({show,setShow,supplierData,mata}) => {
    const[sup, setSup]=useState([])
    const [position,setPosition]=useState('')
    const [pnumber,setPnumber]=useState('')
    const [pon,setPon]=useState([])
    const [name, setName]=useState('')
    const [stime, setStime]=useState('')
    const [etime, setEtime]=useState('')
    const [hour, setHour]=useState('')
    const [rate, setRate]=useState('')
    const [but,setBut]=useState(true)
    useEffect(()=>{
        const uniqueSupplier= supplierData && Array.from(new Set(supplierData))
        uniqueSupplier && setSup(uniqueSupplier)
    },[])
    useEffect(()=>{
      console.log(mata,'dd')
      const PO=mata && position && mata.filter((po) =>po.Supplier===position)
     const values = PO && PO.map((item)=>item["PO Number"])
     const uniquePo= values && Array.from(new Set(values))
        uniquePo && values && setPon(uniquePo) 
    },[position])

    useEffect(()=>{
      if (name && stime && etime && hour && rate && position &&pon){
        setBut(false)
      }

    },[name,stime,etime,hour,rate,position])
    const handleSupplier=(value)=>{
      setPosition(value)

      console.log("Position value:", value)
  }

  const handlePO=(value)=>{
    setPnumber(value)

    console.log("PO value:", value)
}
const {toast}=useToast()
const queryClient = useQueryClient()
const {mutate:createDocket}=useMutation({
  mutationFn: async ()=>{
    const payload={
      Cname:name,
      startTime:stime,
      endTime:etime,
      hours:hour,
      rate:rate,
      supplier:position,
      po:pnumber

    }
    

    const {data}= await axios.post('/api/docket', payload)
    return data
  },
  onError: (err)=>{
    if(err instanceof AxiosError) {
      if(err.response?.status === 409){
        return toast({
          title:'Subbredit with this name already exists',
          description:'Please choose a different name fot your subbredit',
          variant:'destructive'
        })
      }

      if(err.response?.status === 422){
        return toast({
          title:'Inavlid validation ',
          description:'Please choose a different name fot your subbredit',
          variant:'destructive'
        })
      }
     
    }
    toast({
      title:'There was an error',
      description:'could not create subbredit',
      variant:'destructive'
    })

  },
onSuccess:()=>{
  queryClient.invalidateQueries({ queryKey: ['docket'] })
  setShow(false)
  return toast({
    title: "Scheduled: Catch up",
    description: "Friday, February 10, 2023 at 5:57 PM",
    variant:'destructive'
  })
}
})
    return (
    <div className='fixed inset-0 bg-zinc-900/20 z-10'>
    <div className='constainer flex items-center h-full max-w-lg mx-auto'>
      <div className='relative bg-white w-full h-fit py-20 rounded-lg'>
        <div className='absolute top-4 right-4'>
          <div className='rounded-full w-6 z-30 cursor-pointer text-black' onClick={()=>setShow(false)}>X</div>

        </div>
        <div className='flex flex-col rounded-md '>
        <form class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Name
      </label>
      <input
       value={name} 
       onChange={(e)=>setName(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
      <p class="text-red-500 text-xs italic">Please fill out all the field.</p>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Start Time
      </label>
      <input 
         value={stime} 
         onChange={(e)=>setStime(e.target.value)}
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        End Time
      </label>
      <input
         value={etime} 
         onChange={(e)=>setEtime(e.target.value)}
      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        No of Hours Worked
      </label>
      <input
         value={hour} 
         onChange={(e)=>setHour(e.target.value)}
      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Rate
      </label>
      <input
         value={rate} 
         onChange={(e)=>setRate(e.target.value)}
      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-2">

    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        Supplier
      </label>
      <div class="relative">
    <SidebarFilter
        type="Supplier"
        size={"small"}
        single={true}
        dropDown={sup}
        onValueChange={handleSupplier}
        defaultValue=''
        
    />
      <SidebarFilter
        type="Supplier"
        size={"small"}
        single={true}
        dropDown={pon}
        onValueChange={handlePO}
        defaultValue=''
        
    />

      </div>
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        State
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>New Mexico</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>

  </div>
</form>

        </div>
        <div className='flex justify-end gap-4 bg-black'>
         <button
         disabled={but}
         onClick={createDocket}
         
         > Create Community</button> 
      </div> 



      </div>
    </div>

  </div>
  )
}

export default FormPopup