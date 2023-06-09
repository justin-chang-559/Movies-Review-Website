import express from "express"
import cors from "cors"
import reviews from "./MoviesDB/api/reviews.route.mjs"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/reviews", reviews)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app




