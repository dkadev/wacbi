const express = require("express")
const cors = require("cors")

const app = express()
const port = 8080

const routes = require("./routes")

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use("/api", routes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
