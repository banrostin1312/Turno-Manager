import Home from './views/Home/Home'
import NavBar from './components/NavBar'
import MisTurnos from './views/MisTurnos/MisTurnos'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import Error from './components/Error'
import {Routes,Route} from 'react-router-dom';
import Perfil from './views/Perfil/Perfil'

function App() {

  return (
  <div>
  {  <NavBar/>}
    {/* <Register/> */}
   <Routes>
   <Route path='/home' element={<Home/>}></Route>
   <Route path='mis-turnos' element = {<MisTurnos/>}></Route>
   <Route path='/' element = {<Login/>}></Route>
   <Route path='/register' element={<Register/>}></Route>
   <Route path='/perfil' element={<Perfil/>}></Route>
   <Route path='*'element={<Error/>}></Route>
   </Routes>
  </div>
    
  )
}

export default App
