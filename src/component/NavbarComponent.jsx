import {ReactComponent as ExploreIcon} from "../assets/svg/exploreIcon.svg"
import {ReactComponent as ProfileIcon} from "../assets/svg/personOutlineIcon.svg"
import {ReactComponent as OffersIcon} from "../assets/svg/localOfferIcon.svg"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
function NavbarComponent() {
    const location=useLocation();

    const navigate=useNavigate();
    const pathMatchRoute=(route)=>{
        if (route===location.pathname){
            return true
        }
    }
  return (
    <footer className="fixed-bottom w-full bottom-0 left-0 bg-white">
        <nav className="navbar navbar-expand">
            <ul className="navbar-nav flex justify-center m-auto gap-5 ">
            <li className="nav-item active d-flex flex-column gap-2 align-items-center"
            style={{cursor:"pointer"}}
            onClick={()=>{
                navigate("/")
            }}
            >
                <ExploreIcon 
                width="45px"
                height="45px"
                fill={pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"}/>
               <span style={{color:pathMatchRoute("/")?'#2c2c2c':'#8f8f8f'}}>
               Explore
               </span> 
            </li>
            <li className="nav-item d-flex flex-column gap-2 align-items-center"
            style={{cursor:"pointer"}}
                  onClick={()=>{
                    navigate("/offers")
                }}
            >
                <OffersIcon 
                width="45px"
                height="45px"
                fill={pathMatchRoute("/offers") ? "#2c2c2c" : "#8f8f8f"}/>
               <span style={{color:pathMatchRoute("/offers")?'#2c2c2c':'#8f8f8f'}}>
               Offers
               </span> 
            </li>
            <li className="nav-item d-flex flex-column gap-2 align-items-center"
            style={{cursor:"pointer"}}
             onClick={()=>{
                navigate("/profile")
            }}>
                <ProfileIcon width="45px"
                height="45px"
                fill={pathMatchRoute("/profile") ? "#2c2c2c" : "#8f8f8f"}
                />
               <span style={{color:pathMatchRoute("/profile")?'#2c2c2c':'#8f8f8f'}}>
               Profile
               </span> 
            </li>
            </ul>    
        </nav>
        </footer>
  )
}

export default NavbarComponent