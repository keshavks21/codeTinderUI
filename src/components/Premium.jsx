import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = ()=>{

    const [isUserPremium, setIsUserPremium] = useState(false);
    useEffect(()=>{
        verifyPremiumUser();
    },[])

    const verifyPremiumUser = async()=>{
        const res = await axios.get(BASE_URL+"/premium/verify", {withCredentials:true});
        // console.log(res);
        
        if(res.data.isPremium){
            setIsUserPremium(true);            
        }
    }

    const handleBuy = async(type)=>{
        const order = await axios.post(BASE_URL+"/payment/create",{membershipType:type},
            {withCredentials:true}
        )

        const {amount,keyId , currency, notes,orderId} = order.data;

        const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name:"DevCircle" ,
        description: 'Test Transaction',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name:notes.firstName,
          email: 'devcircle@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler:  verifyPremiumUser,
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    return isUserPremium ? (
            <div className="h-screen"><h1 className="text-center text-2xl font-semibold mt-10">You are a Premium User (features soon..)</h1></div>
    ) :(
        <div className="h-screen"> 
            <div className="flex w-full mt-10 flex-col md:flex-row  gap-10">
              <div className="card bg-white rounded-box  grid h-80 flex-grow place-items-center mx-10">
                    <h1 className="text-2xl font-bold">Silver Membership</h1>
                    <ui>
                        <li>100 request per day</li>
                        <li>Blue tick</li>
                        <li>valid for 1 month</li>
                    </ui>
                    <button onClick={()=>handleBuy("silver")}
                    className="btn font-semibold bg-purple-800 text-white">Buy Silver</button>
                </div>
              
                <div className="card bg-white rounded-box grid h-80 flex-grow place-items-center mx-10">
                <h1 className="text-2xl font-bold">Gold Membership</h1>
                    <ui>
                        <li>100 request per day</li>
                        <li>Blue tick</li>
                        <li>valid for 1 month</li>
                    </ui>
                    <button
                    onClick={()=>handleBuy("gold")}
                     className="btn  font-semibold bg-indigo-800 text-white"> Buy Gold</button>
                </div>
            </div>
        </div>
    )
}

export default Premium;