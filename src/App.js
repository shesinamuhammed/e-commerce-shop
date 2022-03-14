
import './App.css';
import Login from './login';
import Register from './register';
import Forgotpassword from './forgot';
import Resetpassword from './reset';
import Home from './home';
import Detailpage from './detailpage';

import {BrowserRouter, Route, Routes} from 'react-router-dom'
function App() {
  return (
    <div className="App">
    <BrowserRouter>
                <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgotpassword" element={<Forgotpassword/>}/>
                <Route path="/resetpassword" element={<Resetpassword/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/detailpage/:id" element={<Detailpage/>}/>
               
                </Routes>  </BrowserRouter>
    </div>
  );
}

export default App;
