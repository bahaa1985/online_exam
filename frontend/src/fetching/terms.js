export async  function getTerms(){
    const response = await fetch('/terms',{method:'GET'});
    return response.json();
}