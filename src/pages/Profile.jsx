import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { FaMailBulk, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Ad from "../component/AdComponent";
import LoaderComponent from "../component/LoaderComponent";
import { db } from "../firebass.config";

function Profile() {
  const auth = getAuth();
  const [editMode, setEditMode] = useState(false);
  const mini = true;
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState([]);
  function onChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  // Editing userdata
  function editHandler(e) {
    setEditMode((prev) => !prev);
  }
  // Submitting userdata
  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });
        toast.success("Successful Changes");
      }
    } catch (error) {
      toast.error("try again");
    }
  }
  // Logging out function
  function logout() {
    auth.signOut();
    navigate("/");
  }
  // gettingAds
  useEffect(() => {
    if (isMounted) {
      try {
        const getAds = async () => {
          const docRef = collection(db, "listings");
          const q = query(
            docRef,
            where("userRef", "==", auth.currentUser.uid),
            orderBy("timestamp", "desc"),
            limit(10)
          );
          const docSnap = await getDocs(q);
          const dummyLitsing = [];
          docSnap.forEach((ad) => {
            dummyLitsing.push({ id: ad.id, data: ad.data() });
          });
          setAds(dummyLitsing);
          setLoading(false);
        };
        getAds();
      } catch (error) {
        toast.error("Couldn`t get Ads!!");
      }
    }
    return () => {
      isMounted.current = false;
    };
  }, [auth.currentUser.uid, isMounted]);
  //deletingAds
  function deleteAd(event, id) {
    event.stopPropagation();
    try {
      const getOldAdData = async () => {
        if(window.confirm("Are you sure..")){
          const adRef = doc(db, "listings", id);
          await deleteDoc(adRef);
          toast.success("Deleted")
          setAds((prev) =>
            prev.filter((ad) => {
              return ad.id !== id;
            })
          );
        }else return

      };
      getOldAdData();
    } catch (error) {
      toast.error("Failed");
    }
  }
  return (
    <div className="sign-in p-6 min-h-screen">
      <h2 className="text-center text-violet-700 head-title	mb-20	">
        House Marketplace
      </h2>
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="my-8 flex items-center">
            <FaUser className="icon text-warning" />
            <input
              disabled={!editMode}
              type="text"
              placeholder="Your name"
              className="form-control rounded-full placeholder:text-slate-400 border-0 px-16 py-3"
              id="name"
              value={name}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="my-8 flex items-center">
            <FaMailBulk className="icon text-warning" />
            <input
              disabled
              type="email"
              placeholder="Email"
              className="form-control rounded-full placeholder:text-slate-400 border-0 px-16 py-3"
              id="email"
              value={email}
              // onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="buttons flex gap-3 justify-end">
            <button className="btn btn-info text-white" onClick={editHandler}>
              {editMode ? "Done" : "Edit"}
            </button>
            <span className="btn btn-warning text-white" onClick={logout}>
              Logout
            </span>
            <Link className="btn btn-Success text-white" to="addingads">
              Publish new Ad
            </Link>
          </div>
        </form>
     
      {loading ? (
          <LoaderComponent mini={mini} />
        ) :(<div className="adss-holder mb-56 mt-16">
              {ads.length > 0 ? (
                <h2 className="subhead-title text-primary mb-8">Your Ads</h2>
              ) : null}
              {ads.length > 0
                ? ads.map((list) => (
                    <Ad
                      data={list.data}
                      id={list.id}
                      key={list.id}
                      edit={true}
                      del={true}
                      deleteAd={deleteAd}
                      />
                    ))
                    : null}
            </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
