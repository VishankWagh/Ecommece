import { Route, Routes } from 'react-router'

import PrivateRoute from './components/PrivateRoute.jsx'
import Navbar from './components/Navbar.jsx'
import Items from './pages/customer/Items.jsx'
import Cart from './pages/cart/Cart.jsx'
import Login from './pages/auth/Login.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import { useState } from 'react'
import { useEffect } from 'react'

const App = () => {
  const [auth, setAuth] = useState();

  useEffect(() => {
    setAuth(localStorage.getItem("auth") != "undefined" ? JSON.parse(localStorage.getItem("auth")) : "");
  }, [localStorage.getItem("auth")]);
  console.log(auth);

  const handleLogin = (auth) => {
    localStorage.setItem("auth", JSON.stringify(auth));
    setAuth(auth);
  }

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(undefined);
  }
  return <div className='mx-auto max-w-6xl p-4'>
    <Navbar auth={auth} handleLogout={handleLogout} />
    <Routes>
      <Route path="/items/" element=<PrivateRoute />>
        <Route path='items-list' element={<Items auth={auth} />} />
        <Route path='cart' element={<Cart />} />
      </Route>
      <Route path="/auth/" element=<PrivateRoute />>
        <Route path='login' element={<Login handleLogin={handleLogin} />} />
        <Route path='signup' element={<SignUp handleLogin={handleLogin} />} />
      </Route>
    </Routes>
  </div>
}

export default App