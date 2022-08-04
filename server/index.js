const express = require("express")
const path = require("path")
const logger = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static(path.resolve(__dirname, "../client/build")))

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  cors({
    origin: "*",
  })
)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

const apiRouter = require("./routes/api")
app.use("/api", apiRouter)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
})

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`)
})
