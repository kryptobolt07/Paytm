const expess = require('express')
const cors = require('cors')
const PORT = 3000

app.use(cors())  

app.use(express.json()) 

const mainRouter = require("./routes/index") 

const app = express()

app.use("/api/v1", mainRouter)
app.listen(PORT)
    