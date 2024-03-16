const hyperExpress = require("hyper-express")
const hyper = new hyperExpress.Server()
const PORT = process.env.PORT || 3838
const db = require("./config/database")

const auth_middleware = (req, res, next) => {
    console.log("Auth Protection bro...")
    next()
}

hyper.get('/', {middlewares: [auth_middleware]}, async (req, res) => {
    console.log("Get API Readyyy...")   

    res.json({
        status: "OK",
        API_version: '1.0.0'
    })
})

const users_router = new hyperExpress.Router()

users_router.get("/profile", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) throw new Error("error getting users")
        const profiles = {
            username: result[0].username,
            token: result[0].token
        }
        res.json({profiles})
    })
})

users_router.post("/login", (req, res) => {
    console.log("User logged in")
    res.send("login successful")
})

hyper.use("/users", users_router)

hyper.listen(PORT)
        .then(() => console.log(`SERVER listening on port ${PORT}`))
        .catch(() => console.warn(`Failed to listen on port ${PORT}`))