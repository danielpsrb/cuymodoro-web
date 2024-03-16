const users_router = new hyperExpress.Router()

users_router.get("/profile", (req, res) => {
    console.log("Login User Access")
    res.send("Profile User")
})

users_router.post("/login", (req, res) => {
    console.log("User logged in")
    res.send(200, "login successful")
})

hyper.use("/users", users_router)