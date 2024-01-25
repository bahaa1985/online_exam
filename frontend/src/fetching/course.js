export async function getCourses(doctor_id){
    const response=await fetch(`/courses/doctor/${doctor_id}`,{method:'GET'});
   
    return response.json();
}

export async function getDepartmentCourses(department_id){
    const response= await fetch(`/courses?department_id=${department_id}`,{method:'GET'});
    return response.json();
}

export async function getCoursesForExam(department_id){
    const response=await fetch(`/courses/term?department_id=${department_id}`,{method:'GET'}) 
    return response.json();
}