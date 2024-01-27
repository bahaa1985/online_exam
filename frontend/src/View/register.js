import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
// import "bootstrap-icons/font/bootstrap-icons.css"
import { getDepartments } from '../fetching/department.js';
import { getDepartmentCourses } from "../fetching/course.js";
import { getUserType } from "../fetching/user_type.js";
import { newUser } from '../fetching/registration.js';
import { useEffect, useState } from 'react';
import '../styles/register.css'

export function Register() {

  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(1);
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState(1);
  const [userTypes, setUserTypes] = useState([]);
  const [typeId, setTypeId] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    getUserType().then(result => {
      setUserTypes(result);

    });

  }, [])

  useEffect(() => {
    getDepartments().then(result => {
      setDepartments(result);
    });
  }, []);

  useEffect(() => {
      getDepartmentCourses(departmentId)
      .then(result => {
        console.log("courses",courses);
        setCourses(result.data);
      });
  }, [departmentId])

  //Check validition of user name:
  function validName(name) {
    if (name.trim() === '') {
      setNameError('Name is required');
      return false;
    } else if (name.length > 50) {
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
  function validEmail(email) {
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

  function validPassword(password) {
    if (password.trim() === '') {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password is less than 6 charchaters!');
      return false;
    }
    else {
      setPasswordError('');
      return true;
    }
  }

  function validConfirmPassword(confirmPassword) {
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
      newUser(name, email, password, typeId, departmentId, courseId, '2024').then(result => {
        // console.log("react user res: ", result);
        if (result.user) {
          setName(""); setEmail(""); setPassword(""); setConfirmPassword(""); setDepartmentId(1);
          alert(result.message);
        }
        else {
          alert(result.message);
        }
      })
        .catch(err => {
          alert(`فشل في تسجيل المستخدم/n${err.message}`);
        })
    }
  }

  return (
    <div className="container row  pt-3" dir="rtl">
      <form className="form" action="/register" method="POST" onSubmit={handleSubmit}>

        {/* SELECT CONTROL FOR USER TYPE */}
        <div className="container col-sm-8 d-flex jusyify-content-center pt-3">
          <label htmlFor="typesControl" className='form-label' style={{width:'35%'}}> اختر نوع المستخدم </label>
          <select id="typesControl" className='form-control' style={{width:'55%'}} defaultValue={typeId} onChange={(e) => setTypeId(parseInt(e.target.value))}>
            {
              userTypes.map((type, index) => {
                return (
                  <option key={index} value={type.id}>{type.user_type}</option>
                )
              })
            }
          </select>
        </div>

        {/** SELECT CONTROL FOR DEPARTMENTS */}
        <div className="container col-sm-8 d-flex pt-3">
          <label htmlFor="departmentControl" className='form-label' style={{width:'25%'}}>اختر القسم</label>
          <select id="departmentControl" className='form-control' style={{width:'55%'}} value={departmentId} onChange={(e) => setDepartmentId(parseInt(e.target.value))}>
            {

              typeId === 1 ?
                departments.filter((dep) => dep.id === 1).map((dep, index) => {
                  return (
                    <option key={index} value={dep.id}>{dep.department_name}</option>
                  )
                }) :
                departments.filter((dep) => dep.id > 1).map((dep, index) => {
                  return (
                    <option key={index} value={dep.id}>{dep.department_name}</option>
                  )
                })
            }
          </select>
        </div>

        {
         typeId > 1 ?
            <>
              {/* SELECT CONTROL FOR COURSES*/}
              <div className="container col-sm-8 d-flex pt-3">
                <label htmlFor="coursesControl" className='form-label' style={{width:'25%'}}> اختر المادة </label>
                <select id="coursesControl" className='form-control' style={{width:'55%'}} value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                  {
                    courses.length>0 ?
                    courses.map((course, index) => {
                      return (
                        <option key={index} value={course.id}>{course.course_name}</option>
                      )
                    }):null
                  }
                </select>
              </div>
            </>
            : null}

        {/** INPUT CONTROL FOR USER'S NAME*/}
        <div className="container col-sm-8 d-flex pt-3">
          <label htmlFor="nameControl" className='form-label' style={{width:'25%'}}>اسم المستخدم</label>
          <input id="nameControl" type="text" className='form-control' style={{width:'55%'}} value={name} onChange={(e) => { setName(e.target.value); validName(e.target.value) }}></input>
          {nameError !== "" ? <span>{nameError}</span> : null}
        </div>

        {/** INPUT CONTROL FOR EMAIL */}
        <div className="container col-sm-8 d-flex pt-3">
          <label htmlFor="emailControl" className='form-label' style={{width:'25%'}}>البريد الالكتروني</label>
          <input id="emailControl" type="email" className='form-control' style={{width:'55%'}} value={email} onChange={(e) => { setEmail(e.target.value); validEmail(e.target.value) }}></input>
          {emailError !== "" ? <span>{emailError}</span> : null}
        </div>

        {/** INPUT CONTROL FOR PASSWORD */}
        <div className="container col-sm-8 d-flex pt-3">
          <label htmlFor="passwordControl" className='form-label' style={{width:'25%'}}>كلمة المرور</label>
          <input id="passwordControl" type="password" className='form-control' style={{width:'55%'}} value={password} onChange={(e) => { setPassword(e.target.value); validPassword(e.target.value) }}></input>
          {passwordError !== "" ? <span>{passwordError}</span> : null}
        </div>

        {/** INPUT CONTROL FOR PASSWORD */}
        <div className="container col-sm-8 d-flex pt-3">
          <label htmlFor="confirmControl" className='form-label' style={{width:'25%'}}>تأكيد كلمة المرور</label>
          <input id="confirmControl" type="password" className='form-control' style={{width:'55%'}} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); validConfirmPassword(e.target.value) }}></input>
          {confirmPasswordError !== "" ? <span>{confirmPasswordError}</span> : null}
        </div>

        {/** SUBMIT CONTROL*/}
        <div className="container col-sm-2 d-flex justify-content-around pt-3">
          <button type="submit" className="btn btn-primary container">تسجيل</button>
        </div>
      </form>
    </div>
  );
}