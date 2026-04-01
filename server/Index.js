import express from "express"
import cors from "cors"
import connectDB from "./src/config/connectdb.js"

const app = express()

app.use(cors())
app.use(express.json())

const startServer = async () => {
  try {
    await connectDB()
    app.listen(3000, () => {
      console.log("Server is running on port 3000")
    })
  } catch (error) {
    console.error("Server failed to start", error)
  }
}
startServer()
