import express from 'express'

import authorsRouter from './routes/authors.routes.js'
import pingRouter from './routes/ping.routes.js'

import './config.js'

const app=express()
//MIDLEWARES
app.use(express.json())

//END POINTS
app.use(('/library'),authorsRouter)
app.use(pingRouter)

//crear un enpoint manejo de errores end point no existe
app.use((req,res,next)=>{
    res.status(404).json({
        message:"Ruta no encontrada!"
    })
})
export default app