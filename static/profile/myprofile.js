let user = localStorage.getItem("user")

if (user == null || user.includes("@noname")) {
    location.replace("/")
} else {
    user = JSON.parse(user)
    location.replace(`/profile/${user.id}`)
}