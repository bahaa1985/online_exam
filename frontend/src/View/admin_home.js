import react from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { Register } from './register';
import ExamScheduling from './ExamScheduling';

export function AdminHome(){

    return(
        <div>
            <ul  class="navbar-nav">
                <li className='nav-item'>
                <Link className='nav-link' to='/register' ></Link>
                </li> 
                <li className='nav-item'>
                <Link className='nav-link' to='/exams' ></Link>
                </li> 
            </ul>
            <BrowserRouter>
                <Routes>
                    <Route path='/register' element={<Register/>} />
                    <Route path='/exams' element={<ExamScheduling/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}