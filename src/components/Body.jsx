import { Outlet,useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import {useEffect } from "react"
import {addUser} from "../utils/userSlice"

const Body = ()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async()=>{
      try {
        const res =  await axios.get(BASE_URL+"/profile/view",
            {withCredentials:true});
            dispatch(addUser(res?.data));
            
      } 
      catch (err) {
        if(err.status === 401){
            return navigate("/login");
        }
        console.log(err);
      }  
    } 

    useEffect( () => {
      fetchUser();
    }, [])
    

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="h-screen">
            <Outlet />
            </div>
            <Footer/>
        </div>
    )
}
export default Body;
