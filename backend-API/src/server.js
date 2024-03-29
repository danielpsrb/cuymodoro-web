const hyperExpress = require("hyper-express")
const hyper = new hyperExpress.Server()
const db = require("./config/database")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")

dotenv.config()

const PORT = process.env.PORT || 3838

const auth_middleware = (req, res, next) => {
    console.log("Auth Protection bro...")
    next()
}

hyper.use(cors());

hyper.get('/', {middlewares: [auth_middleware]}, async (req, res) => {
    console.log("Get API Readyyy...")   

    res.json({
        status: "OK",
        API_version: '1.0.0'
    });
});

const features_router = new hyperExpress.Router()

features_router.get("/status/:id", async (req, res) => {
    const { id } = req.params
    db.query(`SELECT status FROM features WHERE id='${id}'`, (err, result) => {
        if (err) throw new Error("error getting users", err)
        res.json({ status: result[0].status })
    })
})

features_router.post("/add", async (req, res) => {
    try {
        const { title, level } = await req.json();
        db.query(`INSERT INTO features (username, title, level) VALUES ('admin', '${title}', '${level}')`, (err, result) => {
            if (err) console.error("Error executing SQL query:", err);
            console.log(result)
            res.json({
                id: result.insertId
            })
        })
    } catch (error) {
        console.error("error disini", error)
        res.status(500).send("error adding features")
    }
})

features_router.put("/break", async (req, res) => {
    const { id, break_time } = await req.json();
    db.query(`update features set break_time='${break_time}', status='break' where id='${id}'`, (err, result) => {
        if (err) console.error("Error executing SQL query:", err);
        console.log(result[0])
        res.send("Break Time")
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
hyper.use("/features", features_router)

hyper.listen(PORT)
        .then(() => console.log(`SERVER listening on port ${PORT}`))
        .catch(() => console.warn(`Failed to listen on port ${PORT}`))