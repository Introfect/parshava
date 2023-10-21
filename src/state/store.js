import {create} from 'zustand'


export const docketGeneration=create()((set)=>({
  list:[],
  addList:(newList)=>{
    set((state)=>{
        return {
            list:[newList]
        }
    })
  }
}))