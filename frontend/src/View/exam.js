import React from 'react';
import { useState, useEffect } from 'react';
import { getExams } from '../fetching/exam';
export  function Exam(){

    const [exams,setExams]=useState([]);

    useEffect(()=>{
        getExams().then((result)=>{
           setExams(result);
        });
    },[]);
    console.log(exams)
    return(
        <div>
            {/* exams.map((exam,index)=>{
                return(
                    <h2>{exam}</h2>
                )
            }) */}
        </div>
    )
}