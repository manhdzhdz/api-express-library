import app from './app.js'
import {PORT} from './config.js'

// server 
app.listen(PORT)
console.log(`Server Running on port ${PORT}`)