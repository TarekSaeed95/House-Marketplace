import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { FaHeartBroken } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Ad from "../component/AdComponent";
import LoaderComponent from "../component/LoaderComponent";
import { db } from "../firebass.config";

function Offers() {
  const location=useLocation()
  const isMounted = useRef(true);
  const [ads, setAds] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isMounted) {
      const getAds = async () => {
        const docRef = collection(db, "listings");
        const q = query(
          docRef,
          where("offer", "==", true),
          limit(10)
        );
        const docSnap = await getDocs(q);
        const dummylist = [];
        docSnap.forEach((ad) => dummylist.push({ id: ad.id, data: ad.data() }));
        setAds(dummylist);
        setLoading(false);
      };
      getAds();
    } else
      return () => {
        isMounted.current = false;
      };
  }, [isMounted]);
  if (loading) {
    return <LoaderComponent />;
  }

  return(
    <div className="explore py-8 min-h-screen	 ">
    <div className="container">
      <div className="head-text mb-4">
      <h2 className='head-title text-center text-violet-600 mb-8'>House Marketplace</h2>
      <h2 className='subhead-title text-primary'>Ads with {location.pathname[1].toUpperCase()+location.pathname.slice(2)} </h2>
      </div>
     {ads.length>0? ads.map((ad) => <Ad data={ad.data} key={ad.id} id={ad.id} />):<div className="text-danger font-bold text-2xl flex gap-3 items-center">No Ads available yet<FaHeartBroken/></div>}

    </div>
  </div>

  )

  
}

export default Offers;
