import logo from './images/almokhtaber logo.jfif';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import { Home } from './View/home';
import { Register } from './View/register';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from './View/login';
import ExamScheduling from './View/ExamScheduling';
import logout from './fetching/logout';
import verifyToken from './fetching/token';
import { useEffect, useState } from 'react';
import QuestionBank from './View/QuestionBank';
import ExamQuestions from './View/ExamQuestions';
function App() {

  const [logoutClicked, setLogutClicked] = useState(false);
  let [authenticatedUser, setAuthenticatedUser] = useState(false);

  useEffect(() => {
    verifyToken().then(result => {
      if (result.user) {
        setAuthenticatedUser(result.user);
      }
    })
      .catch(err => {
        alert(err.message);
      })

  }, [])

  useEffect(() => {
    if (logoutClicked) {
      logout().then(result => {
        window.location.href="/"
        alert(result);
      })
    }
  })


  return (
    
    <BrowserRouter>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark" dir='rtl'>
          <div class="container-fluid d-flex justify-content-between">
              <ul class="navbar-nav">
                <li className="navbar-brand" href="#">
                  <img className='image' src={logo} alt=""  style={{width:'100px'}}/>
                </li>
                {
                  authenticatedUser && !logoutClicked ?
                  <>
                    <li className="nav-item">مرحباً بك {authenticatedUser.user_name}</li>
                    <li className='nav-item'>
                      <Link className='nav-link' to="/" onClick={()=>setLogutClicked(true)}>خروج</Link>
                    </li>
                  </>:null
                }
              </ul> 
           
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
              <span class="navbar-toggler-icon"></span>
            </button>

          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav" style={{marginRight:'auto'}}>       
            {
                authenticatedUser.user_type === 1 && !logoutClicked ?
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to="/register">تسجيل</Link>
                  </li>
                  <li>
                    <Link className='nav-link' to="/exam">امتحانات</Link>
                  </li>
                </>
                : 
                authenticatedUser.user_type === 2 && !logoutClicked ?
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to="/questions_bank">الأسئلة</Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to="/exam_questions">تعيين اسئلة الامتحان</Link>
                  </li>
                </>
                :null
            }
            </ul>
            </div>
          </div>
        </nav>


        <Routes>
          { 
            authenticatedUser ?
            <Route path='/' element={<Home />} />
            :
            <Route path='/' element={<Login />}/>
          }

          <Route path='/register' element={<Register />} />

          <Route path='/home' element={<Home />} />

          <Route path="/logout" element={<Login />} />

          <Route path="/exam" element={<ExamScheduling admin={authenticatedUser} />} />

          <Route path="/questions_bank" element={<QuestionBank doctor={authenticatedUser}/>} />

          <Route path="/exam_questions" element={<ExamQuestions doctor={authenticatedUser}/>} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
