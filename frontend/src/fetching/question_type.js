export async function getQuestionTypes(doctor_id){
    const response=await fetch('/question_type',{method:'GET'});
    return response.json();
}