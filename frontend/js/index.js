// console.log(localStorage.getItem('token'))

let posts = document.getElementById('posts');
let str = "";

//username
let username = document.getElementById('username');
let profile_pic = document.getElementById('profile_pic');

let userId = null;

async function loadPosts() {
  try {
    const response = await fetch("http://localhost:3000/api/loadPosts", {
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem('id', data.userData._id);

      userId = data.userData._id

      str = '';
      console.log(data.data[0].likes);
      
      const reverse = data.data.reverse();
      reverse.forEach((element) => {

        let imagesHTML = "";
        if (Array.isArray(element.post)) {

          imagesHTML = `
  <div class="carousel">
    <div class="carousel-track">
      ${element.post.map((imgUrl) => `<img class="carousel-image" src="${imgUrl}" alt="Post Image" />`).join("")}
    </div>
    <button class="prev">❮</button>
    <button class="next">❯</button>
  </div>`;

        } else {
          imagesHTML = `<img class="post-image" src ="${element.post}" alt = "Post Image" /> `;
        }

        const isLiked = element.likes.includes(userId);
        str += `
              <div class="post-section" >
              <div class="post-header">
                <img src="${element.profile_pic}" alt="User" />
                <strong>${element.username}</strong>
              </div>
            ${imagesHTML}
            <div class="post-like-comment">
                <div class="post-like" onclick="like('${element._id}')"><img src="images/PairDrop_files_20250421_1350/${isLiked ? 'like.png' : 'nolike.png'}" alt="Like"><p>${element.likes.length}</p></div>
                <div class="post-comment"><img src="images/PairDrop_files_20250421_1350/comment.png"></div>
                <div class="post-share"><img src="images/PairDrop_files_20250421_1350/shareicon.png"></div>
            </div>


          <div class="post-description">${element.description}</div>

          </div> `;
      });

      profile_pic.src = data.userData.profile_pic;
      posts.innerHTML = str;
      username.textContent = `${data.userData.username} `;
      enableCarousels();
    } else if (response.status === 403) {
      window.location.href = "/login.html";
    }

  } catch (err) {
    console.log(err);
  }
}


loadPosts();


async function like(postId) {
  console.log("post id is", postId);

  let data = { userId, postId }

  let options = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data)
  }

  try {
    const response = await fetch('/api/likePost', options)
    const data1 = await response.json()
    console.log(data1);

    if (response.status === 200) {
      const postDiv = Array.from(document.querySelectorAll('.post-like')).find(el => el.getAttribute('onclick') === `like('${postId}')`);
      if (postDiv) {
        const img = postDiv.querySelector('img');
        // Check if userId is in the returned likes array or assume like/unlike based on message
        const isLiked = data1.likes ? data1.likes.includes(userId) : data1.message.toLowerCase().includes('like');
        img.src = isLiked ? "images/PairDrop_files_20250421_1350/like.png" : "images/PairDrop_files_20250421_1350/nolike.png";
      }
    } else {
      alert(data1.message || "Failed to like/unlike post");
    }
  } catch (err) {
    console.error("Error liking post:", err);
    alert("Failed to like/unlike post");
  }
}

function enableCarousels() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-image");
    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");

    let index = 0;

    function updateSlide() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    prevButton.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateSlide();
    });

    nextButton.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateSlide();
    });
  });
}

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
  const response1 = await fetch(`/ api / getUser / ${id} `)

  const user_data = await response1.json()

  console.log("userdata", user_data)


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