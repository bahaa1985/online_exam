export async function login(email,password){
    const body_data={
        "user_email":email,
        "user_password":password
    }

    const response= await fetch("/login",
    {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(body_data)
    })

    return response.json();
}