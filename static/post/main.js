const main_wrapper = document.querySelector(".main__posts-wrapper")
const modal = document.querySelector(".modal")

async function loadPost(link) {
    let posts = await fetch(link)
    posts = await posts.json()

    posts.data.forEach(async el => {
        let user = await fetch(`http://localhost:3000/users/${el.creator}`)
        user = await user.json()

        main_wrapper.innerHTML += `
        <div class="main__posts-post">
        <img src="${el.preview}" class="main__posts-post-preview" />
        <div class="main__posts-post-content">
          <span class="main__posts-post-content-title" data-id="${el.id}"
            >${el.title}</span
          >
          <div class="main__profile">
            <img class="main__profile-ava" data-id="${user.id}" src="${user.userImage}" />
            <div class="main__profile-content">
              <span class="main__profile-content-fullname"
                >${user.fullname}</span
              >
              <span class="main__profile-content-username"
                >${user.username}</span
              >
            </div>
          </div>
        </div>
      </div>
        `
    })
}

main_wrapper.addEventListener("click", async e => {
    if (e.target.className == "main__posts-post-content-title") {
        let post = await fetch(`http://localhost:3000/posts/${e.target.dataset.id}`)
        post = await post.json()

        let user = await fetch(`http://localhost:3000/users/${post.creator}`)
        user = await user.json()

        let comments = await fetch(`http://localhost:3000/comments/?post=${post.id}&_page=1&_per_page=10`)
        comments = comments.json()

        modal.style.backgroundImage = `url("${post.preview}")`

        modal.innerHTML = `
        <img src="/img/settings.svg" class="modal__setting">
        <img src="/img/cross.svg" class="modal__close">
        <img src="${user.userImage}" class="modal__ava">
        <span class="modal__fullname">${user.fullname}</span>
        <span class="modal__title">${post.title}</span>
        <div class="modal__content">
          <span>${post.body}</span>
          <hr>
          <div class="comments">
            
          </div>
        </div>
        `
        

        document.body.style.overflow = "hidden"
        modal.classList.add("active")
    } else if (e.target.className == "main__profile-ava") {
        document.location.replace(`/profile/${e.target.dataset.id}`)
    }
})

modal.addEventListener("click", e => {
    if (e.target.className == "modal__close") {
        modal.classList.remove("active")
        document.body.style.overflowY = "scroll"
        console.log(1);
    }
})
