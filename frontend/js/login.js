


async function logIn(e){


    e.preventDefault()

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
   


    
    
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  
 


    if (!emailRegex.test(email)) {
        alert("Invalid email format.");
        return;
    }


    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters, contain at least one letter and one number.");
        return;
    }
   


    let data = {email,password}

    let options = {
        headers:{"Content-Type":"application/json"},
        method:"POST",
        body:JSON.stringify(data)
    }


    try{

        const response = await fetch("/api/logIn",options)

        const data = await response.json()

        if(response.status===200){

            localStorage.setItem("token",data.token)

            alert("You are successfully logged in")
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