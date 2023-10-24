import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile';
import Login from './pages/Login'
import Header from './components/Header';
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { Context, server } from './main';


const App = () => {
  const { setIsAuthenticated, setUser, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/users/me`, {
      withCredentials: true
    }).then(res => {
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setUser({});
      setIsAuthenticated(false)
      setLoading(false)
    })

  }, [])
  return (
    <div>

      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>


        </Routes>
        <Toaster />
      </Router>
    </div>
  )
}

export default App