import React, { useEffect, useState } from 'react';
import '../styles/QuestionBank.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { getDoctorCourse } from '../fetching/course';
import { getQuestionTypes } from '../fetching/question_type';
import { createQuestion } from '../fetching/question';

function QuestionBank(props) {
 
  const [academicYear,setAcademiYear]=useState('');
  const [doctorId,setDoctorId]=useState(1);
  const [courseName,setCourseName]=useState('');
  const [courseDoctorId,setCourseDoctorId]=useState(1);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [quesTypeId,setQuesTypeId]= useState(1);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]);


  useEffect(()=>{
    const month=new Date().getMonth();
    if(month>9){
      setAcademiYear((new Date().getFullYear()+1).toString())
    }
    else{
      setAcademiYear(new Date().getFullYear().toString())
    }
    //
    setDoctorId(props.doctor.user_id);
  },[academicYear,doctorId])


  useEffect(()=>{
   
      if(doctorId!==null && academicYear !=='')
      getDoctorCourse(doctorId,academicYear).then(result=>{
        if(result){
        setCourseName(result.course[0].course_name);
        setCourseDoctorId(result.course[0].course_doctor_id);
        }
      })
      .catch(err=>{
        console.log({"course error":err.message})
      })
  },[academicYear,doctorId]);

  useEffect(()=>{
    getQuestionTypes().then(types=>{
      setQuestionTypes(types.result);
    })
  },[])

  function createOptionsArr(){
    let options_arr=[];
    for(let i=0;i<4;i++){
      options_arr.push({"option_text":'',"option_status":0});
    }
    return options_arr;
  }

  function resetOptionStatus(){
    options.map((option)=>{
      option.option_status=false;
      return false;
    })
  }

  useEffect(()=>{
    setOptions(createOptionsArr());
    console.log("options arr",options);
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the question details (type, text, options)
    if(questionText.length>0 && options.length>0){
      createQuestion(quesTypeId,questionText,courseDoctorId,new Date(),options)
      .then(result=>{
        if(result){
          alert('تم حفظ السؤال!');
          setQuestionText(null);setOptions(createOptionsArr());
        }
        else{
          alert(result.message);
        }
      })
      .catch(err=>{
        alert(err.message);
      })
    }
  };

  return (
    <div className='container my-5 col-sm-8' dir='rtl'>
      <h1>بنك الأسئلة</h1>
      <div className='input-group container  mb-3 mx-5'>
        <label>المادة</label>
        <label>{courseName}</label>
      </div>
      
      <form className='form container mx-5' onSubmit={handleSubmit}>
        <div className='input-group  mb-3'>
          <label>اختر نوع  السؤال</label>
          <select className='form-control mx-3' value={quesTypeId} onChange={(e)=>setQuesTypeId(parseInt(e.target.value))} required>
            {
              questionTypes.map((type,index)=>{
                return(
                  <option key={index} value={type.id}>{type.question_type}</option>
                )
              })
            }
            {/* Add more question types as needed */}
          </select>
        </div>
        
        <div className='input-group  mb-3'>
        <label>نص السؤال</label>
          <textarea className='form-control mx-3' value={questionText} onChange={(e)=>setQuestionText(e.target.value)}/>
        </div>       
       
        <div className='container'>  
          <label> اختيارات السؤال  - قم تحديد الاجابة الصحيحة بعد كتابة الاختيارات </label>
          {
            options.map((option,index)=>{
              return(
                <div class="input-group container my-3">
                  <input name="option-input" className="form-control mx-3" type="text" onChange={(e)=>{option.option_text=e.target.value}} />
                  {
                    quesTypeId ===1 ?
                    <input name="check-input" className='form-check-input' type="radio" 
                    onChange={(e)=>{
                      resetOptionStatus();
                      if(e.target.value === 'on'){
                        option.option_status=true
                      }
                      else{
                        option.option_status=false
                      }
                    }} />
                    :
                    <input name="check-input" className='form-check-input' type="checkbox" 
                      onChange={(e)=>
                        {
                          if(e.target.value === 'on'){
                            option.option_status=true
                          }
                          else{
                            option.option_status=false
                          }
                        }} />
                  }
                 
                </div>
              )
            })
          }
        </div> 
        
        <div className='container d-flex justify-content-center'>
          <button className='btn btn-primary col-2' type="submit">تسجيل</button>
        </div>    

      </form>
    </div>
  );
}

export default QuestionBank;
