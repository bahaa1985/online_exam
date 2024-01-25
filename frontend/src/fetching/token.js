export default async function verifyToken(){
    const response=await fetch('/verify',{method:"GET",credentials:'include'});
    return response.json();
}