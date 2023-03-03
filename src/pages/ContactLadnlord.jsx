import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoaderComponent from "../component/LoaderComponent";
import { db } from "../firebass.config";

function ContactLandlord() {
  const [loading, setLoading] = useState(true);
const [landlord,setLandlord]=useState(null)
  const isMounted = useRef();
  const landlordId=useParams().userid
  const adName=useSearchParams()[0].get('AdName')
  const [formData,setFormData]=useState({})
  const navigate=useNavigate()
  const {
    emailbody
  }=formData
  useEffect(()=>{
    if(isMounted){
        try {
            const getLandlordData=async()=>{
                const userRef=doc(db,'users',landlordId)
                const userSnap=await getDoc(userRef)
                if(userSnap.exists()){
                    setLandlord(userSnap.data())
                    setLoading(false)
                }
            }
            getLandlordData()
        } catch (error) {
            toast.error("couldn`t identify user")
            setLoading(false)

        }
       return ()=>{
        isMounted.current=false
        setLoading(false)

       }
    }
},[isMounted, landlordId])
function onChange(e){
    setFormData(prev=>({...prev,[e.target.id]:e.target.value}))
}

  if (loading) {
    return <LoaderComponent />;
  } 
    return (
      <div className="explore py-8 min-h-screen">
        <div className="container">
          <div className="head-text mb-4">
            <h2 className="head-title text-center text-violet-600 mb-8">
              House Marketplace
            </h2>
          </div>
          <div className="content">
              <h2 className="subhead-title text-primary ">Contact Landlord</h2>
              {landlord!==null && (
               <form>
                    <textarea className="form-control rounded-2xl border-0 mb-8 h-96 p-16 text-xl" name="emailbody" id="emailbody" onChange={onChange} value={emailbody}>
                    </textarea>
                    <a href={`mailto:${landlord.email}?subject=${adName}&body=${emailbody}`} onClick={()=>navigate('/')}>
                        <button type="button" className="btn btn-success  text-white font-bold text-2xl w-1/2 block m-auto py-4 rounded-full h-fit flex items-center" >Send Offer</button>
                        </a>
               </form>
              )}
        </div>
          </div>
          </div>
    );
}

export default ContactLandlord;
