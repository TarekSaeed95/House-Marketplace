import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {db} from '../firebass.config'
import {doc,getDoc,serverTimestamp,setDoc} from 'firebase/firestore'
import {ReactComponent as Google} from '../assets/svg/googleIcon.svg'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function GoogleOAuth() {
    const navigate=useNavigate()
  async function onClick(){
    try {
        const auth=getAuth();
        const provider=new GoogleAuthProvider();
        const userCredential=await signInWithPopup(auth,provider);
        const user=userCredential.user;
        const docRef=doc(db,"users",user.uid);
        const docSnap=await getDoc(docRef);
        if(!docSnap.exists()){
            await setDoc(docRef,{
                name:user.displayName,
                email:user.email,
                timeStamp:serverTimestamp()
            })     
            toast.success(`Congratulation ${auth.currentUser.displayName}`)          
        } else toast.success(`Welcome back ${auth.currentUser.displayName}`)
        setTimeout(() => {
          navigate('/')
        }, 1000);
    } catch (error) {
        toast.error("Unvalid email")
    } 

  }
  return (
    <button onClick={onClick} 
    className='px-8 py-3 rounded-xl flex gap-3 items-center  mx-auto'
    style={{backgroundColor:"#FFFFFF"}}>
    <Google width="35px" height="35px" 
    style={{cursor:"pointer"}}
    />Continue with Google</button>
    
  )
}

export default GoogleOAuth