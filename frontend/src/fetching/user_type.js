export async function getUserType(){
    const response=await fetch('/user_type',{method:'GET'});
    return  response.json()
}