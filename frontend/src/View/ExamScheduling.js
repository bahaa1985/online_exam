import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
// import '../styles/ExamScheduling.css';
import { useState, useEffect } from 'react';
import { getExams,createExam } from '../fetching/exam';
import { getTerms } from '../fetching/terms';
import { getDepartments } from '../fetching/department';
import { getCoursesForExam } from '../fetching/course';



function ExamScheduling(props) {

    const admin=props.admin;
    const admin_id=admin.user_id;

    const [exams,setExams]=useState([]);
    const [terms,setTerms]=useState([]);
    const [termId,setTermId]=useState(1);
    const [courses,setCourses]=useState([]);
    const [courseDocotrId,setCourseDoctorId]=useState(1);
    const [courseName,setCourseName]=useState('');
    const [departments,setDepartments]=useState([]);
    const [departmentId,setDepartmentId]=useState(2);
    const [exam_year,setExamYear]=useState(new Date().getFullYear().toString());
    const [examDate,setExamDate]=useState('');
    const [examStart,setexamStart]=useState('');
    const [examEnd,setexamEnd]=useState('');
    const [timeError,setTimeError]=useState('');
    const [questionsCount,setQuesCount]=useState(0);
    const [points,setPoints]=useState(0);

    useEffect(()=>{
        getExams().then(result=>{
           setExams(result);
        });
    },[]);

    useEffect(()=>{
      getTerms().then(result=>{
        setTerms(result);
    });
    },[]);

    useEffect(()=>{
      getDepartments().then(result=>{
        setDepartments(result.filter(dep=>dep.id>1));
      })
    },[]);

    
    useEffect(()=>{
      //get the current academic year, if the current month is more than 9 ( for examble october 2023 ) 
      //then the cnext year is  the academic 2024
      const month=new Date().getMonth();
      if(month>9){
        setExamYear(new Date().getFullYear()+1)
      }
      else{
        setExamYear(new Date().getFullYear())
      }
      getCoursesForExam(departmentId)
      .then(result=>{
        setCourses(result.data);
      })

    },[departmentId])

    useEffect(() => {
      if(courses.length>0){
        console.log("courses: ",courses)
       const course=courses.find(elem=>elem.course_doctor_id===courseDocotrId);
       if(course)setCourseName(course.course_name);
      }
    }, [courseDocotrId,courseName,courses]);

  function validateExamTime(start_time,end_time){
    
    let start_hour=parseInt(examStart[0]+examStart[1]);
    let end_hour=parseInt(examEnd[0]+examEnd[1]);
    console.log(start_hour,end_hour);
    if(start_hour < end_hour){
      setTimeError();
    }
    else{
      setTimeError('تأكد من وقت بداية و نهاية الامتحان!');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("cd id",courseDocotrId)
    // Perform actions with the exam scheduling details
    createExam(departmentId,courseDocotrId,admin_id,examDate,examStart,examEnd,exam_year,termId,questionsCount,points)
    .then(exam=>{
      if(exam.result){
        alert(`تم إنشاء إمتحان مادة ${courseName} بنجاح!`);
      }
      else{
        alert(exam.message)
      }
    })
    .catch(err=>{
      alert(err.message);
    })
  };

  return (
    <div dir='rtl' className="container col-sm-8">
      <form className='form container' style={{margin:'0 auto'}} onSubmit={handleSubmit} action='/exams' method='POST'>

        <div className="container col-sm-8 d-flex justify-content-around pt-3 px-auto">    {/*select the term*/}
          <label className='form-label' style={{width:'25%'}}>اختر الترم</label>
          <select className='form-control' style={{width:'65%'}} value={termId} onChange={(e)=>setTermId(parseInt(e.target.value))}>
            {
              terms.map((term,index)=>{
                return(
                  <option key={index} value={term.id}>{term.term_name}</option>
                )
              })
            }
          </select>
        </div>
       
        <div className="container col-sm-8 d-flex justify-content-around pt-3 px-auto">    {/*select the term*/}
          <label className='form-label' style={{width:'25%'}}>اختر القسم</label>
          <select className='form-control' style={{width:'65%'}} value={departmentId} onChange={(e)=>setDepartmentId(parseInt(e.target.value))}>
            {
              departments.map((department,index)=>{
                return(
                  <option key={index} value={department.id}>{department.department_name}</option>
                )
              })
            }
          </select>
        </div>

        <div className="container col-sm-8 d-flex justify-content-around pt-3 px-auto">    {/*select the term*/}
          <label className='form-label' style={{width:'25%'}}>اختر المادة</label>
          <select className='form-control' style={{width:'65%'}} value={courseDocotrId} onChange={(e)=>setCourseDoctorId(parseInt(e.target.value))}>
            {
              courses.length>0 ?
              courses.map((course,index)=>{
                return(
                  <option key={index} value={course.course_doctor_id}>{course.course_name}</option>
                )
              }):null
            }
          </select>
        </div>
          
        <div className="container col-sm-8 d-flex justify-content-around pt-3 px-auto"> 
            <label className='form-label' style={{width:'25%'}}>تاريخ الامتحان</label>
            <input className='form-control' style={{width:'65%'}} type="date" onChange={(e)=>setExamDate(e.target.value)}
             min={new Date().toISOString().split('T')[0]}/>
        </div>

        <div className="container col-sm-8 d-flex justify-content-around pt-3 px-auto">
          <label className='form-label' style={{width:'15%'}}>من الساعة</label>
          <input className='form-control' style={{width:'30%'}} type='time' value={examStart} onChange={(e)=>{setexamStart(e.target.value);validateExamTime(examStart,examEnd)}}/>
          <label className='form-label' style={{width:'15%'}}>إلى الساعة</label>
          <input className='form-control' style={{width:'30%'}} type='time' value={examEnd}  onChange={(e)=>{setexamEnd(e.target.value);validateExamTime(examStart,examEnd)}}/>
        </div>  
        {
          timeError ? 
          (<span>{timeError}</span>)
          :null
        }

        <div className="container col-sm-8 d-flex justify-content-around pt-3 px-auto"> 
            <label className='form-label' style={{width:'25%'}}>عدد الأسئلة</label>
            <input className='form-control' style={{width:'65%'}} type="input" onChange={(e)=>setQuesCount(e.target.value)}/>
        </div>

        <div className="container col-sm-8 d-flex justify-content-around pt-3 px-auto"> 
            <label className='form-label' style={{width:'25%'}}>مجموع الدرجات</label>
            <input className='form-control' style={{width:'65%'}} type="input" onChange={(e)=>setPoints(e.target.value)}/>
        </div>

        <div className='container d-flex justify-content-center pt-3 col-sm-8'>
          <button className='btn btn-primary' type="submit">تسجيل الامتحان</button>
        </div>         
      </form>
    </div>
  );
}

export default ExamScheduling;
