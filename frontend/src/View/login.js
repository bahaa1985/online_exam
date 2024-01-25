import { useState, useEffect } from "react";
import { login } from "../fetching/login";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"

export function Login() {
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    function handleSubmit(event){
        event.preventDefault();

        login(email,password).then(result=>{
            if(result){
            //    alert("تم تسجيل الدخول بنجاح",result)
               window.location.href="/home"
            }
        })
        .catch(err=>{
            //stay in the login page 
        })
    }

    return (
        <div className="container col-sm-8" dir="rtl">
 <form className="from" onSubmit={handleSubmit}>
            <div className="container d-flex pt-3 col-sm-8">
                <label className='form-label col-sm-3'>البريد الالكتروني</label>
                <input className='form-control col-sm-9' type="email" onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className="container d-flex pt-3 col-sm-8">
                <label className='form-label col-sm-3'>كلمة المرور</label>
                <input className='form-control col-sm-9' type="password"  onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="container d-flex justify-content-center pt-3 col-sm-8">
                <button className="btn btn-primary col-3" type="submit">دخول</button>
                {/* <button className="btn btn-danger col-3" type="reset">إلغاء</button> */}
            </div>
        </form>
        </div>
       
    )
}