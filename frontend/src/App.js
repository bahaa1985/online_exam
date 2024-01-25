import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import { Home } from './View/home';
import { Register } from './View/register';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { Login } from './View/login';
import ExamScheduling from './View/ExamScheduling';
import logout from './fetching/logout';
import verifyToken from './fetching/token';
import { useEffect, useState } from 'react';
function App() {

  const [logoutClicked,setLogutClicked]=useState(false);
  const [authenticatedUser,setAuthenticatedUser]=useState(false);
  useEffect(()=>{
    verifyToken().then(result=>{
      console.log("result",result.user)
      if(result.user){
        setAuthenticatedUser(result.user);
      }
    })
    .catch(err=>{
      alert(err.message);
    })
    
  },[])

  useEffect(()=>{
    if(logoutClicked){
      logout().then(result=>{
        alert(result);
      })
    }
  })


  return (
    <div>
      
      <BrowserRouter>
      <ul className='nav'>

        {/* Login link for admin and doctor */}
        <li className='nav-item'>
          <Link className='nav-link' to="/login">Login</Link>
        </li>

        {/* if the user is an admin then display those Link elements: */}
        {
            authenticatedUser.user_type===1 ?
            <>
            <li className='nav-item'>
              <Link className='nav-link' to="/register">Register</Link>
            </li>
            <li>
              <Link className='nav-link' to="/exam">Exam</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/logout" onClick={()=>setLogutClicked(true)}>Logout</Link>
            </li>
            </>
             : null
        }
        
        
      
      </ul>
        <Routes>
          <Route path='/login' element={<Login/>}/>
         
            <Route path='/register' element={<Register/>}/>

            {
              authenticatedUser ?
              <Route path='/home' element={<Home user_name={authenticatedUser.user_name}/>}/>
              : 
              <Route element={<Login />} />
            }
            
          <Route path="/logout" element={<Login/>}/>

          <Route path="/exam" element={<ExamScheduling admin={authenticatedUser}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
