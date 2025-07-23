import { useEffect } from "react";
import { BASE_URL } from "../utils/constants"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest , removeRequest} from "../utils/requestSlice";

const Requests = () => {

    const dispatch = useDispatch();
    const requestData = useSelector((store)=>store.request);

const request = async()=>{
    try{const res = await axios.get( BASE_URL+"/user/requests/received",
        {withCredentials: true}
    );
    dispatch(addRequest(res?.data?.data))

        }
    catch(err){
        console.log(err);
        
    }}

    const handleRequest = async (status, requestId)=>{
       try{ const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+requestId,
            {},
            {withCredentials:true}
        );
        dispatch(removeRequest(requestId));

    }catch(err){
        console.log(err); 
    }
    }
    
    useEffect(()=>{
        request();
    },[])

    if (!requestData) return;
    if(requestData.length ==0)return <div className="h-screen"><h1 className="text-center text-2xl font-semibold mt-10">No request found</h1></div>

  return(
   requestData && (
   <div className="h-screen">
       {  
            requestData.map((data )=>{
                const {_id,firstName, lastName, photoUrl, gender, age } = data.fromUserId;
                return (
                    <div key={_id} className=' md:w-2/3 h-24 flex items-center justify-evenly bg-white mx-auto  my-4'>
                        <div className="w-1/4 flex justify-center">
                            <img src= {photoUrl} className=' h-20 rounded-full m-2' alt="UserPhoto"  />
                        </div>
                        <div className='ml-5 w-1/4 text-left'>
                            <p className='font-bold text-slate-700 text-xl'>{firstName + " "+ lastName}</p>
                            {(age && gender) ?<p>{age +" "+ gender} </p>: ""}
                        </div>
                        <div className="w-1/4">
                        <button className="btn btn-success" onClick={()=>handleRequest("accepted",data._id)}>Accept</button>
                        </div>
                        <div className="w-1/4">
                        <button className="btn bg-red-600" onClick={()=>handleRequest("rejected",data._id)}>Reject</button>
                        </div>
                    </div>
                ) })
        }
    </div>
    )
  )
}
export default Requests
