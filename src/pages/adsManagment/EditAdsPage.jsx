import React, { useEffect, useRef, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db} from '../../firebass.config'
import { nanoid } from 'nanoid';
import{getAuth} from 'firebase/auth'
import { toast } from 'react-toastify';
import { updateDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import LoaderComponent from '../../component/LoaderComponent';
function EditAdsPage() {
  const[loading,setLoading]=useState(false)
  const params=useParams()
  const navigate=useNavigate()
  const[formData,setFormData]=useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: [],
    userRef:''
  })
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
  }=formData
  const isMounted=useRef(true)
  useEffect(()=>{
    if(isMounted){
        try {
            const getOldAdData=async()=>{
                const adRef=doc(db,'listings',params.adid)
                const adSnap=await getDoc(adRef)
                if( adSnap.exists()){
                    setFormData(prev=>({...prev,...adSnap.data(),images:[...adSnap.data().imgUrls]}))
                }
            }
            getOldAdData()
        } catch (error) {
            
        }
    }
    return ()=>{
        isMounted.current=false
    }
  },[params.adid])
  // togglerFields
  function toggle(e){
    let boolean
    if(e.target.value!=='true'&&e.target.value!=='false'){
      setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
    } else {
      e.target.value==='true'?boolean=true:boolean=false;
      setFormData(prev=>({...prev,[e.target.name]:boolean}))
  }
  }
  // nonTogglerFields
  function onChange(e){

    if (e.target.files) {
      if(e.target.files.length<7){
        setFormData((prevState) => ({
          ...prevState,
          images: e.target.files,
        }))
      }
      else return toast.error("Put Maximum 6 Images")

    } 
    else if(!e.target.files) setFormData(prev=>({
      ...prev,[e.target.id]:e.target.value
    }))
  }
  // uploading Ad
  async function onSubmit(e){
    e.preventDefault()
    if(images.length===0){
      return toast.error("Check Images number")
    }
    setLoading(true)
    // uploading images to storage
    const auth=getAuth()
    const storeImage=async (image)=>{
      return new Promise((res,rej)=>{
        const storage=getStorage()
        const fileName=`${auth.currentUser.uid}-${image.name}-${nanoid()}`
        const storageRef=ref(storage, 'images/' + fileName)
        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on('state_changed', 
        (snapshot) => {
          
        }, 
  (error) => {
    rej(error)
    setLoading(false)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      res(downloadURL);
    });
  }
);
      })
    }
    const imgUrls= await Promise.all(
      [...images].map((image)=>storeImage(image))
    ).catch(()=>{
      toast.error('Images not Uploaded')
      setLoading(false)
    })
  // uploading all data to firestore db     
    const formDataCopy={...formData,userRef:auth.currentUser.uid,imgUrls,timestamp:serverTimestamp()}
    delete formDataCopy.images
    if(!offer){delete formDataCopy.discountedPrice}
    const docRef=doc(db,'listings',params.adid)
    await updateDoc(docRef,formDataCopy)
    toast.success("Changes Saved")
    setLoading(false)
    navigate(`/category/${type}/${params.adid}`)
  }
  if(loading){
    return <LoaderComponent/>
  }
  else return (<div className='sign-in p-6 min-h-screen pb-36'>
  <div className="container">
  <div className="head-text mb-4">
    <h2 className='head-title text-center text-violet-600 mb-8'>House Marketplace</h2>
    <h2 className='subhead-title text-primary'>Edit Ad</h2>
    </div>
  <form onSubmit={onSubmit}>
    {/* categorysection */}
   <div className="category flex items-center gap-3 mb-4">
   <span className='font-bold text-lg'>For Sale / Rent: </span> 
   <button 
   className={`btn btn-info rounded-2xl  text-black border-0 ${type!=='rent'?'bg-sky-500 text-white':'bg-white'}` }
   name='type'
   value="sale"
   onClick={toggle}
   type='button'
   >Sell</button>    
   <button 
   className={`btn btn-info  rounded-2xl text-black border-0 ${type==='rent'?'bg-sky-500 text-white':'bg-white'}`}
   name='type'
   value="rent"
   onClick={toggle}
   >Rent</button>    
    </div>
    {/* namesection */}
    <div className="name flex gap-3 items-center mb-4 justify-between w-1/4">
      <label className=' font-bold text-lg' htmlFor="name">Name:</label>
      <input className='form-control rounded-full border-0 px-4 py-3 w-3/4'
       type="text"
        name="name"
        id="name" 
        minLength="4" 
        maxLength="30"
        onChange={onChange}
        required
        value={name}
       />
    </div>
    {/* addresssection */}
    <div className="address flex gap-3 items-center mb-4 justify-between w-1/4">
      <label className=' font-bold text-lg' htmlFor="address">Address:</label>
      <input className='form-control rounded-full border-0 px-4 py-3 w-3/4'
        type="text"
        name="address"
        id="address"
        onChange={onChange} 
        required
        value={address}
       />
    </div>
    {/* contentsection */}
    <div className="content flex gap-3 mb-4">
    <div className="bedrooms flex gap-3 items-center ">
      <label className=' font-bold text-lg' htmlFor="bedrooms">Bedrooms:</label>
      <input className='form-control rounded-2xl border-0 px-4 py-3 w-fit'
       type="number"
        name="bedrooms"
         id="bedrooms" 
         max="6"
         min='1'
         onChange={onChange}
         required
         value={bedrooms}
       />
    </div>
    <div className="bathrooms flex gap-3 items-center">
      <label className=' font-bold text-lg' htmlFor="bathrooms">Bathrooms:</label>
      <input className='form-control rounded-2xl border-0 px-4 py-3 w-fit'
       type="number"
        name="bathrooms"
         id="bathrooms" 
         max="6"
         min='1'
         onChange={onChange}
         required
         value={bathrooms}
       />
    </div>
    </div>
    {/* parkingsection */}
    <div className="parking flex items-center gap-3 mb-4">
   <span className='font-bold text-lg'>Parking spot: </span> 
   <button className={`btn btn-info rounded-2xl  text-black border-0 ${parking===true?'bg-sky-500 text-white':'bg-white'}` }
    value='true'
    name='parking'
    onClick={toggle}
    type='button'
    >Yes</button>    
   <button className={`btn btn-info rounded-2xl  text-black border-0 ${parking===false?'bg-sky-500 text-white':'bg-white'}` }
      value='false'
           name='parking'
           onClick={toggle}
           type='button'
    >No</button>    
    </div>
    {/* furnishedsection */}
    <div className="furnished flex items-center gap-3 mb-4">
   <span className='font-bold text-lg'>Furnished: </span> 
   <button
   className={`btn btn-info rounded-2xl  text-black border-0 ${furnished===true?'bg-sky-500 text-white':'bg-white'}` }
   value='true'
   name='furnished'
   onClick={toggle}
   type='button'

   >Yes</button>    
   <button
   className={`btn btn-info rounded-2xl  text-black border-0 ${furnished===false?'bg-sky-500 text-white':'bg-white'}` }
   value="false"
   name='furnished'
   onClick={toggle}
   type='button'

    >No</button>    
    </div>
    {/* offersection */}
    <div className="offer flex items-center gap-3 mb-4">
   <span className='font-bold text-lg'>Offer: </span> 
   <button 
   className={`btn btn-info rounded-2xl  text-black border-0 ${offer===true?'bg-sky-500 text-white':'bg-white'}` }
   value='true'
   name='offer'
   onClick={toggle}
      type='button'

   >Yes</button>    
   <button 
   className={`btn btn-info rounded-2xl  text-black border-0 ${offer===false?'bg-sky-500 text-white':'bg-white'}` }
   value='false'
   name='offer'
   onClick={toggle}
      type='button'

   >No</button>    
    </div>
    {/* Pricesection */}
    <div className="Price flex gap-3 items-center mb-4">
      <label className=' font-bold text-lg' htmlFor="price">Price:</label>
      <input className='form-control rounded-2xl border-0 px-4 py-3 w-fit'
       type="number"
        name="regularPrice"
         id="regularPrice" 
         min="50"
         max='1000000'
         onChange={onChange}
         required
         value={regularPrice}
       />
       <span className='font-bold'>$ {type==='rent'&&'/ Month'}</span>
    </div>
   {offer && <div className="Price flex gap-3 items-center mb-4">
      <label className=' font-bold text-lg' htmlFor="price">After Discount:</label>
      <input className='form-control rounded-2xl border-0 px-4 py-3 w-fit'
       type="number"
        name="discountedPrice"
         id="discountedPrice" 
         min="50"
         max={regularPrice-1}
         onChange={onChange}
         required
         value={discountedPrice}
       />
       <span className='font-bold'>$ {type==='rent'&&'/ Month'}</span>
    </div>}
    {/* imagessection */}
    <div className="images flex gap-3 items-center mb-4">
    <label className=' font-bold text-lg' htmlFor="image">Images:</label>
    <p className='text-secondry'>First image will be cover,(max 6)</p>
    </div>
      <input className='form-control rounded-2xl border-0 px-4 py-3 w-fit
       file:rounded-2xl  file:bg-sky-600   file:border-0 file:font-bold file:text-white mb-8'
       type="file"
       name="images"
         id="images"
         onChange={onChange}
         max='6'
         multiple
         accept='.jpg,.png,.jpeg,.webp'
         required
         
       />

       <button className="btn btn-info bg-sky-600 text-white font-bold text-2xl w-1/2 block m-auto">Edit</button>
</form>
  </div>
</div>)
}
   
  


export default EditAdsPage