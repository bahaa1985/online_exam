export function getTerms(){
    fetch('/terms').then(result=>{
        return result.json();
    })
}