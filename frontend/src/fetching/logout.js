export default async function logout(){
    const response=await fetch('/logout',{method:'POST',credentials:'include'});
    alert("تم تسجيل الخروج بنجاح!");
    return response.json();
}