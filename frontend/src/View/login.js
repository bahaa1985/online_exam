import { useState, useEffect } from "react";
import { login } from "../fetching/login";

export function Login() {
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    function handleSubmit(event){
        event.preventDefault();

        login(email,password).then(result=>{
            if(result){
                //go to home page
            }
        })
        .catch(err=>{
            //stay in the login page 
        })
    }
    return (
        <div>
 <form className="from" onSubmit={handleSubmit}>
            <div className="row d-flex pt-3 container">
                <label className='form-label col'>البريد الالكتروني</label>
                <input className='form-control col' type="email" onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className="row d-flex pt-3 container">
                <label className='form-label col'>كلمة المرور</label>
                <input className='form-control col' type="password"  onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="row d-flex pt-3 container">
                <button type="submit">دخول</button>
                <button type="reset">إلغاء</button>
            </div>
        </form>
        </div>
       
    )
}