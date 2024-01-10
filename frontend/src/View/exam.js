import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';
import { getExams } from '../fetching/exam';
import { getTerms } from '../fetching/terms';
export  function Exam(){

    const [exams,setExams]=useState([]);
    const [terms,setTerms]=useState([]);
    let year=new Date().getFullYear();

    useEffect(()=>{
        getExams().then(result=>{
           setExams(result);
        });
        getTerms().then(result=>{
            setTerms(result);
        })
    },[]);
    console.log(exams)
    return(
        <div>
           <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        العام الدراسي
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onSelect={()=>year=2022}>2022</Dropdown.Item>
        <Dropdown.Item href="#/action-2"  onSelect={()=>year=2023}>2023</Dropdown.Item>
        <Dropdown.Item href="#/action-3"  onSelect={()=>year=2024}>2024</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
        الترم
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
            terms.map((term,index)=>{
                return(
                    <Dropdown.Item href="#/action-1" id={index}>{term.term}</Dropdown.Item>
                )
            })
        } 
      </Dropdown.Menu>
    </Dropdown>

       <Dropdown>  
       <Dropdown.Menu>  
       <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle> 
    {exams.filter((exam)=>exam.academic_year===year).map((exam,index)=>{
                return(
        <Dropdown.Item href="#/action-1">{exam.}</Dropdown.Item>
                )
            })
        }
        </Dropdown.Menu>
        </Dropdown>
        </div>
    )
}