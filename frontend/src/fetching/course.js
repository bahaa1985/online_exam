export async function getCourses(doctor_id){
    const response=await fetch(`/courses/${doctor_id}`,{method:'GET'});
    return response.json();
}