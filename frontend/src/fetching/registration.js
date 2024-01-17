export async function newUser(user_name,user_email,user_password,user_type,department_id){
    const body_data={
        "user_name":user_name,    
        "user_email":user_email,
        "user_password":user_password,
        "user_type":user_type,
        "department_id":department_id
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