import { Link, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebass.config";
import { useEffect, useRef, useState } from "react";
import LoaderComponent from "../../component/LoaderComponent";
import { FaBath, FaBed } from "react-icons/fa";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAuth } from "firebase/auth";
import "swiper/swiper-bundle.css";
function AdPage() {
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef();
  const param = useParams();
  const auth = getAuth();
  useEffect(() => {
    if (isMounted) {
      const getAd = async () => {
        const adRef = doc(db, "listings", param.id);
        const getAd = await getDoc(adRef);
        if (getAd.exists()) {
          setAd(getAd.data());
          setLoading(false);
        }
      };
      getAd();
    }
    return () => {
      isMounted.current = false;
      setLoading(false);
    };
  }, [param.id]);
  if (loading) {
    return <LoaderComponent />;
  } else
    return (
      <div className="explore py-8 min-h-screen">
        <div className="container">
          <div className="head-text mb-4">
            <h2 className="head-title text-center text-violet-600 mb-8">
              House Marketplace
            </h2>
          </div>
          <div className="image-slider">
            <Swiper
              className="h-96 rounded-2xl"
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {ad.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      background: `url(${ad.imgUrls[index]}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                    className="w-full h-full rounded-2xl"
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="content">
            <div className="header flex justify-between items-center">
              <h2 className="subhead-title text-primary ">{ad.name}</h2>
              <div className="features flex gap-3">
                {ad.furnished && (
                  <span className="text-lg font-bold badge badge-warning p-3 text-white">
                    Furnished
                  </span>
                )}
                {ad.parking && (
                  <span className="text-lg font-bold badge badge-warning p-3 text-white">
                    Parking spot
                  </span>
                )}
              </div>
            </div>
            <p className="badge badge-success text-white ">
              For {ad.type.toUpperCase()}
            </p>
            <div className="price flex gap-2 my-4 text-2xl font-bold items-end h-12">
              Price:
              {ad.offer && (
                <p className="text-3xl font-bold text-green-700">
                  {ad.discountedPrice}$
                </p>
              )}
              <p
                className={`text-3xl font-bold text-green-700 ${
                  ad.offer && "text-xl line-through text-slate-400 self-start"
                }`}
              >
                {ad.regularPrice}$
              </p>
            </div>

            <p className=" my-4 text-2xl font-bold w-64 flex justify-between gap-3">
              Location:{" "}
              <span className="text-3xl font-bold text-success m-auto  ">
                {ad.address}
              </span>
            </p>
            <p className=" my-4 text-2xl font-bold w-64 flex justify-between">
              Bedrooms:{" "}
              <span className="text-3xl font-bold text-success  m-auto">
                {ad.bedrooms}
              </span>
              <FaBed className="text-violet-500 text-4xl" />
            </p>
            <p className=" my-4 text-2xl font-bold w-64 flex justify-between">
              Bathrooms:{" "}
              <span className="text-3xl font-bold text-success m-auto ">
                {ad.bathrooms}
              </span>
              <FaBath className="text-violet-500 text-4xl" />
            </p>
            {auth.currentUser.uid!==ad.userRef&&
              <Link to={`/contact/${ad.userRef}?AdName=${ad.name}`}>
                <button className="btn btn-info bg-sky-600 text-white font-bold text-2xl w-1/2 block m-auto py-4 rounded-full h-fit flex items-center">
                  Contact Landlord
                </button>
              </Link>
            }
          </div>
        </div>
      </div>
    );
}

export default AdPage;
