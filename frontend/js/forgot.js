async function forgot(e) {

    e.preventDefault()
    try {
        const email = document.getElementById("email").value
        console.log(email);
        const res = await fetch('http://localhost:3000/api/sendotp', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        })

        const response = await fetch("/api/sendOTP", {
            headers: { "Content-Type": "application/json" },
            method: "post",
            body: JSON.stringify({ email })
        })

        const data1 = await response.json()

        console.log(data1)

        if (response.status === 200) {

            alert(data1.message)

            localStorage.setItem('email', email)

            //remove email form localstorage after 1 minute
            setTimeout(() => {

                localStorage.removeItem("email")
            }, 60000)


            window.location.href = "/otp.html"
        }

        else {

            alert(data1.message)

        }


    } catch (err) {

        console.log(err)
        alert(data1.message)
    }
}