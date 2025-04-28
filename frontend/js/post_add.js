let post = ""
document.getElementById('post').addEventListener('change', async (e) => {
    // const post_img = e.target.files[0]
    // post = await convertBase64(post_img)
    // document.getElementById('preview').innerHTML = `<img width="200px" height="auto" src=${post}></img>`

    const files = e.target.files
    const previewContainer = document.getElementById('preview')
    previewContainer.innerHTML = ''
    for (let file of files) {
        const base64 = await convertBase64(file);
        const img = document.createElement('img');
        img.src = base64;
        img.style.width = '200px';
        img.style.margin = '5px';
        previewContainer.appendChild(img);
    }
})



async function addPost(e) {

    e.preventDefault()

    const description = document.getElementById('description').value
    const files = document.getElementById('post').files;

    let post=[]
    for(let file of files){
        const base64=await convertBase64(file)
        post.push(base64)
    }
    if (!files.length) {
        alert("Please select at least one image");
        return;
    }
    // const postImages = await convertImagesToBase64(files);
    let userid = localStorage.getItem('id') || "";

    if (!userid) {
        alert("user not logged in")
        return
    }



    const response1 = await fetch(`/api/getUser/${userid}`)

    const user_data = await response1.json()

    console.log("userdat", user_data)


    let username = user_data.username
    let profile_pic = user_data.profile_pic


    

        // Create FormData object
        let formData = new FormData();

        // let img_count = document.getElementById('post').files
        
        for (let i = 0; i < post.length; i++) {
          formData.append("file", document.getElementById('post').files[i]);
        }
    
        // Append other fields
        formData.append("username", username);
        formData.append("description", description);
        formData.append("profile_pic", profile_pic);
        formData.append("userid", userid);
    
        // Send request
     
    // let data = { username, post: postImages, description, profile_pic, userid }


    // let options = {
    //     headers: { "Content-Type": "application/json" },
    //     method: "POST",
    //     body: JSON.stringify(data)
    // }

    try {

        // const response = await fetch('/api/addPost', options)

        const response = await fetch('/api/addPost', {
            method: "POST",
            body: formData 
          });

        const data = await response.json()

        if (response.status === 201) {

            alert("Successfully uploaded your Post")

            window.location.href = "/"
        }
        else {

            alert(data.message)
        }

    }

    catch (err) {

        console.log(err)
        alert(data.message)
    }
}


//convert image to base64
function convertBase64(file) {

    return new Promise((resolve, reject) => {
        //create object of file reader class
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        //when reading is done
        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        //if error then reject with error
        fileReader.onerror = () => {
            reject(fileReader.error)
        }
    })
}

// convert multiple images to base64
// async function convertImagesToBase64(files) {
//     const promises = Array.from(files).map(file => convertBase64(file));
//     return Promise.all(promises); // returns array of base64 strings
// }
