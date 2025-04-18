// console.log(localStorage.getItem('token'))

let posts = document.getElementById('posts');
let str = "";

//username
let username = document.getElementById('username');
let profile_pic = document.getElementById('profile_pic');

async function loadPosts() {
  try {
    const response = await fetch("http://localhost:3000/api/loadPosts", {
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    });

    console.log(response);
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      
      localStorage.setItem('id', data.userData._id);
      // localStorage.setItem('profile', data.userData.profile_pic)

      data.data.forEach(element => {
        str += `
        <div class="post-section">
          <div class="post-header">
            <img src=${element.profile_pic} alt="User" />
            <strong>${element.username}</strong>
          </div>
          <img class="post-image" src=${element.post} alt="Post Image" />
          
          
          <div class="post-description">
            ${element.description}
          </div>
        </div>`;
      });

      profile_pic.src = data.userData.profile_pic;
      posts.innerHTML = str;
      username.textContent = `${data.userData.username}`;

      // handle heart icon toggles
      const loveIcons = document.querySelectorAll(".loveIcon");

      loveIcons.forEach(icon => {
        let isFilled = false;

        icon.addEventListener("click", () => {
          isFilled = !isFilled;
          if (isFilled) {
            icon.setAttribute("fill", "red");
            icon.classList.add("beat");
          } else {
            icon.setAttribute("fill", "none");
            icon.classList.remove("beat");
          }
        });
      });
    }

    else if (response.status === 403) {
      window.location.href = "/login.html";
    }

  } catch (err) {
    console.log(err);
  }
}

loadPosts();

// signout function
function signout() {
  alert("Are you sure you want to Logout");
  localStorage.removeItem("id");
  localStorage.removeItem("token");
  window.location.href = "/login.html";
}


async function addPost() {



  const description = document.getElementById('description').value


  let id = localStorage.getItem('id') || "";

  if (!id) {
    return
  }

  console.log("idis", id)

  const response1 = await fetch(`/api/getUser/${id}`)

  const user_data = await response1.json()

  console.log("userdat", user_data)


  let username = user_data.username
  let profile_pic = user_data.profile_pic

  //take user id and pass to post database
  let userid = user_data._id



  let data = { username, post, description, profile_pic, userid }

  console.log(data)
  let options = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data)
  }

  try {

    const response = await fetch('/api/addPost', options)

    const data = await response.json()

    if (response.status === 201) {

      alert(data.message)

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
