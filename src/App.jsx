import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile';
import { Provider} from "react-redux"
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Connections from './components/Connections';
import Requests from './components/Requests';
import Chat from './components/Chat';
import PrivacyPolicy from './policy/PrivacyPolicy';
import TermAndConditions from './policy/TermAndConditions';
import CancellationAndRefund from './policy/CancellationAndRefund';
import ContactUs from './policy/ContactUs';
import ShippingAndDelivery from './policy/ShippingAndDelivery';

function App() {

  return (
    <Provider store={appStore} >

      <BrowserRouter basename='/'>
          <Routes>
              <Route path="/" element={<Body/>}>
                <Route path="/" element={<Feed/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/connection" element={<Connections/>}/>
                <Route path="/chat/:targetUserId" element={<Chat/>}/>
                <Route path="/request" element={<Requests/>}/>
                <Route path="/contactus" element={<ContactUs/>}/>
              </Route>
                <Route path="/privacy_policy" element={<PrivacyPolicy/>}/>
                <Route path="/term&conditions" element={<TermAndConditions/>}/>
                <Route path="/cancellation&refund" element={<CancellationAndRefund/>}/>
                <Route path="/shipping&delivery" element={<ShippingAndDelivery/>}/>
                
          </Routes>
      </BrowserRouter>

    </Provider>
  )
}  

export default App
