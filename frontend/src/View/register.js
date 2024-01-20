import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
// import "bootstrap-icons/font/bootstrap-icons.css"
import { getDepartments } from '../fetching/department.js';
import { getUserType } from "../fetching/user_type.js";
import { newUser } from '../fetching/registration.js';
import { useEffect, useState } from 'react';
import '../styles/register.css'

export function Register() {

  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(1);
  const [userTypes, setUserTypes] = useState([]);
  const [typeId, setTypeId] = useState(1);
  const [formState, setFormState] = useState('');
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');


  useEffect(() => {
    getDepartments().then(result => {
      setDepartments(result);
    });

    getUserType().then(result => {
      setUserTypes(result);
    })
  }, []);

  let isValid=false;
   //Check validition of user name:
  function validName(name){
    if (name.trim() === '') {
      setNameError('Name is required');
       return false;
    }else if(name.length>50){
      setNameError('Name is too long');
      return false;
    } 
    else {
      setNameError('');
      return true;
    }
  }

  //Check validition of Email:
  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  function validEmail(email){
    if (email.trim() === '') {
      setEmailError('Email is required');
      return false;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  }

  function validPassword(password){
    if (password.trim() === '') {
      setPasswordError('Password is required');
      return false;
    }else if(password.length<6){
      setPasswordError('Password is less than 6 charchaters!');
      return false;
    } 
    else {
      setPasswordError('');
      return true;
    }
  }

  function validConfirmPassword(confirmPassword){
    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm Password is required');
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form if valid
    if (validName(name) && validEmail(email) && validPassword(password) && validConfirmPassword(confirmPassword)) {
      console.log("user data: ",name,email,password,typeId);
      newUser(name, email, password, typeId, departmentId).then(result => {
        console.log("react user res: ",result);
        if (result) {
          setName(""); setEmail(""); setPassword(""); setConfirmPassword(""); setDepartmentId(1); setUserId(1);
          alert(`تم تسجيل المستخدم ${name}  بنجاح`);
        }
      })
      .catch(err=>{
        alert(`فشل في تسجيل المستخدم/n${err.message}`);
      })
    }
  }




  return (
    <div dir="rtl" className="container col-md-8">
      <form className="from" action="/register" method="POST" onSubmit={handleSubmit}>
        <div className="row pt-5 container">
          <label htmlFor="departmentControl" className='form-label col'>اختر القسم</label>
          <select id="departmentControl" className='form-control col' defaultValue={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
            {
              departments.map((dep, index) => {
                return (
                  <option key={index} value={dep.id}>{dep.department_name}</option>
                )
              })
            }
          </select>
        </div>
        <div className="row d-flex pt-3 container">
          <label htmlFor="typesControl" className='form-label col'> اختر نوع المستخدم </label>
          <select id="typesControl" className='form-control col' onChange={(e) => {setTypeId(e.target.value);console.log("user type:",typeId)}}>
            {
              userTypes.map((type, index) => {
                return (
                  <option key={index} value={type.id}>{type.user_type}</option>
                )
              })
            }
          </select>
        </div>
        <div className="row d-flex pt-3 container">
          <label htmlFor="nameControl" className='form-label col'>اسم المستخدم</label>
          <input id="nameControl" type="text" className='form-control col' value={name} onChange={(e) => {setName(e.target.value);validName(e.target.value)}}></input>
          {nameError !== "" ? <span>{nameError}</span> : null}
        </div>
        <div className="row d-flex pt-3 container">
          <label htmlFor="emailControl" className='form-label col'>البريد الالكتروني</label>
          <input id="emailControl" type="email" className='form-control col' value={email} onChange={(e) => {setEmail(e.target.value);validEmail(e.target.value)}}></input>
          {emailError !== "" ? <span>{emailError}</span> : null}
        </div>
        <div className="row d-flex pt-3 container">
          <label htmlFor="passwordControl" className='form-label col'>كلمة المرور</label>
          <input id="passwordControl" type="password" className='form-control col' value={password} onChange={(e) => {setPassword(e.target.value);validPassword(e.target.value)}}></input>
          {passwordError !== "" ? <span>{passwordError}</span> : null}
        </div>
        <div className="row d-flex pt-3 container">
          <label htmlFor="confirmControl" className='form-label col'>تأكيد كلمة المرور</label>
          <input id="confirmControl" type="password" className='form-control col' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value);validConfirmPassword(e.target.value)}}></input>
          {confirmPasswordError !== "" ? <span>{confirmPasswordError}</span> : null}
        </div>
        <div className="row d-flex pt-3">
          <button type="submit" className="btn btn-primary col-4 container">تسجيل</button>
        </div>
      </form>
    </div>
  );
}