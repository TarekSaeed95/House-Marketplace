import { useEffect, useRef, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebass.config";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import LoaderComponent from "./LoaderComponent";
import { FaHeartBroken } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
function ImageSlider() {
  const isMounted = useRef(true);
  const [ads, setAds] = useState(null);
  const [loading, setLoading] = useState(true);
  const mini = true;
  const navigate=useNavigate()
  useEffect(() => {
    if (isMounted) {
      const getData = async () => {
        const docRef = collection(db, "listings");
        const q = query(docRef, where("offer", "==", true), limit(5));
        const docSnap = await getDocs(q);
        const dummyList = [];
        docSnap.forEach((el) => {
          return dummyList.push({ id: el.id, data: el.data() });
        });
        setAds(dummyList);
        setLoading(false);
      };
      getData();
    }
    return () => {
      isMounted.current = false;
      setLoading(false);
    };
  }, [isMounted]);
  if (loading) {
    return <LoaderComponent mini={mini} />;
  }
  if (ads.length === 0) {
    return (
      <div className="text-danger font-bold text-2xl flex gap-3 items-center">
        No Ads available yet
        <FaHeartBroken />
      </div>
    );
  }
  if (ads) {
    return (
      <>
        <p className="badge badge-success text-white mb-4">Recommended Ads</p>
        <Swiper
          className="h-96 rounded-2xl"
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          <span id="hot-deals" className="bg-danger">Hot Deals</span>
          {ads.map((ad, index) => (
            <SwiperSlide key={index}
            style={{cursor:"pointer"}}
            onClick={()=>navigate(`/category/${ad.data.type}/${ad.id}`)}
            >
              <div className="ad-details absolute index-1 top-5 right-2 flex badge badge-warning  h-fit  gap-3 items-center">
                <p className="badge badge-warning text-2xl py-3 px-3 text-white ">
                  Sale{" "}
                  {Math.ceil(
                    Math.abs(
                      ((+ad.data.discountedPrice - +ad.data.regularPrice) /
                        +ad.data.regularPrice) *
                        100
                    )
                  )}
                  %
                </p>
                <h2 className="badge badge-info text-lg text-white py-3 px-3 ">{ad.data.name}</h2>
                <p className="badge badge-neutral text-lg text-white py-3 px-3">{ad.data.address}</p>
              </div>
              <div
                style={{
                  background: `url(${ad.data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="w-full h-full rounded-2xl"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  }
}

export default ImageSlider;
