export async function newUser(user_name,user_email,user_password,user_type,user_department,course_id,academic_year){
    const body_data={
        "user_name":user_name,    
        "user_email":user_email,
        "user_password":user_password,
        "user_type":user_type,
        "user_department":user_department,
        "course_id":course_id,
        "academic_year":academic_year
    }

    
    const response=await fetch('/register',
    {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(body_data)
    })

    return response.json();
}