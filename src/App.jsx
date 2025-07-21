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
import PrivateRoute from './components/PrivateRoute';
import PrivacyPolicy from './policy/PrivacyPolicy';
import TermAndConditions from './policy/TermAndConditions';
import CancellationAndRefund from './policy/CancellationAndRefund';
import ContactUs from './policy/ContactUs';
import ShippingAndDelivery from './policy/ShippingAndDelivery';
import Premium from './components/Premium';
import ResetPassword from './components/ResetPassword';
import URLError from './components/URLError';
import Editor from './components/Editor';
import ConnectionProfile from './components/ConnectionProfile';
import EditorRoom from './components/EditorRoom';

function App() { 

  return (
    <Provider store={appStore} >

      <BrowserRouter basename='/'>
          <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/passreset" element={<ResetPassword/>}/>
              <Route path="/" element={<PrivateRoute><Body/></PrivateRoute>}>
                <Route path="/" element={<Feed/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/connection" element={<Connections/>}/>
                <Route path="/connection/:withUserId" element={<ConnectionProfile/>}/>
                <Route path="/chat/:targetUserId" element={<Chat/>}/>
                <Route path="/request" element={<Requests/>}/>
                <Route path="/premium" element={<Premium/>}/>
                <Route path="/contactus" element={<ContactUs/>}/>
                <Route path="/editor" element={<Editor/>}/>
                <Route path="/editor/:roomId" element={<EditorRoom/>}/>
                <Route path="*" element={<URLError/>}/>
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
