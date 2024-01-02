import React from 'react';
import { useState, useEffect } from 'react';
import { getCourses } from '../fetching/course';

export  function Course(){

    const [courses,setCourses]=useState([]);

    useEffect(()=>{
        getCourses(1).then((result)=>{
           setCourses(result);
        });
    },[]);
    console.log(courses)
    return(
        <div>
            {
                courses.map((course,index)=>{
                    return(
                        <div key={index}>
                        <p>{course.course_name}</p>
                        <p>{course.course_code}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}