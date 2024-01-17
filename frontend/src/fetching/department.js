export async function getDepartments(){
    const response=await fetch('/departments',{method:'GET'});
    return response.json();
}