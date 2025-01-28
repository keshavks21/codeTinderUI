import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Body from './Body'
import Login from './Login'
import About from '../../About'

function App() {

  return (
    <BrowserRouter basename='/'>
        <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="/login" element={<Login/>}/>
              <Route path="/about" element={<About/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}  

export default App
