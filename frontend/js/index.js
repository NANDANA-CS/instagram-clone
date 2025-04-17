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
      // set the id on localstorage
      localStorage.setItem('id', data.userData._id);
      // localStorage.setItem('profile', data.userData.profile_pic)

      // generate posts
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

      // update DOM
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
