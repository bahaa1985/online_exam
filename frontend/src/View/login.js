import { useState } from "react";
import { login } from "../fetching/login";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"

export function Login() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    function handleSubmit(event){
        event.preventDefault();

        if(email && password)
        login(email,password).then(result=>{
            if(result){
               window.location.href="/home"
            }
        })
        .catch(err=>{
            //stay in the login page 
        })
    }

    return (
        
        <div className="container" dir="rtl">
        <form className="form container" onSubmit={handleSubmit} style={{margin:'20px auto'}}>
            <div className="container col-sm-6 d-flex justify-content-center pt-3" >
                <label className='form-label' style={{width:'35%'}}>البريد الالكتروني</label>
                <input className='form-control' style={{width:'55%'}} type="email" onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className="container col-sm-6 d-flex justify-content-center pt-3">
                <label className='form-label' style={{width:'35%'}}>كلمة المرور</label>
                <input className='form-control' style={{width:'55%'}} type="password"  onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="container col-sm-6 d-flex justify-content-center pt-3">
                <button className="btn btn-primary col-3" type="submit">دخول</button>
            </div>
        </form>
        </div>
       
    )
}