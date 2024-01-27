import React, { useEffect, useState } from 'react';
import '../styles/QuestionBank.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { getTerms } from '../fetching/terms';
import { getDoctorCourse } from '../fetching/course';
import { getExamsForDoctor } from '../fetching/exam';

export default function ExamQuestions(props){

    const doctor_id=parseInt(props.doctor.user_id);

     const month=new Date().getMonth();
     let year=0
    if(month>9){
      year=new Date().getFullYear()+1;
    }
    else{
        year=new Date().getFullYear();
    }

    // const [academicYear,setAcademiYear]=useState(year);
    const [doctorExams,setDoctorExams]=useState([]);
    const [courseDoctorId,setCourseDoctorId]=useState(1);
    // const [doctorId,setDoctorId]=useState(0);
    const [courseName,setCourseName]=useState('');
    const [terms,setTerms]=useState([]);
    const [termId,setTermId]=useState(1);
    const [exams,setExams]=useState([]);
    const [examId,setExamId]=useState(0); 

    

    useEffect(()=>{
        getTerms().then(result=>{
            setTerms(result);
        })
    },[])

    // useEffect(()=>{
    //     const month=new Date().getMonth();
    //     if(month>9){
    //       setAcademiYear(new Date().getFullYear()+1)
    //     }
    //     else{
    //       setAcademiYear(new Date().getFullYear())
    //     }
    //     //
    //     setDoctorId(props.doctor.user_id);
    //     console.log("doc id",doctorId);
    //   },[academicYear,doctorId])
    
      useEffect(()=>{
        console.log("docdocdoc",doctor_id);
          if(doctor_id!==null && year !=='')
          getDoctorCourse(doctor_id,year).then(result=>{
            if(result){
                console.log("courses",result);
            setCourseName(result.course[0].course_name);
            setCourseDoctorId(result.course[0].course_doctor_id);
            }
          })
          .catch(err=>{
            console.log({"course error":err.message})
          })
      },[year,doctor_id]);

      useEffect(()=>{
        getExamsForDoctor(year,termId,courseDoctorId).then(result=>{
            console.log("exams",exams);
            if(result){
                setExams(result);
            }
        })
        .catch(err=>{
            console.log({"exam error":err.message})
        })
      },[termId,courseDoctorId])

      return(
        <div className='container col-sm-8 mx-5'>
            <div>
                <label>اختر الترم</label>
                <select value={termId} onChange={(e)=>setTermId(parseInt(e.target.value))}>
                    {
                        terms.map((term,index)=>{
                            return(
                                <option key={index} value={term.id}>{term.term_name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label>{courseName}</label>
                
            </div>
        </div>
      )
}