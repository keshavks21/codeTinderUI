import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Body from './components/Body'
import Login from './components/Login'
import About from './components/About';
import { Provider} from "react-redux"
import appStore from './utils/appStore';
import Feed from './components/Feed';

function App() {

  return (
    <Provider store={appStore} >

      <BrowserRouter basename='/'>
          <Routes>
              <Route path="/" element={<Body/>}>
                <Route path="/" element={<Feed/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/about" element={<About/>}/>
              </Route>
          </Routes>
      </BrowserRouter>

    </Provider>
  )
}  

export default App
