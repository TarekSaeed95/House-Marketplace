import { FaBath, FaBed, FaDollarSign, FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import EditAds from './EditAdsComponent'


function Ad({data,id,edit,del,deleteAd}) {
  const {type,name,address,regularPrice,discountedPrice,bathrooms,bedrooms,imgUrls}=data
  const navigate=useNavigate()

  return (
        <div className="card bg-transparent border-0 compact card-side overflow-hidden cursor-pointer pr-8 rounded-2xl mb-8 "
        onClick={()=>{navigate(`/category/${type}/${id}`)}}>
            <figure className='w-96 h-64 rounded-2xl'><img className='rounded-2xl' src={imgUrls[0]}  alt="slide" /></figure>
            <div className="card-body gap-3">
              <p className="card-title font-bold text-2xl text-info ">{name}</p>
              <p className=" font-bold text-lg">
                <span className='text-gray-400'>Location: </span> {address}</p>
              <div className="price flex flex-col  font-bold text-lg justify-center gap-3">
              <p className='flex gap-1  items-center'>
              <span className='text-gray-400'>Price: </span>
                {regularPrice}<FaDollarSign/>{type==='rent'&&"/ Month"}
              </p> 
              {discountedPrice&&<p className='flex gap-1 items-center'>
              <span className='text-gray-400'>After Discount: </span>
              {discountedPrice}<FaDollarSign/>{type==='rent'&&"/ Month"}
              </p>} 
              </div>
              <div className="house-content flex gap-4 text-lg font-bold">
                <div className="bedrooms flex gap-4 items-center">
                <FaBed className='text-violet-500 text-2xl'/>
                <span>{bedrooms}</span>
                <span>bedrooms</span>
                </div>
                <div className="bathrooms flex gap-4 items-center">
                <FaBath className='text-violet-500 text-2xl'/>
                <span>{bathrooms}</span>
                <span>bathrooms</span>
                </div>
              </div>
            </div>
            {edit&&<div className="edit"><EditAds id={id}/></div>}
            {del&&<FaTrashAlt className='text-3xl text-danger ml-4  cursor-pointer mt-4' onClick={(event)=>{deleteAd(event,id)}}/>}
        </div>
        
  )
}

export default Ad