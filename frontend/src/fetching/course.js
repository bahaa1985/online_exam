export async function getCourses(doctor_id){
    const response=await fetch(`/courses/${doctor_id}`,{method:'GET'});
    // console.log('fetched courses:',response)
    return response.json();
}