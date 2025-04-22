let username = document.getElementById("username");
let num_posts = document.getElementById("num_posts");
let under_name = document.getElementById("under_name");
let profile_pic = document.getElementById("profile_pic");
let posts = document.getElementById("posts");
let str = "";

let id = localStorage.getItem("id");

function goHome() {
  window.location.href = "index.html";
}

async function loadProfile() {
  try {
    if (!id) {
      alert("User not logged in");
      window.location.href = "/login.html";
      return;
    }

    const response1 = await fetch(`/api/getUser/${id}`);
    if (!response1.ok) throw new Error("Failed to fetch user data");
    const data1 = await response1.json();

    username.textContent = data1.username;
    profile_pic.src = data1.profile_pic || "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png";
    under_name.textContent = data1.bio || "";

    const response2 = await fetch(`/api/getPost/${id}`);
    if (!response2.ok) throw new Error("Failed to fetch posts");
    const data2 = await response2.json();

    let reverse_data2 = data2.reverse();

    str = "";
    reverse_data2.forEach((element, index) => {
      const firstImage = Array.isArray(element.post) && element.post.length > 0 ? element.post[0] : element.post;
      // Encode post images as a data attribute
      const postImages = encodeURIComponent(JSON.stringify(element.post));
      str += `
        <img src="${firstImage}" data-images="${postImages}" onclick="enlargeImage(this)" class="post-thumbnail" alt="Post Thumbnail" />
      `;
    });

    posts.innerHTML = str;
    num_posts.textContent = data2.length;
  } catch (err) {
    console.error("Error loading profile:", err);
    alert("Error loading profile");
  }
}

function editProfile() {
  window.location.href = "edit_profile.html";
}

async function deleteProfile() {
  try {
    const confirmDelete = confirm("Are you sure you want to Delete your Profile?");
    if (!confirmDelete) return;

    const response = await fetch(`/api/deleteProfile/${id}`);
    const data = await response.json();

    if (response.status === 200) {
      alert("Profile Deleted Successfully");
      localStorage.clear();
      window.location.href = "/";
    } else {
      alert(data.message || "Error deleting profile");
    }
  } catch (err) {
    console.error("Error deleting profile:", err);
    alert("Error deleting profile");
  }
}

function signout() {
  localStorage.clear();
  alert("Logging out");
  window.location.href = "/";
}

function enlargeImage(element) {
  const modal = document.getElementById("imageModal");
  const swiperWrapper = document.getElementById("swiperWrapper");
  // Decode and parse images from data attribute
  const postImages = JSON.parse(decodeURIComponent(element.dataset.images));
  const images = Array.isArray(postImages) ? postImages : [postImages];

  // Populate Swiper slides
  swiperWrapper.innerHTML = images
    .map((src) => `
      <div class="swiper-slide">
        <img src="${src}" alt="Post Image" class="modal-image" />
      </div>
    `)
    .join("");

  modal.style.display = "flex";
  document.body.classList.add("modal-open");

  // Initialize Swiper.js
  const swiper = new Swiper("#postSwiper", {
    loop: images.length > 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-prev",
      prevEl: ".swiper-button-next",
    },
    slidesPerView: 1,
    spaceBetween: 0,
    on: {
      init: function () {
        if (images.length <= 1) {
          this.el.querySelector(".swiper-pagination").style.display = "none";
          this.el.querySelector(".swiper-button-prev").style.display = "none";
          this.el.querySelector(".swiper-button-next").style.display = "none";
        }
      },
    },
  });
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
  document.getElementById("swiperWrapper").innerHTML = "";
  document.body.classList.remove("modal-open");
}

document.addEventListener("click", function (e) {
  const modal = document.getElementById("imageModal");
  if (e.target === modal) {
    closeModal();
  }
});

loadProfile();