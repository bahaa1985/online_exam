import react from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { Register } from './register';
import ExamScheduling from './ExamScheduling';
import logo from '../images/almokhtaber logo.jfif';

export function Home(){

    return(
        <div className='container col-sm-8 pt-5 text-center'>
            <h1 style={{margin:'auto'}}>مرحباً بكم في نظام المُختبِر للامتحانات</h1>
            <img style={{margin:'auto'}} className='image' src={logo} alt=''></img>
        </div>
    )
}