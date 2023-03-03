import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebass.config'
import {toast} from 'react-toastify'
import Ad from '../component/AdComponent'
import LoaderComponent from '../component/LoaderComponent'
import { FaHeartBroken } from 'react-icons/fa'
function Category() {
    const params=useParams()
    const isMounted=useRef(true)
    const [Ads,setAds]=useState([])
    const[loading, setLoading]=useState(false)
    useEffect(() => {
      setLoading(true)
        if(isMounted){
            try {
                const fetchListings= async ()=>{
                const listingRef= collection(db,'listings')
                const q=query(listingRef,where('type','==',params.type),
                orderBy('timestamp','desc'),limit(10))    
                const querySnap=await getDocs(q)
                const listing=[]
                    querySnap.forEach(doc=>{
                        return listing.push({
                            id:doc.id,
                            data:doc.data()
                        })
                      })
                      setAds(listing)
                      setLoading(false) 
                  }
                fetchListings()
            } catch (error) {
              setLoading(false) 
              toast.error('Could not fetch listings') 
            }
    }
      return () => {
        isMounted.current=false
      }
    }, [isMounted,params.type])
   const items= Ads.map((list)=>(<Ad data={list.data} id={list.id} key={list.id}/>))
   if(loading){
    return <LoaderComponent/>
  }
  else return (
    <div className="explore py-8 min-h-screen	 ">
    <div className="container">
      <div className="head-text mb-4">
      <h2 className='head-title text-center text-violet-600 mb-8'>House Marketplace</h2>
      <h2 className='subhead-title text-primary'>{params.type[0].toUpperCase()+params.type.slice(1)} Ads</h2>
      </div>
      {Ads.length>0?(items):<div className="text-danger font-bold text-2xl flex gap-3 items-center">No Ads available yet<FaHeartBroken/></div>}
    </div>
  </div>

    
    )
}

export default Category