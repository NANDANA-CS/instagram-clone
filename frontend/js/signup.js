

let profile_pic = ""
document.getElementById('profile_pic').addEventListener('change',async(e)=>{
    const profile_pic_img = e.target.files[0]
    profile_pic = await convertBase64(profile_pic_img)
    document.getElementById('preview').innerHTML = `<img class="profile-preview" src="${profile_pic}" />`;

})



async function signUp(e){

    e.preventDefault()
    if (!profile_pic) {
        alert("upload profile pic")
        return
    }
    let username = document.getElementById('username').value

    let email = document.getElementById('email').value

    let phone = document.getElementById('phone').value

    let password = document.getElementById('password').value

    //confirm password
    let c_password = document.getElementById('cpassword').value


    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    // ✅ VALIDATIONS
    if (!usernameRegex.test(username)) {
        alert("Username must be 3-20 characters, only letters, numbers, and underscores allowed.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid email format.");
        return;
    }

    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters, contain at least one letter and one number.");
        return;
    }

    if (password !== c_password) {
        alert("Passwords do not match.");
        return;
    }

    
    //check password matching
    if(password!=c_password){
        alert("password doesnot match,please try again")
        return
    }
    

    let data = {profile_pic,username,email,phone,password}

    let options = {
        headers:{"Content-Type":"application/json"},
        method:"POST",
        body:JSON.stringify(data)
    }

    try{

        const response = await fetch('/api/signUp',options)
        
        const data = await response.json()

        console.log(data)

        if(response.status===201){
            alert(data.message)
            window.location.href = "/"
        }

        else{
            alert(data.message)
        }

    }
    catch(err){
        console.log(err)
        alert(data.message)
    }



}



//function to convert image to base64
function convertBase64(file){

    return new Promise((resolve,reject)=>{
        //create object of file reader class
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        //when reading is done
        fileReader.onload = ()=>{
            resolve(fileReader.result)
        }

        //if error then reject with error
        fileReader.onerror = ()=>{
            reject(fileReader.error)
        }
    })
}