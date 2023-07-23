import React from 'react';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import Login from '../screens/sign-in-out/Login';
import Registration from '../screens/sign-in-out/Registration';


const PageRouter = () => {
  const {user} = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={user ? <Home/> : <Registration/>}/>
          <Route path='/login' element={ user ? <Home/> : <Login/>}/>
          <Route path='/create-account' element={user ? <Home/> : <Registration/>}/>
          <Route path='/profile/:id' element={user ? <Profile/> : <Registration/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default PageRouter;
