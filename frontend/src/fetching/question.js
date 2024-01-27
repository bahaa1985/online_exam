
export async function createQuestion(questiontype_id,question_title,course_doctor_id,creation_date,options_arr)
{
    const body_data={
        "questiontype_id":questiontype_id,
        "question_title":question_title,
        "course_doctor_id":course_doctor_id,
        "creation_date":creation_date,
        "options_arr":options_arr
    }

    const response= await fetch('/questions',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept': '*/*'
        },
        body:JSON.stringify(body_data)
    });

    return response.json()

}