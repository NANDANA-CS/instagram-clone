
let username = document.getElementById('username')
let num_posts = document.getElementById('num_posts')
let under_name = document.getElementById('under_name')
let profile_pic = document.getElementById('profile_pic')
let posts = document.getElementById('posts')
let str = ""

let id = localStorage.getItem('id')

async function loadProfile() {


    try {
        const response1 = await fetch(`/api/getUser/${id}`)

        const data1 = await response1.json()

        username.textContent = data1.username
        //set undername texcontent
        // under_name.textContent = data1.username

        //change profile picture
        profile_pic.src = data1.profile_pic

        //now hit the posts section api with the users id
        const response2 = await fetch(`/api/getPost/${id}`)

        const data2 = await response2.json()

        //reverse the data2 array to show latest posts first
        let reverse_data2 = data2.reverse()

        reverse_data2.forEach(element => {

            str += `
            
             <img src=${element.post} />
            
            `
        });

        posts.innerHTML = str

        //number of posts using posts total length
        num_posts.textContent = data2.length



    }

    catch (err) {

        console.log(err)
    }
}
loadProfile()


function editProfile() {

    window.location.href = "edit_profile.html"
}


//function to delete profile
async function deleteProfile() {

    try {

        const confirmDelete = confirm("Are you sure you want to Delete your Profile?");

        if (!confirmDelete) {

            return
        }


        const response = await fetch(`/api/deleteProfile/${id}`)

        const data = response.json()

        if (response.status === 200) {

            alert("Profile Deleted Successfully")
            localStorage.clear()
            window.location.href = "/"
        }
    }

    catch (err) {

        console.log(err)
        alert(data.message)

    }

}


function signout() {
    localStorage.clear()
    alert("Logging out")
    window.location.href = "/"

}

document.addEventListener('click', function (e) {
    const modal = document.getElementById('imageModal')
    if (e.target === modal) {
        modal.style.display = 'none'
        document.getElementById('enlargedImage').src = ''
        document.body.classList.remove('modal-open')
    }
})
