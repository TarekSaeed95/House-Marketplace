import React from 'react'
import {FaEdit} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
function EditAds({id}) {
    const navigate=useNavigate()
    function onClick (event){
        event.stopPropagation()
        navigate(`/editads/${id}`)
    }
  return (
        <FaEdit className='text-3xl text-warning self-end cursor-pointer mt-4' onClick={onClick}/>
  )
}

export default EditAds