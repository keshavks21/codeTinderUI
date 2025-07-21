import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";


const Navbar = () => {
  
  const navigate = useNavigate();
  const user = useSelector((state)=> state.user);
  const dispatch = useDispatch();

  const handleLogout =async ()=>{
   try{ await axios.post(BASE_URL+"/logout",{},{withCredentials:true}),
    dispatch(removeUser());
    return navigate("/login")
  }catch(err){
    console.log(err.message)
  }}

  return (
    <div>
       <div className="navbar  bg-base-100 shadow-sm  z-10">
  <div className="flex-1">
    <Link to={user ? "/":"/login"} className="btn btn-ghost text-xl bg-base-300 ">DevCircle</Link>
  </div>
{   user && <div className="flex items-center font-semibold">
  
      <div className="mx-2 bg-green-400 p-2 text-base-100 rounded-sm">
        <Link to={"/editor"}>Editor</Link>
      </div>
      <div className="dropdown dropdown-end bg-base-300 rounded-sm">
      <div className="flex flex-nowrap">
        <div tabIndex={0} role="button" className="btn btn-ghost avatar ">
        <p className="mx-2">Menu</p>
          <div className="w-10 rounded-full">
            <img
              alt="Photo"
              src={user.photoUrl} />
          </div>
        </div >
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
          <p className="text-center p-5 bg-base-200"> Hi, {user.firstName}</p>
        <li>
          <Link to="/profile" className="justify-between" onClick={() => document.activeElement.blur()}> 
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connection" onClick={() => document.activeElement.blur()}>Connections</Link></li>
        <li><Link to="/request" onClick={() => document.activeElement.blur()}>Requests</Link></li>
        <li><Link to="/premium" onClick={() => document.activeElement.blur()}>Premium</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>}
</div>
    </div>
  )
}

export default Navbar;
