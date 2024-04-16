let userq = localStorage.getItem("user")
const header = document.querySelector(".header")

if (userq == null || userq.includes("@noname")) {
    localStorage.setItem("user", JSON.stringify({
        id: -1,
        fullname: "Noname",
        username: "@noname",
        userImage: "/img/noname_ava.svg",
        password: ""
    }))
    header.innerHTML += `
    <div class="header__menu">
        <form>
            <input name="username" type="text" placeholder="username" required>
            <input name="password" type="text" placeholder="password" required>
            <button type="submit">Login<img src="/img/login.svg"></button>
        </form>
    </div>
    `
} 
else {
    header.innerHTML += `
    <div class="header__menu">
        <button class="header__menu-el">Setting</button>
        <button class="header__menu-el">Logout</button>
    </div>
    `
}

userq = JSON.parse(localStorage.getItem("user"))
const header_menu = document.querySelector(".header__menu")

document.querySelector(".header__profile-ava").src = userq.userImage
document.querySelector(".header__profile-nickname").innerHTML = userq.username

document.querySelector(".header__profile").addEventListener("click", e => {
    header_menu.classList.toggle("active")
})

if (userq.username == "@noname") {
    header_menu.children[0].addEventListener("submit", async e => {
        e.preventDefault()
        try {
            let req = await fetch(`http://localhost:3000/users/?username=@${header_menu.children[0].username.value}`)
            req = await req.json()
            if (req[0].password == header_menu.children[0].password.value) {
                localStorage.setItem("user", JSON.stringify(req[0]))
                document.location.reload()
            } else {
                console.log("username or password is invalid");
            }
        } catch (error) {
            console.log(error);
        }
    })
}
else {
    header_menu.children[0].addEventListener("click", e => {
        e.preventDefault()
        document.location.replace("http://localhost:5555/setting")
    })

    header_menu.children[1].addEventListener("click", e => {
        e.preventDefault()
        localStorage.removeItem("user")
        document.location.reload()
    })
}