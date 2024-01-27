export default async function logout(){
    const response=await fetch('/logout',{method:'POST',credentials:'include'});
    return response.json("تم تسجيل الخروج بنجاح");
}