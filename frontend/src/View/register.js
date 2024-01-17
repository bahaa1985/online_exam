import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
// import "bootstrap-icons/font/bootstrap-icons.css"
import { getDepartments } from '../fetching/department.js';
import { getUserType } from "../fetching/user_type.js";
import { newUser } from '../fetching/registration.js';
import { useEffect, useState } from 'react';

export function Register() {

  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(0);
  const [userTypes, setUserTypes] = useState([]);
  const [typeId, setTypeId] = useState(0);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    let isValid = true;

    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm Password is required');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    // Submit the form if valid
    if (nameError === '' && emailError === '' && passwordError === '' && confirmPasswordError === '') {
      // Perform form submission logic here
      // if(formState==='new'){
      newUser(name, email, password, typeId, departmentId).then(result => {
        if (result) {
          alert(`تم تسجيل المستخدم ${name}  بنجاح`);
        }
      })

    }
  };

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  return (
    <div dir="rtl" className="container col-md-8">
      <form className="from" onSubmit={handleSubmit}>
        <div className="row d-flex pt-5 container">
          <label htmlFor="departmentControl" className='form-label col'>اختر القسم</label>
          <select id="departmentControl" className='form-control col' onChange={(e) => setDepartmentId(e.target.value)}>
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
          <select id="typesControl" className='form-control col' onChange={(e) => setTypeId(e.target.value)}>
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
          <input id="nameControl" type="text" className='form-control col' value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className="row d-flex pt-3 container">
          <label htmlFor="emailControl" className='form-label col'>البريد الالكتروني</label>
          <input id="emailControl" type="email" className='form-control col' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className="row d-flex pt-3 container">
          <label htmlFor="passwordControl" className='form-label col'>كلمة المرور</label>
          <input id="passwordControl" type="password" className='form-control col' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className="row d-flex pt-3 container">
          <label htmlFor="confirmControl" className='form-label col'>تأكيد كلمة المرور</label>
          <input id="confirmControl" type="password" className='form-control col' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
        </div>
        <div className="row d-flex pt-3">
          <button type="submit" className="btn btn-primary col-4 container">تسجيل</button>
        </div>
      </form>
    </div>
  );
}