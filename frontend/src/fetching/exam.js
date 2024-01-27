export async function getExams (){
    const response=await  fetch ('/exams',{method:'GET'});
    return response.json();
}

export async function getExamsForDoctor(academic_year,term_id,course_doctor_id){
    const response=await fetch(`/exams?academic_year=${academic_year}&term_id=${term_id}&course_doctor_id=${course_doctor_id}`,{method:'GET'});
    return response.json()
}

export async function createExam(department_id,course_doctor_id,admin_id,exam_date,exam_start,
    exam_end,exam_year,term_id,questionsCount,examPoints){
    
    const body_data={
        "department_id":department_id,
        "course_doctor_id":course_doctor_id,
        "admin_id":admin_id,
        "exam_date":exam_date,
        "exam_start":exam_start,
        "exam_end":exam_end,
        "exam_year":exam_year,
        "term_id":term_id,
        "questions_count":questionsCount,
        "exam_points":examPoints
    }
// console.log("body",body_data)
    const response= await fetch('/exams',
    {
        method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify(body_data)
    })
     return response.json()
}