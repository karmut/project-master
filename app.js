const express = require("express");
const app = express();

app.use(express.static("static"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("main");
});

app.get("/profile/:userId", (req, res) => {
  fetch(`http://localhost:3000/users/${req.params.userId}`)
    .then((r) => r.json())
    .then((r) => {
      res.render("profile", {
        user: r
      });
    })
    .catch(() => {
      res.render("error");
    });
});

app.get("/myprofile", (req, res) => {
  res.send('<script src="http://localhost:5555/profile/myprofile.js"></script>')
})

app.listen(5555, () => {
  console.log("Server started on port: 5555\n");
  console.log("http://localhost:5555");
});
