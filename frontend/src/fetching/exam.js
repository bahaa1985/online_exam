export async function getExams(){
    fetch('/exams',{method:'GET'}).then((result)=>{
        return result.json();
    })
}