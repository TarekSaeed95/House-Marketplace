import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Explore from './pages/Explore'
import SignIn from "./pages/authentication/SignIn";
import SignUp from './pages/authentication/SignUp'
import ForgotPassword from './pages/authentication/ForgotPassword'
import Offers from "./pages/Offers";
import NavbarComponent from "./component/NavbarComponent";
import Profile from "./pages/Profile";
import PrivateRoute from "./component/PrivateRouteComponent";
import AddingAds from "./pages/adsManagment/AddingAds";
import AdPage from './pages/adsManagment/AdPage'
import EditAdsPage from "./pages/adsManagment/EditAdsPage";
import {ToastContainer} from 'react-toastify'
import Category from "./pages/Category";
import ContactLadnlord from "./pages/ContactLadnlord";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Explore/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path='/profile' element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/addingads" element={<AddingAds/>}/>
        </Route>
        <Route path="/category/:type" element={<Category/>}/>
        <Route path="/category/:type/:id" element={<AdPage/>}/>
        <Route path="/offers" element={<Offers/>}/>
        <Route path="/contact/:userid" element={<ContactLadnlord/>}/>
        <Route path="/editads/:adid" element={<EditAdsPage/>}/>
        
      </Routes>
      <NavbarComponent/>
    </Router>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </>
  )
  

}

export default App;
